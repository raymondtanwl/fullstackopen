import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getUsers().then(resUsers => {
      setUsers(resUsers)
      // console.log('resUsers', resUsers)
    })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>Blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td><Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users
