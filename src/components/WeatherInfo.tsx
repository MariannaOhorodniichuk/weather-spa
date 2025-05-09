import React from 'react';
import { Typography, Box } from '@mui/material';
import { WeatherData } from '../types/WeatherData';

interface WeatherInfoProps {
  weather: WeatherData;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {weather.name}, {weather.sys.country}
      </Typography>
      <Typography variant="h2" sx={{ my: 2 }}>
        {Math.round(weather.main.temp)}°C
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {weather.weather[0].description}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Feels like: {Math.round(weather.main.feels_like)}°C</Typography>
        <Typography>Humidity: {weather.main.humidity}%</Typography>
        <Typography>Pressure: {weather.main.pressure} hPa</Typography>
        <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
      </Box>
    </>
  );
};

export default WeatherInfo; 