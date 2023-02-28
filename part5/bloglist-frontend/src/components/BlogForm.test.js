import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {
  test('Check if correct data is passed over to create function', async () => {
    const user = userEvent.setup()
    const addBlogMockHandler = jest.fn()
    const component = render(
      <BlogForm addNewBlog={addBlogMockHandler}></BlogForm>
    )

    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')
    const btnSubmit = component.container.querySelector('button[type="submit"]')

    await user.type(titleInput, 'the title')
    await user.type(authorInput, 'the author')
    await user.type(urlInput, 'https://www.thetesturl.com')
    await user.click(btnSubmit)

    // console.log('addBlogMockHandler.mock.calls', addBlogMockHandler.mock.calls)
    expect(addBlogMockHandler.mock.calls).toHaveLength(1)
    const payload = addBlogMockHandler.mock.calls[0][0]
    expect(payload.title).toBe('the title')
    expect(payload.author).toBe('the author')
    expect(payload.url).toBe('https://www.thetesturl.com')
  })
})
