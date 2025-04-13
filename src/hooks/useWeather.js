import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '2e7934b9139f1c36eca566d45ef491ba';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      
      // Fetch forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}&cnt=5`
      );
      
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setLastUpdated(new Date());
      
      // Save to local storage
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      if (!recentSearches.includes(city)) {
        const updatedSearches = [city, ...recentSearches].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&cnt=5`
      );
      
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    if (weather) {
      const interval = setInterval(() => {
        fetchWeather(weather.name);
      }, 600000); // 10 minutes
      return () => clearInterval(interval);
    }
  }, [weather]);

  return {
    weather,
    forecast,
    loading,
    error,
    unit,
    lastUpdated,
    fetchWeather,
    fetchWeatherByCoords,
    toggleUnit,
  };
};