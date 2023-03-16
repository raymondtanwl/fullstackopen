import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { setNotification } from "../App"
// import { setNotification } from "../App"
import NotifContext from "../context/notifContext"
import { createAnecdote } from "../service/apiService"

const AnecdoteForm = () => {
  const [notifMsg, notifDispatch] = useContext(NotifContext)

  const queryClient = useQueryClient()
  // mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // console.log('useMutation createAnecdote onSuccess', newAnecdote)
      // // the name/key should be same as the one defined in useQuery('anecdotes')
      queryClient.invalidateQueries('anecdotes')
      const msg = `anecdote '${newAnecdote.content}' is created`
      setNotification(notifDispatch, msg)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
