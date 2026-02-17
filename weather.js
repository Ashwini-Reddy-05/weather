const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayWeather(data, city);
    } catch (err) {
        showError('City not found. Please try again.');
    }
}

function displayWeather(data, city) {
    const current = data.current_condition[0];
    const location = data.nearest_area[0];
    
    document.getElementById('cityName').textContent = `${location.areaName[0].value}, ${location.country[0].value}`;
    document.getElementById('temperature').textContent = `${current.temp_C}°C`;
    document.getElementById('description').textContent = current.weatherDesc[0].value;
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${current.windspeedKmph} km/h`;
    
    weatherInfo.classList.remove('hidden');
    error.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

