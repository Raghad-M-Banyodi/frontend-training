import ForecastCard from './ForecastCard';
import type { ForecastData } from '../types/weather';

interface ForecastProps {
  forecast: ForecastData;
  unit: 'C' | 'F';
}

function Forecast({ forecast, unit }: ForecastProps) {
  const convertTemperature = (temperature: number) => {
    if (unit === 'F') {
      return (temperature * 9) / 5 + 32;
    }

    return temperature;
  };

  const dailyForecast = forecast.list.filter((item) =>
    item.dt_txt.includes('12:00:00'),
  );

  return (
    <div>
      <h2 id="cityName">{forecast.city.name}</h2>

      <div id="forecast">
        {dailyForecast.map((item) => (
          <ForecastCard
            key={item.dt_txt}
            date={item.dt_txt}
            temperature={convertTemperature(item.main.temp)}
            description={item.weather[0].description}
            icon={item.weather[0].icon}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}

export default Forecast;
