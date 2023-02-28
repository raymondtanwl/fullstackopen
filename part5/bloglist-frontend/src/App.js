import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification, { EnumNotifType } from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // console.log('user', user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      // console.log('handleLogin user', user)
      setUsername('')
      setPassword('')
    } catch (error) {
      invokeNotification({
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      })
    }
  }

  const handleLogout = () => {
    // console.log('handleLogout')
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      // console.log('blog created response', response)
      setBlogs(blogs.concat(response))
      invokeNotification({
        message: `A new blog ${response.title} by ${response.author} added`,
        type: EnumNotifType.SuccessNotif,
      })

      blogFormRef.current.toggleVisibility()
    } catch (error) {
      invokeNotification({
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      })
    }
  }

  const addLikes = async (blog) => {
    // console.log('addLikes', blog)
    try {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id
      }
      const updatedBlog = await blogService.update(blog.id, newBlog)
      // console.log('updated blogs >', blogs)
      // reorder list
      const sortedBlogs = blogs.map((b) =>
        b.id === blog.id ? updatedBlog : b
      )
      setBlogs(sortedBlogs)
    } catch(error) {
      invokeNotification({
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      })
    }
  }

  const removeBlog = async (blog) => {
    // console.log('removeBlog', blog)
    await blogService.remove(blog.id)

    // update array
    const afterDeletionBlogs = blogs.filter(b => b.id !== blog.id)
    setBlogs(afterDeletionBlogs)

    window.confirm(`Removed blog ${blog.title} by ${blog.author}`)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const invokeNotification = (errorObj) => {
    setErrorMessage({ message: errorObj.message, type: errorObj.type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      {!user && loginForm()}

      <h2>blogs</h2>

      <Notification errorMessage={errorMsg}></Notification>

      { user &&
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
      }

      { user &&
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm addNewBlog={addBlog}></BlogForm>
        </Togglable>
      }

      {
        blogs.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={ blog.id } blog={ blog }
              addLikes={addLikes} removeBlog={removeBlog}
              loggedInUser={user}
            />
          )
      }
    </div>
  )
}

export default App