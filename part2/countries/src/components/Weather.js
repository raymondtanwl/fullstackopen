import { useState, useEffect } from "react";
import weatherService from "../services/weather-service";

const Weather = ({ capital }) => {
  const [weatherData, setWeather] = useState(null);
  // console.log("Weather", capital);

  useEffect(() => {
    if (capital) {
      weatherService
        .getWeather(capital)
        .then((response) => {
          // console.log("getWeather", response.data);
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving from api.openweathermap.org", error);
        });
    }
  }, []);

  if (weatherData === null) {
    return null;
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <div>temperate {weatherData.main.temp} Celcius</div>
      <img src={weatherIcon} alt={weatherData.weather[0].description} />
      <div>wind {weatherData.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
