const Filter = ({ filter, updateFilter }) => {
  return (
    <div className="filter">
      <div>
        filter shown with <input value={filter} onChange={updateFilter} />
      </div>
    </div>
  );
};

export default Filter;
