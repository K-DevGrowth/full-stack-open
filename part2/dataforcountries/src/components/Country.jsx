import Weather from "./Weather";

const Country = ({ showCountry }) => {
  return (
    <div>
      <h1>{showCountry.name.common}</h1>
      <p>catital {showCountry.capital[0]}</p>
      <p>area {showCountry.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(showCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={`${showCountry.flags.png}`}
        alt={`Flag of ${showCountry.name.common}`}
      />
      <Weather lat={showCountry.latlng[0]} lon={showCountry.latlng[1]} />
    </div>
  );
};

export default Country;
