import personService from "../services/personService";

const Persons = ({ newSearch, persons, setPersons, setMessage }) => {
  const newPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const handleDelete = (id) => {
    if (
      !window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}`
      )
    )
      return;
    setMessage(`Deleted ${persons.find((person) => person.id === id).name}`);
    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      {newPersons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      <span>
        {person.name} {person.number}
      </span>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  );
};

export default Persons;
