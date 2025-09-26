import { useEffect, useState } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState("Information will be displayed here");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    personService.getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);

  return (
    <main>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Numbers</h2>
      <Persons
        newSearch={newSearch}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </main>
  );
};

export default App;
