const PersonForm = ({
  addOrEditEntry,
  newName,
  newNum,
  updateName,
  updateNum,
}) => {
  return (
    <form onSubmit={addOrEditEntry}>
      <div>
        name: <input value={newName} onChange={updateName} />
      </div>
      <div>
        number: <input value={newNum} onChange={updateNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
