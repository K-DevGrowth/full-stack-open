const Persons = ({ newSearch, persons }) => {
  const newPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <div>
      {newPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <p >
      {person.name} {person.number}
    </p>
  );
};

export default Persons;
