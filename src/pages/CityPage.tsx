import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
import LoadingSpinner from '../components/LoadingSpinner';
import TemperatureChart from '../components/TemperatureChart';
import WeatherInfo from '../components/WeatherInfo';
import { fetchHourlyForecast, fetchWeather, setSelectedCity } from '../store/weatherSlice';
import { WeatherState } from '../types/WeatherState';
import { WeatherData } from '../types/WeatherData';

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cities, selectedCity, hourlyForecast, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (cityId) {
      const city = cities.find((c: WeatherData) => c.id.toString() === cityId);
      if (city) {
        dispatch(setSelectedCity(city));
        dispatch(fetchHourlyForecast(city.name));
      } else {
        const cityName = localStorage.getItem(`city_${cityId}`);
        if (cityName) {
          dispatch(fetchWeather(cityName));
        }
      }
    }
  }, [cityId, cities, dispatch]);

  if (loading && !selectedCity) {
    return <LoadingSpinner />;
  }

  if (error || !selectedCity) {
    return (
      <Container>
        <Typography color="error">{error || 'City not found'}</Typography>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Back to Home
      </Button>
      <Paper sx={{ p: 3, mb: 3 }}>
        <WeatherInfo weather={selectedCity} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        {loading ? (
          <LoadingSpinner height={300} minHeight="auto" />
        ) : (
          <TemperatureChart hourlyForecast={hourlyForecast} />
        )}
      </Paper>
    </Container>
  );
};

export default CityPage; 