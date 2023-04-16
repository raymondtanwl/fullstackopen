import { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../context/loginContext'

const NavMenu = () => {
  const [loginPayload, loginDispatch] = useContext(LoginContext)

  const handleLogout = () => {
    // console.log('handleLogout')
    window.localStorage.clear()
    // setUser(null)
    loginDispatch({ type: 'LOGOUT' })
  }

  if (!loginPayload) return null

  return (
    <div className="nav-menu">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <div>{loginPayload && loginPayload.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavMenu
