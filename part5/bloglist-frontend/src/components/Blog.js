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
    if (!blog.user || !loggedInUser) return false
    return (blog.user.username === loggedInUser.username)
  }

  let result = (
    <div key={blog.id} className="blog-item">
      <div className="title">{ blog.title } <button className="btn-view" onClick={ () => setDetailVisible(!detailVisible) }>
        { detailVisible ? 'hide' : 'view' }</button>
      </div>
      <div className="blog-details" style={ detailVisible ? showWhenVisible : hideWhenVisible }>
        <div className="blog-url">
          <a href={ blog.url }>{ blog.url }</a>
        </div>
        <div className="blog-likes">
          likes { numOfLikes } <button className="btn-like" onClick={processLikes}>like</button>
        </div>
        <div className="blog-author">
          { blog.author }
        </div>
        <button className="btn-remove" style={ postCreatedByUser() ? showWhenVisible : hideWhenVisible }
          onClick={ () => { removeBlog(blog) } }>
            remove
        </button>
      </div>
    </div>
  )

  return result
}

export default Blog
