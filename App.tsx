
import React, { useState } from 'react';
import { WeatherData } from './types';
import { getWeatherForCity } from './services/geminiService';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeatherForCity(city);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 text-white flex flex-col items-center p-4 sm:p-8 font-sans">
        <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}
        </style>
      <header className="w-full max-w-md mb-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          <i className="fa-solid fa-cloud-sun-rain mr-3 text-blue-400"></i>
          Gemini Weather
        </h1>
        <p className="text-gray-400 mt-2">Get real-time weather, powered by AI</p>
      </header>
      
      <main className="w-full flex-grow flex flex-col items-center">
        <div className="w-full max-w-md mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div className="w-full max-w-md">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {weatherData && <WeatherCard data={weatherData} />}
            {!isLoading && !error && !weatherData && (
                <div className="text-center text-gray-500 mt-16">
                    <p>Enter a city to get started!</p>
                </div>
            )}
        </div>
      </main>

      <footer className="text-center text-gray-600 mt-8 text-sm">
        <p>&copy; {new Date().getFullYear()} Gemini Weather. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
