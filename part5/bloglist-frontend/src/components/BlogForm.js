import { useState } from 'react'

const BlogForm = ({
  addNewBlog
}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title<input value={blogTitle} onChange={ event => setBlogTitle(event.target.value) } />
      </div>
      <div>
        author<input value={blogAuthor} onChange={ event => setBlogAuthor(event.target.value) } />
      </div>
      <div>
        url<input value={blogUrl} onChange={ event => setBlogUrl(event.target.value) } />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
