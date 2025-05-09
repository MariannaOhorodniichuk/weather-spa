import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import WeatherCard from '../features/weather/components/WeatherCard';
import { fetchWeather } from '../store/weatherSlice';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const [newCity, setNewCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading, error } = useSelector((state: RootState) => state.weather);

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity.trim()) {
      dispatch(fetchWeather(newCity.trim()));
      setNewCity('');
    }
  };

  const handleRefreshCity = (cityName: string) => {
    dispatch(fetchWeather(cityName));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box component="form" onSubmit={handleAddCity} className="add-city-form">
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Add a city"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              error={!!error}
              helperText={error}
              placeholder="Enter city name..."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add City'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {cities.length === 0 ? (
        <Box className="empty-state">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No cities added yet
          </Typography>
          <Typography color="text.secondary">
            Add a city to see the current weather and forecast
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cities.map((city) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={city.id}>
              <WeatherCard 
                weather={city} 
                onRefresh={handleRefreshCity}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage; 