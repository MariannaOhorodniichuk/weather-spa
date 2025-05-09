import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import { WeatherData } from '../../types/WeatherData';
import { HourlyForecast } from '../../types/HourlyForecast';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    appid: API_CONFIG.API_KEY,
    units: API_CONFIG.UNITS
  }
});

export const weatherApi = {
  getWeather: async (city: string): Promise<WeatherData> => {
    const response = await api.get(`/weather?q=${city}`);
    return response.data;
  },

  getHourlyForecast: async (city: string): Promise<HourlyForecast[]> => {
    const response = await api.get(`/forecast?q=${city}`);
    return response.data.list.slice(0, 8).map((item: any) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather
    }));
  }
}; 