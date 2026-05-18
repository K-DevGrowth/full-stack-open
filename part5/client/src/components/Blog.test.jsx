import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('single blog view', () => {
  test('blog information and likes are displayed to unauthenticated users, buttons are not displayed', () => {

  })

  test('authenticated users who are not the blog creator are shown only the like button', () => {

  })

  test('blog creator is also shown the delete button', () => {

  })


})

// test('renders content', () => {
//   const blog = {
//     title: 'html is easy',
//     author: 'kdev6',
//     url: 'https://localhost:3006',
//     likes: 6,
//   }

//   render(<Blog blog={blog} />)

//   const element = screen.findByText('html is easy kdev6')
//   expect(element).toBeDefined()
// })

// test('button show the url and like of the blog', async () => {
//   const blog = {
//     title: 'html is easy',
//     author: 'kdev6',
//     url: 'https://localhost:3006',
//     likes: 6,
//   }

//   render(<Blog blog={blog} />)

//   const user = userEvent.setup()
//   const showButton = screen.getByText('show')
//   await user.click(showButton)

//   const url = screen.getByText('https://localhost:3006')
//   expect(url).toBeDefined()
//   const likes = screen.getByText('6')
//   expect(likes).toBeDefined()
// })

// test('like twice', async () => {
//   const blog = {
//     title: 'html is easy',
//     author: 'kdev6',
//     url: 'https://localhost:3006',
//     likes: 6,
//     user: {
//       id: 'user123',
//       username: 'kdev6',
//     },
//   }

//   const mockHandler = vi.fn()
//   const user = userEvent.setup()

//   render(<Blog blog={blog} handleLikeChange={mockHandler} />)

//   const showButton = screen.getByText('show')
//   await user.click(showButton)

//   const button = screen.getByText('like')
//   await user.click(button)
//   await user.click(button)

//   expect(mockHandler).toHaveBeenCalledTimes(2)
// })
