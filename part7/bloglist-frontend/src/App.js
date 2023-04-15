/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
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
  const queryClient = useQueryClient()
  const [loginVisible, setLoginVisible] = useState(false)
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  // const blogFormRef = useRef()

  // // #region Blogs
  // const handleAddBlog = (blog) => {
  //   console.log('handleAddBlog')
  //   addBlogMutation.mutate(blog)
  // }

  // const addBlogMutation = useMutation(blogService.create, {
  //   onSuccess: (newBlog) => {
  //     // console.log('useMutation addBlogMutation onSuccess', newBlog)
  //     // the name/key should be same as the one defined in useQuery('blogs')
  //     queryClient.invalidateQueries('blogs')
  //     const notifPayload = {
  //       message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
  //       type: EnumNotifType.SuccessNotif,
  //     }
  //     setNotification(notifDispatch, notifPayload)
  //   }
  // })

  // const handleLikeBlog = (blog) => {
  //   console.log('handleLikeBlog', blog)
  //   const newBlog = {
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes,
  //     user: blog.user.id
  //   }
  //   // mutation func can only take one param, therefore we passing it as an object
  //   likeBlogMutation.mutate({ id: blog.id, newObject: newBlog })
  // }

  // const likeBlogMutation = useMutation(blogService.update, {
  //   onSuccess: (updatedBlog) => {
  //     // console.log('useMutation likeBlogMutation onSuccess', updatedBlog)
  //     // the name/key should be same as the one defined in useQuery('blogs')
  //     queryClient.invalidateQueries('blogs')
  //     const notifPayload = {
  //       message: `Blog ${updatedBlog.title} by ${updatedBlog.author} is liked`,
  //       type: EnumNotifType.SuccessNotif,
  //     }
  //     setNotification(notifDispatch, notifPayload)
  //   }
  // })

  // const handleRemoveBlog = (blog) => {
  //   console.log('handleRemoveBlog', blog)
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     removeBlogMutation.mutate(blog.id)
  //   }
  // }

  // const removeBlogMutation = useMutation(blogService.remove, {
  //   onSuccess: (removedBlog) => {
  //     // console.log('useMutation removeBlogMutation onSuccess', removedBlog)
  //     // the name/key should be same as the one defined in useQuery('blogs')
  //     queryClient.invalidateQueries('blogs')
  //     const notifPayload = {
  //       message: `Blog ${removedBlog.title} by ${removedBlog.author} is removed`,
  //       type: EnumNotifType.SuccessNotif,
  //     }
  //     setNotification(notifDispatch, notifPayload)
  //   }
  // })

  // const blogs = useQuery('blogs', blogService.getAll, {
  //   refetchOnWindowFocus: false,
  //   retry: 1
  // })
  // console.log('query res', blogs)
  // // #endregion Blogs

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      // setUser(user)
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

  const handleLogout = () => {
    // console.log('handleLogout')
    window.localStorage.clear()
    // setUser(null)
    loginDispatch({ type: 'LOGOUT' })
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

  return (
    <Router>
      <div>
        {!loginPayload && loginForm()}

        <h2>blogs</h2>

        <Notification />

        { loginPayload &&
          <div>
            <p>{loginPayload.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
        }

        {/* { loginPayload &&
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addNewBlog={handleAddBlog}></BlogForm>
          </Togglable>
        } */}

        {/* {
          loginPayload &&
          <Blogs />
          // loginPayload && blogs.data.sort((a, b) => b.likes - a.likes)
          //   .map(blog =>
          //     <Blog
          //       key={ blog.id } blog={ blog }
          //       addLikes={handleLikeBlog}
          //       removeBlog={handleRemoveBlog}
          //     />
          //   )
        } */}

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App