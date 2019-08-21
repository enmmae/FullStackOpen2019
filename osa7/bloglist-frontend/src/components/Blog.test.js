import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/* 5.15*: blogilistan testit, step3 */
/* Tee oman sovelluksesi komponentille Blog testit, jotka varmistavat, että oletusarvoisesti blogista */
/* on näkyvissä ainoastaan nimi ja kirjoittaja, ja että klikkaamalla niitä saadaan näkyviin myös muut osat blogin tiedoista. */

describe('<Blog />', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'www.testing.com',
    likes: 5
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders title and author by default', () => {
    const divDefault = component.container.querySelector('.default')
    const divHidden = component.container.querySelector('.hidden')

    // Tarkistetaan, että div joka sisältää perustiedot on näkyvissä ja toinen div ei
    expect(divDefault).toHaveStyle('display: block')
    expect(divHidden).toHaveStyle('display: none')

    // Turhahkoja lisätarkistuksia
    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(divDefault).not.toHaveTextContent(`${blog.url}`)
  })

  test('renders all info by clicking default stage', () => {
    const divDefault = component.container.querySelector('.default')
    const divHidden = component.container.querySelector('.hidden')

    fireEvent.click(divDefault)

    // Tarkistetaan, että div joka sisältää kaikki tiedot on näkyvissä ja toinen div ei
    expect(divDefault).toHaveStyle('display: none')
    expect(divHidden).toHaveStyle('display: block')

    // Turhahkoja lisätarkistuksia
    expect(divHidden).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(divHidden).toHaveTextContent(`${blog.url}`)
    expect(divHidden).toHaveTextContent(`${blog.likes}`)
    expect(divHidden).toHaveTextContent('added by')
  })
})

