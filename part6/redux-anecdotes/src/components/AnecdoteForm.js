import { useDispatch } from "react-redux"
// import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    // uncontrolled component keeps the source of truth in the DOM
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    // dispatch(createAnecdote(content))
    dispatch({ type: 'anecdotes/createAnecdote', payload: content })
    _invokeNotification(content)
  }

  // set and remove notification after 5s
  const _invokeNotification = (content) => {
    dispatch({ type: 'notification/createdNotification', payload: content })
    setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, 5000)
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
