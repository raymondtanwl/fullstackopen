const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

/**
 * Return sum of likes from all the blogs
 * @param {*} blogs
 * @returns
 */
const totalLikes = (blogs) => {
  return blogs.reduce((sum, part) => sum + part.likes, 0)
}

/**
 * Return blog with most likes
 * @param {*} blogs
 * @returns
 */
const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const favBlog = blogs.reduce((highest, curr) => highest.likes > curr.likes ? highest : curr)

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

/**
 * Return author with most blogs
 * @param {*} blogs
 * @returns
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const countByAuthor = lodash.countBy(blogs, 'author')
  // console.log(count)
  const highestCountAuthor = Object.keys(countByAuthor).reduce((highest, curr) => {
    return countByAuthor[highest] > countByAuthor[curr] ? highest : curr
  })

  return {
    author: highestCountAuthor,
    blogs: countByAuthor[highestCountAuthor]
  }
}

/**
 * Return the author with most likes from all the blogs
 * @param {*} blogs
 * @returns
 */
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // group by author
  const groupByAuthorArray = lodash.groupBy(blogs, 'author')
  // sum all likes by author's blog(s)
  const sumUpLikesByAuthors = Object.keys(groupByAuthorArray).map((key) => {
    // console.log('key', key)
    // console.log('likes', groupByAuthorArray[key].reduce((sum, curr) =>  sum + curr.likes, 0))
    return {
      author: key,
      likes: groupByAuthorArray[key].reduce((sum, curr) =>  sum + curr.likes, 0)
    }
  })
  // sort by likes
  const sortedByLikes = lodash.sortBy(sumUpLikesByAuthors, 'likes')
  // console.log('sortedByLikes', sortedByLikes)

  return lodash.last(sortedByLikes)
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
