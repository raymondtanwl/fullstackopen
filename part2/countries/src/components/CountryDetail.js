import Weather from "./Weather";

const CountryDetail = (data) => {
  // console.log("CountryDetail", data.country);
  if (
    data === undefined ||
    data === null ||
    data.country === undefined ||
    data.country === null
  ) {
    return null;
  }

  data = data.country;

  return (
    <div>
      <h1>{data.name.common}</h1>
      <div>Capital: {data.capital[0]}</div>
      <div>Area: {data.area}</div>

      <h3>Languages</h3>
      <ul>
        {Object.values(data.languages).map((lang, i) => {
          return <li key={i}>{lang}</li>;
        })}
      </ul>

      <div>
        <img className="flag" src={data.flags.png} alt={data.flags.alt} />
      </div>

      <Weather capital={data.capital[0]}></Weather>
    </div>
  );
};

export default CountryDetail;
