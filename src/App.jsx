import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeToggle } from './components/ThemeToggle';

const App = () => {
export default App;
  const {
    weather,
    forecast,
    loading,
    error,
    unit,
    lastUpdated,
    fetchWeather,
    fetchWeatherByCoords,
    toggleUnit,
  } = useWeather();

  const handleSearch = (query, isCoords = false) => {
    if (isCoords) {
      const [lat, lon] = query;
      fetchWeatherByCoords(lat, lon);
    } else {
      fetchWeather(query);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <ThemeToggle />
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Weather Dashboard
      </h1>
      
      <SearchBar 
        onSearch={handleSearch} 
        loading={loading} 
      />
      
      <ErrorMessage 
        error={error} 
        onRetry={() => weather && fetchWeather(weather.name)} 
      />
      
      <WeatherCard 
        weather={weather} 
        unit={unit} 
        lastUpdated={lastUpdated} 
      />
      
      <Forecast 
        forecast={forecast} 
        unit={unit} 
      />
      
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={toggleUnit}
          className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
        
        {weather && (
          <button
            onClick={() => fetchWeather(weather.name)}
            className="px-4 py-2 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};