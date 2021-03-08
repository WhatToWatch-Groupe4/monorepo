/// <reference types="cypress" />

export default context('Movie', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
        cy.get('#movie-list a:first').click()
    })

    it('Check actions when user is not logged in', () => {
        cy.location('pathname').should('contain', '/movies')

        // Viewlist btn
        cy.get('.btn-movie-not-view').should('be.visible')
        cy.get('.btn-movie-not-view').click()
        cy.get('.btn-movie-not-view').should('be.visible')
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
        cy.get('.btn-movie-not-view').should('be.visible')
        cy.get('.btn-movie-not-view img').click()
        cy.get('.btn-movie-view').should('be.visible')

        // Cancel actions and logout
        cy.get('.btn-movie-view').click()
        cy.get('#user-log a').click()
    })

})
