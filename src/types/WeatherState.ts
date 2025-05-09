import { WeatherData } from './WeatherData';
import { HourlyForecast } from './HourlyForecast';

export interface WeatherState {
  cities: WeatherData[];
  selectedCity: WeatherData | null;
  hourlyForecast: HourlyForecast[];
  loading: boolean;
  error: string | null;
} 