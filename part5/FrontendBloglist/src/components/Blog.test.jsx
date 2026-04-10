import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'html is easy',
    author: 'kdev6',
    url: 'https://localhost:3006',
    likes: 6,
  }

  render(<Blog blog={blog} />)

  const element = screen.findByText('html is easy kdev6')
  expect(element).toBeDefined()
})

test('check button', () => {

})
