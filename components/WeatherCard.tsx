
import React from 'react';
import { WeatherData } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-2xl w-full max-w-md animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold">{data.city}</h2>
        <p className="text-xl text-gray-300 mt-2">{data.condition}</p>
      </div>
      <div className="flex items-center justify-between my-8">
        <div className="flex-1 text-center">
          <WeatherIcon condition={data.condition} className="w-32 h-32 mx-auto" />
        </div>
        <div className="flex-1 text-center pl-4 border-l border-white/20">
          <p className="text-7xl font-light tracking-tighter">
            {Math.round(data.temperatureCelsius)}&deg;C
          </p>
          <p className="text-3xl text-gray-400 font-light tracking-tighter">
            {Math.round(data.temperatureFahrenheit)}&deg;F
          </p>
        </div>
      </div>
      <div className="flex justify-around bg-white/5 rounded-lg p-4 text-center">
        <div>
          <p className="text-gray-400 text-sm">Humidity</p>
          <p className="text-2xl font-semibold">{data.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Wind Speed</p>
          <p className="text-2xl font-semibold">{Math.round(data.windSpeedKPH)} <span className="text-base font-normal">kph</span></p>
        </div>
      </div>
    </div>
  );
};
