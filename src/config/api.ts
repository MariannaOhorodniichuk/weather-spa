export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: process.env.REACT_APP_OPENWEATHER_API_KEY,
  UNITS: 'metric'
} as const; 