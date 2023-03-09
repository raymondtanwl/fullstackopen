import { useDispatch, useSelector } from "react-redux"
// import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  // useSelector either searches for or selects data from the Redux store
  // const anecdotes = useSelector(state => state)
  const anecdotes = useSelector(state => {
    // console.log('AnecdoteList useSelector', state)
    if (state.filter === 'ALL') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    }
  })
  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    // dispatch(voteAnecdote(id))
    dispatch({ type: 'anecdotes/voteAnecdote', payload: anecdote.id })
    _invokeNotification(anecdote.content)
  }

  // set and remove notification after 5s
  const _invokeNotification = (content) => {
    dispatch({ type: 'notification/createdNotification', payload: content })
    setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
