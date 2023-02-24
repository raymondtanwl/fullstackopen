const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

beforeEach(async () => {
  console.log('Resetting test data...')
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testBlogsArray)
})

describe('sanity check on blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.testBlogsArray.length)
  })

  test('blogs have the unique id property', async () => {
    const response = await api.get('/api/blogs')
    for (const blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('create new blog', () => {
  // eslint-disable-next-line no-unused-vars
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('abc123', 10)
    const user = await new User({
      username: 'test_name',
      name: 'Test Name',
      passwordHash
    }).save()

    const userForToken = { username: 'test_name', id: user.id }
    return (token = jwt.sign(userForToken, config.SECRET))
  })

  test('new blog created without providing token', async () => {
    const newBlog = {
      title: 'Blog this',
      author: 'Allison',
      url: 'https://www.test.com',
      likes: 1,
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    // verify untouched
    const totalBlogsResponse = await api.get('/api/blogs')
    expect(totalBlogsResponse.body).toHaveLength(helper.testBlogsArray.length)
  })

  test('new blog created by authorised user', async () => {
    const newBlog = {
      title: 'Blog this',
      author: 'Allison',
      url: 'https://www.test.com',
      likes: 1,
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // verify length
    const totalBlogsResponse = await api.get('/api/blogs')
    expect(totalBlogsResponse.body).toHaveLength(helper.testBlogsArray.length + 1)

    // verify content
    const titles = totalBlogsResponse.body.map((b) => b.title)
    expect(titles).toContain('Blog this')
  })

  test('likes of blog default to 0 if not defined', async () => {
    const newBlog = {
      title: 'Lorem ipsum',
      author: 'Kerry',
      url: 'https://www.testing.com',
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogsResponse = await api.get('/api/blogs')
    expect(totalBlogsResponse.body).toHaveLength(helper.testBlogsArray.length + 1)
    expect(totalBlogsResponse.body[totalBlogsResponse.body.length - 1].likes).toBe(0)
  })

  test('title is not defined', async () => {
    const newBlog = {
      author: 'Ahmad',
      url: 'https://www.ahmad.com',
      likes: 1,
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('url is not defined', async () => {
    const newBlog = {
      title: 'Epic',
      author: 'Erina',
      likes: 1,
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('delete a blog', () => {
  // eslint-disable-next-line no-unused-vars
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('abc123', 10)
    const user = await new User({
      username: 'test_name',
      name: 'Test Name',
      passwordHash
    }).save()

    const tokenObj = { username: 'test_name', id: user.id }
    token = jwt.sign(tokenObj, config.SECRET)
    // console.log('token', token)
    return token
  })

  beforeEach(async () => {
    // insert new blog for testing deletion
    const newBlog = {
      title: 'A guide to blogging',
      author: 'John Doe',
      url: 'https://www.guidetoblog.com',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('delete by invalid user', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogIdToDelete = initialBlogs.body[initialBlogs.body.length - 1].id
    // console.log('blogIdToDelete', blogIdToDelete)
    await api.delete(`/api/blogs/${blogIdToDelete}`)
      .set('Authorization', `Bearer ${token}xyz`)
      .expect(401)

    // verify blogs is untouched
    const totalBlogsResponse = await api.get('/api/blogs')
    expect(totalBlogsResponse.body).toHaveLength(initialBlogs.body.length)
  })

  test('check if blog is deleted', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogIdToDelete = initialBlogs.body[initialBlogs.body.length - 1].id
    await api.delete(`/api/blogs/${blogIdToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // verify blog has been deleted
    const totalBlogsResponse = await api.get('/api/blogs')
    const result = totalBlogsResponse.body.filter(b => b.id === blogIdToDelete)
    expect(result).toHaveLength(0)
  })
})

describe('update a blog' , () => {
  test('update blog\'s like', async () => {
    const blogIdToAddLike = '5a422a851b54a676234d17f7'
    await api
      .put(`/api/blogs/${blogIdToAddLike}`)
      .send({ likes: 10 })
      .expect(200)

    const totalBlogsResponse = await api.get('/api/blogs')
    const result = totalBlogsResponse.body.filter(b => b.id === blogIdToAddLike)
    expect(result.length).toBe(1)
    expect(result[0].likes).toBe(10)
  })
})

afterAll(async () => {
  console.log('To close connection...')
  await mongoose.connection.close()
})
