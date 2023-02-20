import axios from "axios";

/**
 * Get all countries data
 * @returns
 */
const getAll = () => {
  const apiUrl = "https://restcountries.com/v3.1/all";
  return axios.get(apiUrl);
};

const exportObj = {
  getAll: getAll,
};

export default exportObj;
