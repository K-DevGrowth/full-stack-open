import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import countriesService from "./services/countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((returnedValue) => {
      setCountries(returnedValue);
    });
  }, []);

  const handleShowCountry = (country) => {
    console.log(country);
    setShowCountry(country);
  };

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />

      {filtered.length > 10 && <p>Too many matches, specify another filter</p>}

      {filtered.length > 1 &&
        filtered.length <= 10 &&
        filtered.map((country) => (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button onClick={() => handleShowCountry(country)}>Show</button>
          </div>
        ))}

      {filtered.length === 1 && <Country showCountry={filtered[0]} />}

      {showCountry && <Country showCountry={showCountry} />}
    </div>
  );
};

export default App;
