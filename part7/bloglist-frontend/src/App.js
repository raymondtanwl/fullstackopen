/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification, { EnumNotifType } from './components/Notification'
import Togglable from './components/Togglable'
import NotifContext, { setNotification } from './context/notifContext'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notifPayload, notifDispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()
  const [loginVisible, setLoginVisible] = useState(false)
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // #region Blogs
  const handleAddBlog = (blog) => {
    console.log('handleAddBlog')
    addBlogMutation.mutate(blog)
  }

  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      // console.log('useMutation addBlogMutation onSuccess', newBlog)
      // the name/key should be same as the one defined in useQuery('blogs')
      queryClient.invalidateQueries('blogs')
      const notifPayload = {
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: EnumNotifType.SuccessNotif,
      }
      setNotification(notifDispatch, notifPayload)
    }
  })

  const handleLikeBlog = (blog) => {
    console.log('handleLikeBlog', blog)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id
    }
    // mutation func can only take one param, therefore we passing it as an object
    likeBlogMutation.mutate({ id: blog.id, newObject: newBlog })
  }

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      // console.log('useMutation likeBlogMutation onSuccess', updatedBlog)
      // the name/key should be same as the one defined in useQuery('blogs')
      queryClient.invalidateQueries('blogs')
      const notifPayload = {
        message: `Blog ${updatedBlog.title} by ${updatedBlog.author} is liked`,
        type: EnumNotifType.SuccessNotif,
      }
      setNotification(notifDispatch, notifPayload)
    }
  })

  const handleRemoveBlog = (blog) => {
    console.log('handleRemoveBlog', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: (removedBlog) => {
      // console.log('useMutation removeBlogMutation onSuccess', removedBlog)
      // the name/key should be same as the one defined in useQuery('blogs')
      queryClient.invalidateQueries('blogs')
      const notifPayload = {
        message: `Blog ${removedBlog.title} by ${removedBlog.author} is removed`,
        type: EnumNotifType.SuccessNotif,
      }
      setNotification(notifDispatch, notifPayload)
    }
  })

  const blogs = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  console.log('query res', blogs)
  // #endregion Blogs

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
      const notifPayload = {
        message: `${error.response.data.error}`,
        type: EnumNotifType.ErrorNotif,
      }
      setNotification(notifDispatch, notifPayload)
    }
  }

  const handleLogout = () => {
    // console.log('handleLogout')
    window.localStorage.clear()
    setUser(null)
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

  if (blogs.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      {!user && loginForm()}

      <h2>blogs</h2>

      <Notification />

      { user &&
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
      }

      { user &&
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm addNewBlog={handleAddBlog}></BlogForm>
        </Togglable>
      }

      {
        blogs.data.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={ blog.id } blog={ blog }
              addLikes={handleLikeBlog}
              removeBlog={handleRemoveBlog}
              loggedInUser={user}
            />
          )
      }
    </div>
  )
}

export default App