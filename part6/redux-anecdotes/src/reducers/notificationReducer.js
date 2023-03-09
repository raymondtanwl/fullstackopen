import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    votedNotification(state, action) {
      // console.log('votedNotification state', state)
      // console.log('votedNotification action', action)
      const notifMsg = `You voted '${action.payload.content}'`
      return notifMsg
    },
    createdNotification(state, action) {
      // console.log('createdNotification state', state)
      // console.log('createdNotification action', action)
      const notifMsg = `You created '${action.payload}'`
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
export default notificationSlice.reducer
