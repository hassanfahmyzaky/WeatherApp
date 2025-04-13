const API_KEY = '2e7934b9139f1c36eca566d45ef491ba';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.getElementById('weather-icon');
const cityNameElement = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const forecastElement = document.getElementById('forecast');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');

// Current unit (Celsius by default)
let currentUnit = 'celsius';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    updateDate();
    
    // Default city
    fetchWeather('London');
    
    // Event listeners
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });
    
    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    alert('Unable to retrieve your location. Please enable location services or search for a city manually.');
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
    
    celsiusBtn.addEventListener('click', () => {
        if (currentUnit !== 'celsius') {
            currentUnit = 'celsius';
            celsiusBtn.classList.add('active');
            fahrenheitBtn.classList.remove('active');
            // Re-fetch data to update units
            const currentCity = cityNameElement.textContent;
            fetchWeather(currentCity);
        }
    });
    
    fahrenheitBtn.addEventListener('click', () => {
        if (currentUnit !== 'fahrenheit') {
            currentUnit = 'fahrenheit';
            fahrenheitBtn.classList.add('active');
            celsiusBtn.classList.remove('active');
            // Re-fetch data to update units
            const currentCity = cityNameElement.textContent;
            fetchWeather(currentCity);
        }
    });
});

// Update current date
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Fetch weather data by city name
async function fetchWeather(city) {
    try {
        // Current weather
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentWeatherData, forecastData);
    } catch (error) {
        alert(error.message);
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather data by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        // Current weather
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentWeatherData, forecastData);
    } catch (error) {
        alert('Error fetching weather data for your location.');
        console.error('Error fetching weather data:', error);
    }
}

// Display weather data
function displayWeather(currentData, forecastData) {
    // Current weather
    const tempCelsius = Math.round(currentData.main.temp);
    const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
    
    cityNameElement.textContent = currentData.name;
    descriptionElement.textContent = currentData.weather[0].description;
    humidityElement.textContent = `${currentData.main.humidity}%`;
    windSpeedElement.textContent = `${Math.round(currentData.wind.speed * 3.6)} km/h`;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
    
    // Set temperature based on current unit
    temperatureElement.textContent = currentUnit === 'celsius' 
        ? `${tempCelsius}°C` 
        : `${tempFahrenheit}°F`;
    
    // Forecast
    displayForecast(forecastData);
}

// Display 5-day forecast
function displayForecast(forecastData) {
    // Clear previous forecast
    forecastElement.innerHTML = '';
    
    // We'll get one forecast per day at 12:00 PM
    const dailyForecasts = [];
    
    // Group forecasts by day
    const forecastsByDay = {};
    
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (!forecastsByDay[day]) {
            forecastsByDay[day] = item;
        }
    });
    
    // Convert to array and limit to 5 days
    const forecastDays = Object.keys(forecastsByDay).slice(0, 5);
    
    forecastDays.forEach(day => {
        const forecast = forecastsByDay[day];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const tempCelsius = Math.round(forecast.main.temp);
        const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${currentUnit === 'celsius' ? `${tempCelsius}°C` : `${tempFahrenheit}°F`}</div>
        `;
        
        forecastElement.appendChild(forecastItem);
    });
}