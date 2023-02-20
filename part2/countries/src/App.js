import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";
import countriesService from "./services/countries-service";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving from restcountries.com", error);
      });
  }, []);

  const handleShow = (data) => {
    // console.log("handleShow", data);
    setSelectedCountry(data);
  };

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={filter}
        show={handleShow}
        selected={selectedCountry}
      ></Countries>
      <CountryDetail country={selectedCountry}></CountryDetail>
    </div>
  );
};

export default App;
