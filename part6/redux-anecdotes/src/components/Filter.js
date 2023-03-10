import { useDispatch } from "react-redux"
// import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterValue = event.target.value
    // dispatch(filterChange(filterValue))
    dispatch({ type: 'filter/filterChange', payload: filterValue })
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange}></input>
    </div>
  )
}

export default Filter
