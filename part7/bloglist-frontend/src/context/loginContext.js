import { createContext, useReducer } from 'react'

const LoginContext = createContext()

const loginReducer = (state, action) => {
  // console.log('loginReducer', state, action)
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const LoginContextProvider = (props) => {
  // user obj, token
  const [loginPayload, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[loginPayload, loginDispatch] }>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext

