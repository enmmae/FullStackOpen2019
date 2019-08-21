/* Mochan dokumentaatio kuitenkin suosittelee että nuolifunktioita ei käytetä, ne saattavat aiheuttaa */
/* ongelmia joissain tilanteissa. */

const blog = {
  title: 'This is a test blog',
  author: 'Hatty Hatterson',
  url: 'www.thisisatestblog.com'
}

const createBlog = function () {
  cy.contains('new blog')
    .click()
  cy.get('#title')
    .type(`${blog.title}`)
  cy.get('#author')
    .type(`${blog.author}`)
  cy.get('#url')
    .type(`${blog.url}`)
  cy.contains('create')
    .click()
  cy.contains('cancel')
    .click()
}

describe('Blog app ', function() {
  const user = {
    name: 'Essi Esimerkki',
    username: 'esmerkki',
    password: 'salainen'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog app')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Log in to application')
      cy.get('#username')
        .type(`${user.username}`)
      cy.get('#password')
        .type(`${user.password}`)
      cy.contains('login')
        .click()
    })

    /* 7.17 End to end -testaus, step1 */
    /* Tee sovellukselle ainakin kaksi E2E-testiä Cypress-kirjaston avulla. Sopiva testattava asia on esim. */
    /* käyttäjän kirjautuminen sovellukseen. */

    it('name of the user is shown', function() {
      cy.contains(`${user.name} logged in`)
    })

    it('user stays logged in after refreshing', function() {
      cy.contains(`${user.name} logged in`)
      cy.reload()
      cy.contains(`${user.name} logged in`)
    })

    it('user can log out', function() {
      cy.contains('logout')
        .click()
      cy.contains('Log in to application')
    })

    /* 7.18 End to end -testaus, step2 */
    /* Laajenna E2E-testejä siten, että testit alustavat tietokannan aina ennen testien suorittamista. */
    /* Tee myös ainakin yksi testi, joka muokkaa sovelluksen tietokantaa, esim. lisää sovellukseen blogin. */

    it('a new blog can be created', function() {
      createBlog()
      cy.contains(`${blog.title} ${blog.author}`)
    })

    /* 7.19 End to end -testaus, step3 */
    /* Laajenna vielä E2E-testejäsi. Voit merkitä tehtävän, jos käytät laajentamiseen vähintään 30 minuuttia aikaa. */

    it('a blog can be commented', function() {
      createBlog()
      cy.contains(`${blog.title} ${blog.author}`)
        .click()
      cy.get('#comment')
        .type('This is a comment')
      cy.contains('add comment')
        .click()
      cy.contains('This is a comment')
    })

    it('users page contains info of all users', function() {
      cy.contains('users')
        .click()
      cy.get('#esmerkki')
    })

    it('user page shows users blogs', function() {
      createBlog()
      cy.contains('users')
        .click()
      cy.get('#esmerkki')
        .click()
      cy.contains('added blogs')
      cy.reload()
      cy.contains(`${blog.title}`)
    })
  })
})
