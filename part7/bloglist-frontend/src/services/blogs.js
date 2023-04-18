import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addComment = async ({ blogId, commentText }) => {
  // console.log('blogs.js addComment', blogId, commentText)
  const config = {
    headers: { Authorization: token },
  }

  // payload is expected to be { text: comment }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text: commentText }, config)
  return response.data
}

const update = ({ id, newObject }) => {
  // console.log('blogs.js update', id, newObject)
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, getBlog, setToken, create, update, remove, addComment }
