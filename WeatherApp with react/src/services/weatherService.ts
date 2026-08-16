import type { ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCoordinates(city: string) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }

    if (response.status === 401) {
      throw new Error('Invalid API key');
    }

    throw new Error('Error fetching city');
  }

  const data = await response.json();

  return {
    lat: data.coord.lat,
    lon: data.coord.lon,
    cityName: data.name,
  };
}

export async function getForecast(
  lat: number,
  lon: number,
): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error('Error fetching forecast');
  }

  return response.json();
}
