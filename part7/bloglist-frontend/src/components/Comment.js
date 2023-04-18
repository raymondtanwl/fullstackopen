import { useState } from 'react'


const Comments = ({ comments, handleAddComment }) => {
  const [comment, setComment] = useState('')

  const processAddComment = (e) => {
    e.preventDefault()
    // console.log('processAddComment', comment)
    handleAddComment({ comment })
  }

  return (
    <div>
      <h2>comments</h2>

      <input name="comment" value={comment} onChange={ event => setComment(event.target.value) } />
      <button onClick={processAddComment}>add comment</button>

      {
        comments && comments.map(comment => {
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

export default Comments
