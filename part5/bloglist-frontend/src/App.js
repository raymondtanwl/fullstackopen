import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification, { EnumNotifType } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  
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
      blogService.setToken(user.token)
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
      setUser(user)
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

  const addBlog = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      const response = await blogService.create(newBlog)
      // console.log('blog created response', response)
      invokeNotification({
        message: `A new blog ${response.title} by ${response.author} added`,
        type: EnumNotifType.SuccessNotif,
      })
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (error) {
      invokeNotification({
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      })
    }
  }

  const updateTitle = (event) => {
    setBlogTitle(event.target.value);
  }
  const updateAuthor = (event) => {
    setBlogAuthor(event.target.value);
  }
  const updateUrl = (event) => {
    setBlogUrl(event.target.value);
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const invokeNotification = (errorObj) => {
    setErrorMessage({ message: errorObj.message, type: errorObj.type });
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      {!user && loginForm()}

      <h2>blogs</h2>

      <Notification errorMessage={errorMsg}></Notification>

      {user && 
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm addNewBlog={addBlog}
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            updateTitle={updateTitle}
            updateAuthor={updateAuthor}
            updateUrl={updateUrl}
          ></BlogForm>
        </div>
      }
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App