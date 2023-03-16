import { createContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  // console.log('notifReducer', state, action)
  switch (action.type) {
    case 'CREATE':
      return action.data
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  // const setNotification = (state, action) => {
  //   console.log('setNotification1', state, action)
  //   return notifReducer => {
  //     console.log('setNotification2', state, action)
  //     const timeOutSeconds = action.sec * 1000
  //     notifReducer({ type: 'REMOVE ', data: action.data.content })
  //     setTimeout(() => {
  //       notifReducer({ type: 'REMOVE '})
  //     }, timeOutSeconds)
  //   }
  // }

  const [notifMsg, notifDispatch] = useReducer(notifReducer, 0)
  
  return (
    <NotifContext.Provider value={[notifMsg, notifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext
