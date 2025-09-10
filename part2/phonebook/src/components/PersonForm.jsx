const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const isExits = persons.some((person) => person.name === newName);
    if (isExits) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form id="phonebook">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input
            id="number"
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} disabled={newName === ''}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
