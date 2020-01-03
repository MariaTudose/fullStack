import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog-item')

    expect(blogs.length).toBe(0)

  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'testaaja',
      token: '123456789',
      name: 'matti tattinen'
    }

    window.localStorage.setItem('user', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog-item')
    )

    const blogs = component.container.querySelectorAll('.blog-item')

    expect(blogs.length).toBe(6)
  })
})