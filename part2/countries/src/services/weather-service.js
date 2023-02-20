import axios from "axios";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

/**
 * Get weather data
 * @returns
 */
const getWeather = (capitalName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&units=metric&appid=${apiKey}`;
  return axios.get(apiUrl);
};

const exportObj = {
  getWeather: getWeather,
};

export default exportObj;
