/// <reference types="cypress" />

export default context('Auth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
        cy.intercept('http://localhost:3000/movies/', { fixture: 'movies.json' })
    })

    it('Check login or password error', () => {
        cy.get('#login-btn a').click()
        cy.location('href').should('contain', 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/auth')
        cy.get('#username') .type('fake@email.com').should('have.value', 'fake@email.com')
        cy.get('#password') .type('fakepassword').should('have.value', 'fakepassword')
        cy.get('#kc-login').click()
        cy.get('#input-error').should('be.visible')
    })

    it('Check correct login', () => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')

        cy.get('#login-btn a').click()
        cy.location('href').should('contain', 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/auth')
        cy.get('#username') .type(username).should('have.value', username)
        cy.get('#password') .type(password).should('have.value', password)
        cy.get('#kc-login').click()
        cy.location('href').should('equal', 'http://localhost:3001/')
        cy.get('#user-log').should('be.visible')
        cy.get('#user-log .name').should('have.text', 'test')
    })

    it('Check logout', () => {
        cy.get('#user-log').should('be.visible')
        cy.get('#user-log a').click()
        cy.location('href').should('equal', 'http://localhost:3001/')
        cy.get('#login-btn').should('be.visible')
        cy.get('#register-btn').should('be.visible')
    })

})
