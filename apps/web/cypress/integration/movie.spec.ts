/// <reference types="cypress" />

export default context('Movie', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
        cy.get('#movie-list a:first').click()
    })

    after(() => {
        // Cancel actions and logout
        cy.get('.btn-movie-view').click()
        cy.get('#user-log a').click()
    })

    it('Check actions when user is not logged in', () => {
        cy.location('pathname').should('contain', '/movies')

        // Viewlist btn
        cy.get('.btn-movie-not-view').should('be.visible')
        cy.get('.btn-movie-not-view').click()
        cy.get('.btn-movie-not-view').should('be.visible')
    })

    it('Log in', () => {
        cy.get('#login-btn a').click()
        cy.get('#username') .type('test@test.com').should('have.value', 'test@test.com')
        cy.get('#password') .type('test@test.com').should('have.value', 'test@test.com')
        cy.get('#kc-login').click()
    })

    it('Check actions when user is logged in', () => {
        cy.location('pathname').should('contain', '/movies')

        // Viewlist btn
        cy.get('.btn-movie-not-view').should('be.visible')
        cy.get('.btn-movie-not-view').click()
        cy.get('.btn-movie-view').should('be.visible')
    })

})
