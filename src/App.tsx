import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { WeatherData } from './types/WeatherData';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import './App.scss';
import { Container } from '@mui/material';
import { fetchWeather } from './store/weatherSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      const parsedCities = JSON.parse(savedCities) as WeatherData[];
      parsedCities.forEach((city) => {
        dispatch(fetchWeather(city.name));
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:cityId" element={<CityPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
