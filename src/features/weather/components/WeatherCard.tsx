import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { WeatherData } from '../../../types/WeatherData';
import { AppDispatch } from '../../../store/store';
import { removeCity } from '../../../store/weatherSlice';
import './WeatherCard.scss';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: (cityName: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    localStorage.setItem(`city_${weather.id}`, weather.name);
    navigate(`/city/${weather.id}`);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRefresh(weather.name);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(weather.id));
  };

  return (
    <Card className="weather-card" onClick={handleClick}>
      <CardContent>
        <Box className="card-header">
          <Typography variant="h5" component="div">
            {weather.name}, {weather.sys.country}
          </Typography>
          <Box>
            <IconButton onClick={handleRefresh} size="small">
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={handleDelete} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h3" sx={{ my: 2 }}>
          {Math.round(weather.main.temp)}°C
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {weather.weather[0].description}
        </Typography>
        <Box className="weather-info">
          <Typography>Feels like: {Math.round(weather.main.feels_like)}°C</Typography>
          <Typography>Humidity: {weather.main.humidity}%</Typography>
          <Typography>Pressure: {weather.main.pressure} hPa</Typography>
          <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard; 