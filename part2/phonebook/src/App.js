import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addEntry = (event) => {
    event.preventDefault();
    // add entry when not found
    if (persons.map((p) => p.name).indexOf(newName) === -1) {
      setPersons([
        ...persons,
        { name: newName, number: newNum, id: persons.length + 1 },
      ]);
      // clear input
      setNewName("");
      setNewNum("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={handleFilterChange}></Filter>

      <h3>Add a new</h3>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        newNum={newNum}
        updateName={handleNameChange}
        updateNum={handleNumChange}
      ></PersonForm>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  );
};

export default App;
