import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

/* 5.16*: blogilistan testit, step4 */
/* Tee sovelluksesi integraatiotesti, joka varmistaa, että jos käyttäjä ei ole kirjautunut järjestelmään, */
/* näyttää sovellus ainoastaan kirjautumislomakkeen, eli yhtään blogia ei vielä renderöidä. */

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // expectations here
    const title = component.getByText('Log in to application')
    expect(title).toBeDefined()

    expect(component.container).not.toHaveTextContent('HTML is easy Essi Esimerkki')
    expect(component.container).not.toHaveTextContent('Browser can execute only javascript Mikko Matemaatikko')
    expect(component.container).not.toHaveTextContent('The most important methods of HTTP are GET and POST Berry Bentley')
  })

  /* 5.17*: blogilistan testit, step5 */
  /* Tee myös testi, joka varmistaa, että kun käyttäjä on kirjautuneena, blogit renderöityvät sivulle. */

  test('when user is logged in, blogs are rendered', async () => { 
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )

    const logout = component.getByText('logout')
    expect(logout).toBeDefined()

    expect(component.container).toHaveTextContent('HTML is easy Essi Esimerkki')
    expect(component.container).toHaveTextContent('Browser can execute only javascript Mikko Matemaatikko')
    expect(component.container).toHaveTextContent('The most important methods of HTTP are GET and POST Berry Bentley')
  })
})