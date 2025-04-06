import React from 'react';

export default function WeatherCard({ data }) {
  return (
    <div className="bg-white rounded shadow-md p-6 inline-block">
      <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
      <div className="flex items-center justify-center mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
        <p className="text-4xl">{Math.round(data.main.temp)}°C</p>
      </div>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} km/h</p>
      <p className="capitalize">Condition: {data.weather[0].description}</p>
    </div>
  );
}