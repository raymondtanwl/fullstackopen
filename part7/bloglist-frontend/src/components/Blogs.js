import { useRef, useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { EnumNotifType } from './Notification'
import NotifContext, { setNotification } from '../context/notifContext'
import { Divider } from 'antd'

const Blogs = () => {
  // eslint-disable-next-line no-unused-vars
  const [notifPayload, notifDispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()
  const blogFormRef = useRef()

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

  const blogs = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  // console.log('query res', blogs)

  // #endregion Blogs

  if (blogs.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addNewBlog={handleAddBlog} />
      </Togglable>

      <Divider />

      {
        blogs.data.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={ blog.id } blog={ blog }
              // addLikes={handleLikeBlog}
              // removeBlog={handleRemoveBlog}
            />
          )
      }
    </>
  )
}

export default Blogs
