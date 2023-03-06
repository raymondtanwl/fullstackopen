import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    // uncontrolled component keeps the source of truth in the DOM
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div className="anecdote-form">
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name="anecdoteText"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
