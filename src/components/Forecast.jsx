export const Forecast = ({ forecast, unit }) => {
    if (!forecast) return null;
  
    const getTemperature = (temp) => {
      return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`;
    };
  
    const getWeatherIcon = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}.png`;
    };
  
    const formatDay = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
      });
    };
  
    // Group forecast by day
    const dailyForecast = forecast.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = item;
      }
      return acc;
    }, {});
  
    return (
      <div className="weather-card mt-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          5-Day Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.values(dailyForecast).slice(0, 5).map((day) => (
            <div
              key={day.dt}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {formatDay(day.dt)}
              </p>
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-12 h-12 my-2"
              />
              <div className="flex gap-2">
                <p className="text-gray-800 dark:text-gray-200">
                  {getTemperature(day.main.temp_max)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {getTemperature(day.main.temp_min)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };