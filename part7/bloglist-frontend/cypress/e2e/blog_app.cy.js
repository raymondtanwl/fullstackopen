describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Name',
      username: 'test_name',
      password: 'abc123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user2 = {
      name: 'Test Name2',
      username: 'test_name2',
      password: 'abc1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login', function() {
    it('Login fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('test_name')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('#btn-login').click()

      // check if error message is shown
      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.class', 'error')
    })

    it('User can login', function () {
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('test_name')
      cy.get('input[name="Password"]').type('abc123')
      cy.get('#btn-login').click()

      cy.contains('Test Name logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.log('When logged in beforeEach func()')
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('test_name')
      cy.get('input[name="Password"]').type('abc123')
      cy.get('#btn-login').click().wait(500)
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('input[name="title"]').type('Test E2E Blog')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://test.e2eblog.io')
      cy.get('button[type="submit"]').click()

      cy.contains('Test E2E Blog')
    })
  })

  describe('Logged in and and multiple blogs available', function() {
    beforeEach(function () {
      cy.log('When logged in beforeEach func()')
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('test_name')
      cy.get('input[name="Password"]').type('abc123')
      cy.get('#btn-login').click().wait(500)

      cy.wait(1000)
      cy.addBlog({
        title: 'first blog',
        author: 'cypress',
        url: 'https://www.firstblog.com/',
      })
      cy.addBlog({
        title: 'second blog',
        author: 'cypress',
        url: 'https://www.secondblog.com/',
      })
      cy.addBlog({
        title: 'third blog',
        author: 'cypress',
        url: 'https://www.thirdblog.com/',
      })
    })

    it('User can like a blog', function() {
      cy.contains('first blog').contains('view').click()

      cy.contains('first blog').parent().contains('likes').then((likesElem) => {
        // store the likes before click for comparison later
        const likesBefore = Number(likesElem.text().split(' ')[1])
        cy.contains('first blog').parent().contains('likes').find('button').click()

        cy.contains('first blog').get('.blog-likes').then((likesElem) => {
          const likesAfter = Number(likesElem.text().split(' ')[1])
          // console.log(`${likesAfter} > ${likesBefore}`)
          expect(likesAfter > likesBefore)
        })
      })
    })

    it('User can delete blog that is created by them', function() {
      cy.contains('first blog').contains('view').click()

      cy.contains('first blog').parent().contains('remove').click()
      cy.should('not.contain', 'first blog')
    })

    it('The blog likes are ordered accordingly', function() {
      cy.contains('first blog').contains('view').click()
      cy.contains('first blog').parent().contains('likes').find('button').click().wait(500)

      cy.contains('third blog').contains('view').click()
      cy.contains('third blog').parent().contains('likes').find('button').click().wait(500)
      cy.contains('third blog').parent().contains('likes').find('button').click().wait(500)

      cy.get('.blog-item').eq(0).should('contain', 'third blog')
      cy.get('.blog-item').eq(1).should('contain', 'first blog')
      cy.get('.blog-item').eq(2).should('contain', 'second blog')
    })
  })

  describe('When logged in as different user', function() {
    it('User can cannot see delete button if blog is not created by them', function() {
      // create new blog with test_name2 user
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('test_name2')
      cy.get('input[name="Password"]').type('abc1234')
      cy.get('#btn-login').click()
      cy.wait(500)

      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('Test E2E Blog')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://test.e2eblog.io')
      cy.get('button[type="submit"]').click()
      cy.wait(1000)

      cy.contains('logout').click()
      cy.wait(500)

      // login with test_name user and verify unable to view remove button
      cy.get('input[name="Username"]').type('test_name')
      cy.get('input[name="Password"]').type('abc123')
      cy.get('#btn-login').click()
      cy.wait(500)
      cy.contains('Test E2E Blog').contains('view').click()
      cy.should('not.contain', 'remove')
    })
  })

})
