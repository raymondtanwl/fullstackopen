import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newAnecdote) => {
  const object = {
    content: newAnecdote,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (anecdote) => {
  const patchUrl = `${baseUrl}/${anecdote.id}`
  const response = await axios.patch(patchUrl, { votes: anecdote.votes + 1 })
  return response.data
}

export default { 
  getAll, 
  createNew,
  updateVote
}
