const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blog = await Blog.find({})
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.deleteOne({ _id: id })
  res.sendStatus(204).end()
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

module.exports = blogsRouter
