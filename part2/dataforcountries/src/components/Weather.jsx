import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService
      .getWeather(lat, lon)
      .then((returnedValue) => setWeather(returnedValue));
  }, [lat, lon]);

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <p>temperature {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
