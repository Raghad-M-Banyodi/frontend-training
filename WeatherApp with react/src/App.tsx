
import { useEffect, useState } from "react";
import "./App.css";

import Forecast from "./components/Forecast";
import { getCoordinates, getForecast } from "./services/weatherService";
import type { ForecastData } from "./types/weather";
import Search from "./components/Search";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [error, setError] = useState("");

  const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setError("");

        const data = await getForecast(
          position.coords.latitude,
          position.coords.longitude
        );

        setForecast(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
    () => {
      setError("Location access denied");
    }
  );
};
useEffect(() => {
  getLocation();
}, []);

  const handleSearch = async () => {
    if (city.trim() === "") {
      setError("Please enter a city");
      setCity("");
      return;
    }

    try {
      setError("");

      const coordinates = await getCoordinates(city.trim());

      const data = await getForecast(
        coordinates.lat,
        coordinates.lon
      );

      setForecast(data);
    } catch (error) {
      setForecast(null);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error fetching data");
      }
    }
  };

  const convertTemperature = (temperature: number) => {
    if (unit === "F") {
      return (temperature * 9) / 5 + 32;
    }

    return temperature;
  };

  const changeUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
  <div>
    <h1 id="title">Welcome to our Weather app</h1>

    <Search
      setCity={setCity}
      handleSearch={handleSearch}
    />

    <button id="unitBtn" onClick={changeUnit}>
      {unit === "C" ? "Switch to °F" : "Switch to °C"}
    </button>

    {error && <p>{error}</p>}

    {forecast && (
      <Forecast
        forecast={forecast}
        unit={unit}
        convertTemperature={convertTemperature}
      />
    )}
  </div>
);

}

export default App;