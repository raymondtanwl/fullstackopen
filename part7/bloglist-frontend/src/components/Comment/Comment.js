import { Button, Card, Divider } from 'antd'
import { useState } from 'react'
import './Comment.css'

const Comments = ({ comments, handleAddComment }) => {
  const [comment, setComment] = useState('')

  const processAddComment = (e) => {
    e.preventDefault()
    // console.log('processAddComment', comment)
    handleAddComment({ comment })
  }

  return (
    <div>
      {/* <h2>comments</h2> */}
      <Divider orientation="left" orientationMargin={0}>Comments</Divider>

      <div className='comment-input-container'>
        <input name="comment" placeholder="comment" value={comment} onChange={ event => setComment(event.target.value) } />
        <Button type="primary" onClick={processAddComment}>Add comment</Button>
      </div>

      {
        comments && comments.map(comment => {
          return (
            <Card size="small" key={comment.id}>
              <p>{comment.text}</p>
              {/* <li key={comment.id}>
                {comment.text}
              </li> */}
            </Card>
          )
        })
      }
    </div>
  )
}

export default Comments
