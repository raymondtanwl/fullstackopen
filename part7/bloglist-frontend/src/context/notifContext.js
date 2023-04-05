import { createContext, useReducer } from 'react'

export const EnumNotifType = {
  SuccessNotif: 1,
  ErrorNotif: -1,
}

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

  const [notifPayload, notifDispatch] = useReducer(notifReducer, 0)

  return (
    <NotifContext.Provider value={[notifPayload, notifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

// single method to invoke notification
export const setNotification = (notifDispatch, notifPayload, ms = 4000) => {
  notifDispatch({ type: 'CREATE', data: notifPayload })
  setTimeout(() => {
    notifDispatch({ type: 'REMOVE' })
  }, ms)
}

export default NotifContext
