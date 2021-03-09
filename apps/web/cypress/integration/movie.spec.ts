/// <reference types="cypress" />

export default context('Movie', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
        cy.intercept('http://localhost:3000/movies/*', { fixture: 'movie.json' })
        cy.intercept('http://localhost:3000/movies/', { fixture: 'movies.json' })
        cy.intercept('http://localhost:3000/comments', { fixture: 'comments.json' })
        cy.intercept('get', 'http://localhost:3000/views', { id: 1 })
        cy.intercept('post', 'http://localhost:3000/views', { id: 1 })
        cy.intercept('delete', 'http://localhost:3000/views', { id: 1 })
        cy.intercept('get', 'http://localhost:3000/wishlist', { userUuid: 1 })
        cy.intercept('post', 'http://localhost:3000/wishlist', { userUuid: 1 })
        cy.intercept('delete', 'http://localhost:3000/wishlist', { userUuid: 1 })
        cy.get('#movie-list a:first').click()
    })

    it('Check actions when user is not logged in', () => {
        cy.location('pathname').should('contain', '/movies')

        // Viewlist btn
        cy.get('.btn-movie-not-view').should('be.disabled')
    })

    it('Log in', () => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')

        cy.get('#login-btn a').click()
        cy.get('#username') .type(username).should('have.value', username)
        cy.get('#password') .type(password).should('have.value', password)
        cy.get('#kc-login').click()
    })

    it('Check actions when user is logged in', () => {
        cy.location('pathname').should('contain', '/movies')

        // Viewlist btn
        cy.get('.btn-movie-view').should('not.be.disabled')
        cy.get('.btn-movie-view').should('be.visible')
        cy.get('.btn-movie-view img').click()
        cy.get('.btn-movie-not-view').should('be.visible')

        // Cancel actions and logout
        cy.get('.btn-movie-not-view').click()
    })

})
