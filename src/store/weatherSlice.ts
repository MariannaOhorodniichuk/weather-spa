import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherState } from '../types/WeatherState';
import { WeatherData } from '../types/WeatherData';
import { HourlyForecast } from '../types/HourlyForecast';
import axios from 'axios';
import { WEATHER_CONSTANTS } from '../constants/weather';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  'weather/fetchHourlyForecast',
  async (city: string) => {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data.list.slice(0, WEATHER_CONSTANTS.FORECAST_POINTS).map((item: {
      dt: number;
      main: { temp: number };
      weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>;
    }) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather
    }));
  }
);

const initialState: WeatherState = {
  cities: [],
  selectedCity: null,
  hourlyForecast: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action) => {
      if (!state.cities.find(city => city.id === action.payload.id)) {
        state.cities.push(action.payload);
        localStorage.setItem('cities', JSON.stringify(state.cities));
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.cities.find(city => city.id === action.payload.id)) {
          state.cities.push(action.payload);
          localStorage.setItem('cities', JSON.stringify(state.cities));
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.hourlyForecast = action.payload;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch forecast data';
      });
  },
});

export const { addCity, removeCity, setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer; 