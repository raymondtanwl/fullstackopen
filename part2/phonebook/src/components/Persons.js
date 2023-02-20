const Persons = ({ persons, filter, handleDelete }) => {
  const filteredList = persons.filter((p) =>
    p.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      {filteredList.length > 0 ? (
        filteredList.map((person) => {
          return (
            <div key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDelete(person)}>delete</button>
            </div>
          );
        })
      ) : (
        <div>No persons found</div>
      )}
    </div>
  );
};

export default Persons;
