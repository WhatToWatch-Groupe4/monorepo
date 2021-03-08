/// <reference types="cypress" />

export default context('Auth', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
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
        cy.get('#login-btn a').click()
        cy.location('href').should('contain', 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/auth')
        cy.get('#username') .type('test@test.com').should('have.value', 'test@test.com')
        cy.get('#password') .type('test@test.com').should('have.value', 'test@test.com')
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
