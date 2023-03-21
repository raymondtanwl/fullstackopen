// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const [ contentValue, contentBind, contentReset ] = useField('text', 'anecdoteContent', 'anecdote content')
  const [ authorValue, authorBind, authorReset ] = useField('text', 'anecdoteAuthor')
  const [ infoValue, infoBind, infoReset ] = useField('text', 'anecdoteInfo', 'https://...')
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    console.log('handleSubmit', e)
    console.log('contentValue', contentValue)
    console.log('authorValue', authorValue)
    console.log('infoValue', infoValue)
    e.preventDefault()
    // props.addNew({
    //   content,
    //   author,
    //   info,
    //   votes: 0
    // })
    props.addNew({
      content: contentValue,
      author: authorValue,
      info: infoValue,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    console.log('handleReset', e)
    e.preventDefault()
    _resetAllFields()
  }

  const _resetAllFields = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
          {/* <input name='content' value={newAnecdoteContent.value} onChange={newAnecdoteContent.onChange} /> */}
          <input {...contentBind} />
        </div>
        <div>
          author
          {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
          {/* <input name='author' value={newAnecdoteAuthor.value} onChange={newAnecdoteAuthor.onChange} /> */}
          <input {...authorBind} />
        </div>
        <div>
          url for more info
          {/* <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} /> */}
          {/* <input name='info' value={newAnecdoteInfo.value} onChange={newAnecdoteInfo.onChange} /> */}
          <input {...infoBind} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
