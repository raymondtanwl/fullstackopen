import { Table } from 'antd'
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // causes error validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
      // decide to define render template in column obj or data obj
      // render: (_, user) => <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>,
      // render: (user) => user,
      render: (user) => <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>,
    },
    {
      title: 'Blogs created',
      dataIndex: 'count',
      key: 'count',
    }
  ]

  const data = users.reduce((acc, user) => {
    acc.push({
      key: user.id,
      // name: <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>,
      name: user,
      count: user.blogs.length
    })
    return acc
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {/* <table>
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
      </table> */}

      <Table columns={columns} dataSource={data} bordered />

    </div>
  )
}

export default Users
