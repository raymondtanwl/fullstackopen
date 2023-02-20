const PersonForm = ({ addEntry, newName, newNum, updateName, updateNum }) => {
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input value={newName} onChange={updateName} />
      </div>
      <div>
        number: <input value={newNum} onChange={updateNum} />
      </div>
      <div>
        <button type="submit" onClick={addEntry}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
