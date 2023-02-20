const Persons = ({ persons, filter }) => {
  const filteredList = persons.filter((p) =>
    p.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      {filteredList.length > 0 ? (
        filteredList.map((person, i) => {
          return (
            <div key={i}>
              {person.name} {person.number}
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
