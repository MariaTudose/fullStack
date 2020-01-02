import React from 'react'
import { render } from '@testing-library/react'
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