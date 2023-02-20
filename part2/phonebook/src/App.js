import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons-service";
import Notification, { EnumNotifType } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    type: EnumNotifType.ErrorNotif,
  });

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addOrEditEntry = (event) => {
    event.preventDefault();
    const existingIndex = persons.findIndex(
      (a) => a.name.toLowerCase() === newName.toLowerCase()
    );
    // add entry when not found
    if (existingIndex === -1) {
      addEntry();
    } else {
      editEntry(existingIndex);
    }
  };

  const addEntry = () => {
    const newPerson = {
      name: newName,
      number: newNum,
      id: persons[persons.length - 1].id + 1,
    };

    personService
      .create(newPerson)
      .then((response) => {
        setPersons([...persons, newPerson]);
        invokeNotification({
          message: `Added ${newPerson.name}`,
          type: EnumNotifType.SuccessNotif,
        });

        // clear input
        setNewName("");
        setNewNum("");
      })
      .catch((error) => {
        invokeNotification({
          message: `Error adding ${newPerson.name}`,
          type: EnumNotifType.ErrorNotif,
        });
      });
  };

  const editEntry = (existingIndex) => {
    const editedPerson = persons[existingIndex];
    editedPerson.number = newNum;
    const confirmEdit = window.confirm(
      `${editedPerson.name} is already added to the phonebook, replace the old number with the new one?`
    );

    if (confirmEdit) {
      personService
        .update(editedPerson.id, editedPerson)
        .then((edited) => {
          persons[existingIndex] = editedPerson;
          setPersons([...persons]);
          invokeNotification({
            message: `${editedPerson.name}'s number has been updated.`,
            type: EnumNotifType.SuccessNotif,
          });
        })
        .catch((error) => {
          invokeNotification({
            message: `Error editing ${editedPerson.name}'s number`,
            type: EnumNotifType.ErrorNotif,
          });
        });
    }
  };

  const deleteEntry = (person) => {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${person.name}?`
    );
    if (confirmDelete) {
      personService
        .deletePerson(person.id)
        .then((deleted) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          invokeNotification({
            message: `${person.name} is deleted from the phonebook.`,
            type: EnumNotifType.SuccessNotif,
          });
        })
        .catch((error) => {
          invokeNotification({
            message: `Information of ${person.name} has already been removed from server`,
            type: EnumNotifType.ErrorNotif,
          });
        });
    }
  };

  const invokeNotification = (errorObj) => {
    setErrorMessage({ message: errorObj.message, type: errorObj.type });
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification errorMessage={errorMessage}></Notification>

      <Filter filter={filter} updateFilter={handleFilterChange}></Filter>

      <h3>Add a new</h3>
      <PersonForm
        addOrEditEntry={addOrEditEntry}
        newName={newName}
        newNum={newNum}
        updateName={handleNameChange}
        updateNum={handleNumChange}
      ></PersonForm>

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={deleteEntry}
      ></Persons>
    </div>
  );
};

export default App;
