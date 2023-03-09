import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   const newAnecdote = action.payload
    //   state.push({
    //     content: newAnecdote,
    //     id: getId(),
    //     votes: 0
    //   })
    // },
    // createAnecdote(state, action) {
    //   state.push(action.payload)
    // },
    voteAnecdote(state, action) {
      const id = action.payload.id
      const votedAnecdote = state.find(a => a.id === id)
      const updatedAnecdotes = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      const arr = state.map(a => 
        a.id === updatedAnecdotes.id ? updatedAnecdotes : a
      )
      return arr
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  voteAnecdote, 
  appendAnecdote, 
  setAnecdotes
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdoteVote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch(voteAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
