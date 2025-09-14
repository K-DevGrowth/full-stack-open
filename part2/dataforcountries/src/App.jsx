import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countriesService.getAll().then((returnedValue) => {
      setCountries(returnedValue);
    });
  }, []);

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
          <p key={country.name.common}>{country.name.common}</p>
        ))}

      {filtered.length === 1 && (
        <div>
          <h1>{filtered[0].name.common}</h1>
          <p>catital {filtered[0].capital[0]}</p>
          <p>area {filtered[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(filtered[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={`${filtered[0].flags.png}`} alt={`Flag of ${filtered[0].name.common}`} />
        </div>
      )}
    </div>
  );
};

export default App;
