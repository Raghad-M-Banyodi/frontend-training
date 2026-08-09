import ForecastCard from "./ForecastCard";
import type { ForecastData } from "../types/weather";

interface ForecastProps {
    forecast: ForecastData;
    unit: "C" | "F";
    convertTemperature: (temperature: number) => number;
}

function Forecast({
    forecast,
    unit,
    convertTemperature,
}: ForecastProps) {
    
    const dailyForecast = forecast.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

    return (
        <div>
            <h2 id="cityName">{forecast.city.name}</h2>

            <div id="forecast">
                {dailyForecast.map((item) => (
                    <ForecastCard
                        key={item.dt_txt}
                        date={item.dt_txt.split(" ")[0]}
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