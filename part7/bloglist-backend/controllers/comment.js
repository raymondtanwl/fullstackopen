const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

commentRouter.get('/:id', async (req, res) => {
  const blog = await Comment.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

commentRouter.post('/', async (req, res) => {
  const body = req.body
  // handled in middleware.tokenExtractor
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  const user = req.user
  // console.log('req.user', user)

  const blog = await new Comment({
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


module.exports = commentRouter
