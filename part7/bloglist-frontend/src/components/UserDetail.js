import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const UserDetail = () => {
  const [user, setUser] = useState('')

  const id = useParams().id

  useEffect(() => {
    userService.getUser(id).then(resUser => {
      setUser(resUser)
    })
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      {
        user && user.blogs.map((blog) => {
          return (
            <Card size="small" key={blog.id}>
              {blog.title}
            </Card>
          )
        })
      }

    </div>
  )
}

export default UserDetail
