const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blog = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  }).populate('comments', {
    text: 1,
    id: 1
  })

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  }).populate('comments', {
    text: 1,
    id: 1
  })

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  // handled in middleware.tokenExtractor
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  const user = req.user
  // console.log('req.user', user)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id.toString()
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  // handled in middleware.tokenExtractor
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  const reqUser = req.user

  const id = req.params.id
  const blog = await Blog.findById(id).populate('user', {
    id: 1,
  })

  if (blog.user.id.toString() === reqUser.id.toString()) {
    await Blog.deleteOne({ _id: id })
    // res.sendStatus(204).end()
    res.status(200).json(blog) // return the deleted blog for frontend to display relevant notification
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedProp = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedProp, { new: true })
  if (updatedBlog) {
    res.status(200).json(updatedBlog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const blogId = req.params.id
  // console.log('POST /:id/comments', blogId)

  const body = req.body
  // handled in middleware.tokenExtractor
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const comment = await new Comment({
    text: body.text,
    blog: blogId.toString()
  })

  const savedComment = await comment.save()

  let blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  res.status(201).json(savedComment)
})

module.exports = blogsRouter
