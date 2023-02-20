const Countries = ({ countries, filter, show, selected }) => {
  // console.log("Countries", countries);

  if (countries === undefined || countries === null || selected !== null) {
    return null;
  }

  const filteredList = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter)
  );

  // console.log("filteredList", filteredList);
  if (filteredList.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredList.length === 0) {
    return <div>No match, specify another filter</div>;
  }

  return (
    <div>
      {filteredList.map((country, i) => (
        <div key={i}>
          {country.name.common}{" "}
          <button onClick={() => show(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
