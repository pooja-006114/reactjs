import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Define weatherData here
  const [city, setCity] = useState('');
  const [apiKey] = useState('307ca1995e45481a88042c93724345f9');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city && apiKey) {
      fetchWeatherData();
    }
  }, [city, apiKey]);

  return (
    <div className="Weather">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter a city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="Weather-input"
      />
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
          <p className="Weather-info">Temperature: {weatherData.main.temp}°C</p>
          <p className="Weather-info">Weather: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="Weather-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;