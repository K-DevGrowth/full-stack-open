import personService from "../services/personService";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setMessage,
  setMessageType,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          !window.confirm(
            `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        )
          return;

        personService
          .update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((returnedValue) => {
            setMessage(`Changed number of ${newName}`);
            setMessageType("success");
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedValue : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setMessageType("error");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      } else {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedValue) => {
          setMessage(`Added ${newName}`);
          setMessageType("success");
          setPersons([...persons, returnedValue]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessageType("error");
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
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
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={newName === ""}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
