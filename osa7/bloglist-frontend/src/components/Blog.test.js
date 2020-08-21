import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('clicking the title opens details', async () => {
  const blog = {
    title: 'Testing with jest',
    author: 'Cool dude',
    likes: 0,
    url: 'https://www.google.fi',
    user: { name: 'tester' }
  }

  const { container, getByText } = render(
    <Blog blog={blog} user={{ name: 'tester' }} />
  )

  expect(container).toHaveTextContent(blog.author)
  expect(container).toHaveTextContent(blog.title)
  expect(container).not.toHaveTextContent(blog.likes)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.user.name)

  const title = getByText(blog.title + ' ' + blog.author)

  fireEvent.click(title)

  expect(container).toHaveTextContent(blog.likes)
  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(blog.user.name)



})