const Filter = ({ newSearch, setNewSearch }) => {
  const handleSearch = (e) => {
    setNewSearch(e.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter shown with</label>
      <input
        type="text"
        id="filter"
        value={newSearch}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
