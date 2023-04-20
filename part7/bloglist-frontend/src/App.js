/* eslint-disable no-unused-vars */
import { Button, Card } from 'antd'
import { useState, useEffect, useRef, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import NavMenu from './components/NavMenu/NavMenu'
import Notification, { EnumNotifType } from './components/Notification'
import Togglable from './components/Togglable'
import UserDetail from './components/UserDetail'
import Users from './components/Users'
import LoginContext from './context/loginContext'
import NotifContext, { setNotification } from './context/notifContext'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notifPayload, notifDispatch] = useContext(NotifContext)
  const [loginPayload, loginDispatch] = useContext(LoginContext)
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      loginDispatch({ type: 'LOGIN', data: user })
      // console.log('user', user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      // setUser(user)
      loginDispatch({ type: 'LOGIN', data: user })
      // console.log('handleLogin user', user)
      setUsername('')
      setPassword('')
    } catch (error) {
      const notifPayload = {
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      }
      setNotification(notifDispatch, notifPayload)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className="login-card">
          <Card>
            <h1>Blog App</h1>
            <Button type="primary" onClick={() => setLoginVisible(true)}>Log in</Button>
          </Card>
        </div>
        <div style={showWhenVisible} className="login-card">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            handleCancel={() => setLoginVisible(false)}
          />

        </div>
      </div>
    )
  }

  if (!loginPayload) return loginForm()

  return (
    <Router>
      <>
        <NavMenu />
        <div className='main-content'>
          <h2>blog app</h2>

          <Notification />

          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </>
    </Router>

  )
}

export default App