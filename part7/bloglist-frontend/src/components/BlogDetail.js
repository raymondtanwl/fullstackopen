import { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import LoginContext from '../context/loginContext'
import NotifContext, { setNotification } from '../context/notifContext'
import { EnumNotifType } from './Notification'
import blogService from '../services/blogs'

const BlogDetail = () => {
  // not specifying the first notifPayload param will cause the dispatch to be null
  // const [notifDispatch] = useContext(NotifContext)
  // eslint-disable-next-line no-unused-vars
  const [notifPayload, notifDispatch] = useContext(NotifContext)
  const [loginPayload] = useContext(LoginContext)
  // const queryClient = useQueryClient()
  const [blog, setBlog] = useState('')
  const [numOfLikes, setNumOfLikes] = useState(blog.likes)

  const navigate = useNavigate()

  const hideWhenVisible = { display: 'none' }
  const showWhenVisible = { display: '' }

  const id = useParams().id

  useEffect(() => {
    blogService.getBlog(id).then(resBlog => {
      // console.log('resBlog', resBlog)
      setBlog(resBlog)
      setNumOfLikes(resBlog.likes)
    })
  }, [])

  const processLikes = () => {
    blog.likes += 1
    setNumOfLikes(blog.likes)
    handleLikeBlog(blog)
  }

  const postCreatedByUser = () => {
    if (!blog.user || !loginPayload) return false
    return (blog.user.username === loginPayload.username)
  }

  // #region Blog

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
      window.alert(`Blog ${removedBlog.title} by ${removedBlog.author} is removed`)
      navigate('/')
    }
  })

  // #endregion Blog

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{numOfLikes} likes <button className="btn-like" onClick={processLikes}>like</button></div>
      <div>added by {blog.author}</div>
      <button className="btn-remove" style={ postCreatedByUser() ? showWhenVisible : hideWhenVisible }
        onClick={ () => { handleRemoveBlog(blog) } }>
          remove
      </button>

      <h2>comments</h2>
      {
        blog.comments.map(comment => {
          return (
            <li key={comment.id}>
              {comment.text}
            </li>
          )
        })
      }
    </div>
  )
}

export default BlogDetail
