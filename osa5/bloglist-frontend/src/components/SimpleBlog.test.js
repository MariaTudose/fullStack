import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Testing with jest',
    author: 'Cool dude',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Testing with jest')
  expect(component.container).toHaveTextContent('Cool dude')
  expect(component.container).toHaveTextContent('blog has 0 likes')
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing with jest',
    author: 'Cool dude',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})