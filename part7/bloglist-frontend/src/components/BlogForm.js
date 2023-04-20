import { Button, Card } from 'antd'
import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
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
    <Card style={{ maxWidth: '50vw' }}
      actions={[
        <Button key="create" type="primary" onClick={addBlog}>Create</Button>
      ]}
    >
      <form className="blog-form">
        <div className='form-fld'>
          <span className='label'>Title:</span>
          <input name="title" value={blogTitle} onChange={ event => setBlogTitle(event.target.value) } />
        </div>
        <div className='form-fld'>
          <span className='label'>Author:</span>
          <input name="author" value={blogAuthor} onChange={ event => setBlogAuthor(event.target.value) } />
        </div>
        <div className='form-fld'>
          <span className='label'>URL:</span>
          <input name="url" value={blogUrl} onChange={ event => setBlogUrl(event.target.value) } />
        </div>
      </form>
    </Card>
  )
}

export default BlogForm
