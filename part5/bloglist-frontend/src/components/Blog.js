import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, loggedInUser }) => {
  // console.log('Blog', blog)
  const [detailVisible, setDetailVisible] = useState(false)
  const [numOfLikes, setNumOfLikes] = useState(blog.likes)

  const hideWhenVisible = { display: 'none' }
  const showWhenVisible = { display: '' }

  const processLikes = () => {
    blog.likes += 1
    setNumOfLikes(blog.likes)
    addLikes(blog)
  }

  const postCreatedByUser = () => {
    if (!blog.user) return false
    return (blog.user.username === loggedInUser.username)
  }

  let result = (
    <div key={blog.id} className="blog-item">
      <div>{ blog.title } <button onClick={ () => setDetailVisible(!detailVisible) }>
        { detailVisible ? 'hide' : 'view' }</button>
      </div>
      <div style={ detailVisible ? showWhenVisible : hideWhenVisible }>
        <a href={ blog.url }>{ blog.url }</a>
      </div>
      <div style={ detailVisible ? showWhenVisible : hideWhenVisible }>
        likes { numOfLikes } <button onClick={processLikes}>like</button>
      </div>
      <div style={ detailVisible ? showWhenVisible : hideWhenVisible }>
        { blog.author }
      </div>
      <button style={ detailVisible && postCreatedByUser() ? showWhenVisible : hideWhenVisible }
        onClick={ () => { removeBlog(blog) } }>remove</button>
    </div>
  )

  return result
}

export default Blog
