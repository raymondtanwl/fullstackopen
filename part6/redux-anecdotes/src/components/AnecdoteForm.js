import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    // uncontrolled component keeps the source of truth in the DOM
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''

    // dispatch(createAnecdote(content))
    // dispatch({ type: 'anecdotes/createAnecdote', payload: content })

    // const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you created '${content}'`, 5))
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
