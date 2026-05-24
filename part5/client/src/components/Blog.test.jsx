import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('single blog view', () => {
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

  test('blog information and likes are displayed to unauthenticated users, buttons are not displayed', () => {
    const blog = {
      title: 'html is easy',
      author: 'kdev6',
      url: 'https://localhost:3006',
      likes: 6,
      user: {
        id: 'user123',
        username: 'kdev6',
      },
    }

    render(<Blog blog={blog} user={null} />)

    expect(screen.getByText('html is easy')).toBeDefined()
    expect(screen.getByText('https://localhost:3006')).toBeDefined()
    expect(screen.getByText('likes 6')).toBeDefined()
    expect(screen.getByText('Added by kdev6')).toBeDefined()

    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('authenticated users who are not the blog creator are shown only the like button', async () => {
    const blog = {
      title: 'html is easy',
      author: 'kdev6',
      url: 'https://localhost:3006',
      likes: 6,
      user: {
        id: 'user123',
        username: 'kdev6',
      },
    }

    const otherUser = {
      id: 'otherId',
      username: 'otherUsername',
    }

    render(<Blog blog={blog} user={otherUser} />)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('blog creator is also shown the delete button', () => {
    const blog = {
      title: 'html is easy',
      author: 'kdev6',
      url: 'https://localhost:3006',
      likes: 6,
      user: {
        id: 'user123',
        username: 'kdev6',
      },
    }

    render(<Blog blog={blog} user={blog.user} />)

    expect(screen.queryByRole('button', { name: 'remove' })).toBeInTheDocument()
  })
})

