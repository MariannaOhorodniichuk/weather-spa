import React from 'react';
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { WEATHER_CONSTANTS } from '../constants/weather';
import { HourlyForecast } from '../types/HourlyForecast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureChartProps {
  hourlyForecast: HourlyForecast[];
  height?: number;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ 
  hourlyForecast,
  height = 300
}) => {
  const chartData = {
    labels: hourlyForecast.map(forecast => 
      new Date(forecast.dt * 1000).toLocaleTimeString([], { 
        hour: WEATHER_CONSTANTS.TIME_FORMAT.HOUR, 
        minute: WEATHER_CONSTANTS.TIME_FORMAT.MINUTE 
      })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyForecast.map(forecast => forecast.temp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '24-Hour Temperature Forecast',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Hourly Forecast
      </Typography>
      {hourlyForecast.length > 0 ? (
        <Box sx={{ height }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      ) : (
        <Typography color="text.secondary" textAlign="center">
          No forecast data available
        </Typography>
      )}
    </Box>
  );
};

export default TemperatureChart; 