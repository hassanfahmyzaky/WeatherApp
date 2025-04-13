export const WeatherCard = ({ weather, unit, lastUpdated }) => {
    if (!weather) return null;
  
    const getWeatherIcon = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    };
  
    const getTemperature = (temp) => {
      return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`;
    };
  
    const getWindSpeed = (speed) => {
      return unit === 'metric' ? `${Math.round(speed * 3.6)} km/h` : `${Math.round(speed)} mph`;
    };
  
    const formatDate = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };
  
    return (
      <div className="weather-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate(weather.dt)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated?.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-16 h-16"
            />
            <div>
              <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                {getTemperature(weather.main.temp)}
              </p>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Feels Like</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {getTemperature(weather.main.feels_like)}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Humidity</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Wind Speed</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {getWindSpeed(weather.wind.speed)}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Pressure</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    );
  };