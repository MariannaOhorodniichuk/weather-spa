export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
} 