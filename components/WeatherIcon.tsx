
import React from 'react';
import { WeatherCondition } from '../types';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "w-24 h-24 text-yellow-300" }) => {
  const getIcon = () => {
    switch (condition) {
      case 'Clear':
        return <i className={`fa-solid fa-sun ${className}`}></i>;
      case 'Clouds':
        return <i className={`fa-solid fa-cloud ${className.replace('text-yellow-300', 'text-gray-300')}`}></i>;
      case 'Rain':
        return <i className={`fa-solid fa-cloud-showers-heavy ${className.replace('text-yellow-300', 'text-blue-300')}`}></i>;
      case 'Drizzle':
        return <i className={`fa-solid fa-cloud-rain ${className.replace('text-yellow-300', 'text-blue-200')}`}></i>;
      case 'Snow':
        return <i className={`fa-solid fa-snowflake ${className.replace('text-yellow-300', 'text-white')}`}></i>;
      case 'Thunderstorm':
        return <i className={`fa-solid fa-cloud-bolt ${className.replace('text-yellow-300', 'text-gray-400')}`}></i>;
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return <i className={`fa-solid fa-smog ${className.replace('text-yellow-300', 'text-gray-400')}`}></i>;
      default:
        return <i className={`fa-solid fa-question-circle ${className}`}></i>;
    }
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
};
