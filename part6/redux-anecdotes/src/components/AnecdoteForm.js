import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { setAnecdotes } from "../reducers/anecdoteReducer"
// import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../services/anecdoteService"

const AnecdoteForm = () => {

  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  // mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      console.log('useMutation createAnecdote onSuccess', newAnecdote)
      // // the name/key should be same as the one defined in useQuery('anecdotes')
      queryClient.invalidateQueries('anecdotes')
      dispatch(setNotification(`you created '${newAnecdote.content}'`, 5))
    }
  })

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    // uncontrolled component keeps the source of truth in the DOM
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''

    // dispatch(createAnecdote(content))
    // dispatch({ type: 'anecdotes/createAnecdote', payload: content })

    // const newAnecdote = await anecdoteService.createNew(content)
    // dispatch(createAnecdote(content))
    newAnecdoteMutation.mutate({ content })
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
