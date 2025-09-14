const SearchBar = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">find countries</label>
      <input id="filter" type="text" value={query} onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
