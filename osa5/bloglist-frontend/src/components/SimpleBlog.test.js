import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

/* 5.13: blogilistan testit, step1 */
/* Tee testi, joka varmistaa, että komponentti renderöi blogin titlen, authorin ja likejen määrän. */

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'www.testing.com',
    likes: 5
  }
  
  test('renders title, author and likes', () => {
    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

  /* 5.14: blogilistan testit, step2 */
  /* Tee testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti, */
  /* komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa. */

  test('evenhandler is called twice when like button is pressed twice', () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})