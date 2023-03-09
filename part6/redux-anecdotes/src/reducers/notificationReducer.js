import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    votedNotification(state, action) {
      // console.log('votedNotification state', state)
      // console.log('votedNotification action', action)
      const notifMsg = `You voted '${action.payload}'`
      return notifMsg
    },
    createdNotification(state, action) {
      // console.log('createdNotification state', state)
      // console.log('createdNotification action', action)
      // const notifMsg = `You created '${action.payload}'`
      const notifMsg = action.payload
      return notifMsg
    },
    removeNotification() {
      // console.log('removeNotification state', state)
      // console.log('removeNotification action', action)
      return null
    }
  }
})

export const { 
  votedNotification, 
  createdNotification, 
  removeNotification
} = notificationSlice.actions

export const setNotification = (notifMsg, sec) => {
  return async dispatch => {
    const timeOutSeconds = sec * 1000
    dispatch(createdNotification(notifMsg))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeOutSeconds)
  }
}

export default notificationSlice.reducer
