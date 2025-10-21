
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GeminiWeatherResponse extends WeatherData {
  error?: string;
}

export const getWeatherForCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Get the current weather for ${city}. If the city is not found or the request is ambiguous, return an error message.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              city: { type: Type.STRING, description: "The name of the city, correctly capitalized." },
              temperatureCelsius: { type: Type.NUMBER, description: "Current temperature in Celsius." },
              temperatureFahrenheit: { type: Type.NUMBER, description: "Current temperature in Fahrenheit." },
              condition: {
                type: Type.STRING,
                description: "A single word describing the weather. Must be one of: 'Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Mist', 'Haze', 'Drizzle', 'Fog'.",
              },
              humidity: { type: Type.INTEGER, description: "Current humidity percentage." },
              windSpeedKPH: { type: Type.NUMBER, description: "Current wind speed in kilometers per hour." },
              windSpeedMPH: { type: Type.NUMBER, description: "Current wind speed in miles per hour." },
              error: { type: Type.STRING, description: "An error message if the city cannot be found or data is unavailable.", nullable: true },
            },
            required: ['city', 'temperatureCelsius', 'temperatureFahrenheit', 'condition', 'humidity', 'windSpeedKPH', 'windSpeedMPH']
          },
        },
    });

    const weatherJsonString = response.text.trim();
    const weatherData: GeminiWeatherResponse = JSON.parse(weatherJsonString);

    if (weatherData.error) {
      throw new Error(weatherData.error);
    }
    
    // Ensure the condition is one of the allowed types
    const validConditions: WeatherData['condition'][] = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Mist', 'Haze', 'Drizzle', 'Fog'];
    if (!validConditions.includes(weatherData.condition)) {
      // Fallback if Gemini returns an unexpected condition
      console.warn(`Unexpected weather condition "${weatherData.condition}" received. Defaulting to 'Clouds'.`);
      weatherData.condition = 'Clouds';
    }


    return weatherData;

  } catch (error) {
    console.error("Error fetching weather data from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get weather data: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching weather data.");
  }
};
