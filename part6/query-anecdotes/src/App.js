import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './service/apiService'
import { useContext } from 'react'
import NotifContext from './context/notifContext'

const App = () => {
  const [notifMsg, notifDispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  // mutations are typically used to create/update/delete data or perform server side-effects
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedAnecdote) => {
      // console.log('useMutation voteAnecdote onSuccess', votedAnecdote)
      // the name/key should be same as the one defined in useQuery('anecdotes')
      queryClient.invalidateQueries('anecdotes')
      const msg = `anecdote '${votedAnecdote.content}' is voted`
      setNotification(notifDispatch, msg)
    }
  })

  const anecdotes = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  console.log('query res', anecdotes)

  if (anecdotes.isLoading) {
    return <div>loading data...</div>
  }

  if (anecdotes.isError) {
    // return <span>Error: {anecdotes.error.message}</span>
    return <span>anecdote service not available due to problems in server</span>
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

// single method to invoke notification
export const setNotification = (notifDispatch, msg, ms = 4000) => {
  notifDispatch({ type: 'CREATE', data: msg })
  setTimeout(() => {
    notifDispatch({ type: 'REMOVE', data: '' })
  }, ms)
}

export default App
