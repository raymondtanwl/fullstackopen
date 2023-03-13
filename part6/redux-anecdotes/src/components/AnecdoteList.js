import { useMutation, useQuery, useQueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { updateAnecdoteVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { getAnecdotes, voteAnecdote } from "../services/anecdoteService"
// import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  // // useSelector either searches for or selects data from the Redux store
  // // const anecdotes = useSelector(state => state)
  // const anecdotes = useSelector(state => {
  //   // console.log('AnecdoteList useSelector', state)
  //   if (state.filter === 'ALL') {
  //     return state.anecdotes
  //   } else {
  //     return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
  //   }
  // })

  // useDispatch provide access to the dispatch function of the Redux store in index.js
  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  // mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedAnecdote) => {
      console.log('useMutation voteAnecdote onSuccess', votedAnecdote)
      // the name/key should be same as the one defined in useQuery('anecdotes')
      queryClient.invalidateQueries('anecdotes')
      dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5))
    }
  })

  let anecdotes = []
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  // console.log('AnecdoteList useQuery result', result.data)

  if (result.isError) {
    // return <span>Error: {result.error.message}</span>
    return <span>anecdote service not available due to problems in server</span>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  } else {
    anecdotes = result.data
  }

  const vote = (anecdote) => {
    // // dispatch(voteAnecdote(id))
    // // dispatch({ type: 'anecdotes/voteAnecdote', payload: anecdote.id })
    // dispatch(updateAnecdoteVote(anecdote))
    // dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    newAnecdoteMutation.mutate(anecdote)
  }

  const sortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedByVotes.map(anecdote =>
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
