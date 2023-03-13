import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import { getAnecdotes } from './services/anecdoteService'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  console.log('query res', result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    // return <span>Error: {result.error.message}</span>
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <Notification></Notification>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App