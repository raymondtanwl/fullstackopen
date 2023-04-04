import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// https://github.com/testing-library/jest-dom

describe('<Blog />', () => {
  const newBlog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'http://blogurl.com',
    likes: 10,
    user: 'User\'s ID',
    id: '12345'
  }

  const mockUser = {
    name: 'Test Name',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfbmFtZSIsImlkIjoiNjNmODg5MTBjOWI0ZDIyMzRlOTA4MzFiIiwiaWF0IjoxNjc3MjU3OTU0fQ.Uf_CsMJIirxtjUzGOGjO_R1i5-RoxaIdncFtZtBqrsA',
    username:'test_name'
  }

  let component
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={newBlog.id} blog={newBlog} addLikes={likeMockHandler} loggedInUser={mockUser} />
    )
  })

  test('show only title by default', () => {
    const div = component.container.querySelector('.title')
    expect(div).toHaveTextContent(
      'Blog title'
    )
    const divDetails = component.container.querySelector('.blog-details')
    // expect(divDetails).toHaveStyle('display: none')
    expect(divDetails).not.toBeVisible()
  })

  test('show blog details when view button is clicked', async () => {
    // click view to expand details
    const button = component.container.querySelector('button')
    const user = userEvent.setup()
    await user.click(button)

    // ensure details are visible
    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBeVisible()
  })

  test('clicking the like button twice will call event handler twice', async () => {
    // click view to expand details
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // click twice
    const likeBtn = component.container.querySelector('.blog-likes button')
    expect(likeBtn).toBeVisible()
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})

