
export type WeatherCondition = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Mist' | 'Haze' | 'Drizzle' | 'Fog';

export interface WeatherData {
  city: string;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeedKPH: number;
  windSpeedMPH: number;
}
