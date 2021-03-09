/// <reference types="cypress" />

export default context('Home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
        cy.intercept('http://localhost:3000/movies/*', { fixture: 'movie.json' })
        cy.intercept('http://localhost:3000/movies/', { fixture: 'movies.json' })
        cy.intercept('http://localhost:3000/comments', { fixture: 'comments.json' })
    })

    it('Check all elements are displayed', () => {
        cy.get('#side-menu').should('be.visible')
        cy.get('#top-menu').should('be.visible')
        cy.get('#login-btn').should('be.visible')
        cy.get('#register-btn').should('be.visible')
        cy.get('h1').should('be.visible')
        cy.get('h1').should('have.text', 'TOUS LES FILMS / SÉRIES')
    })

    it('Check all films are displayed', () => {
        cy.get('#movie-list a').should('be.visible')
        cy.get('#movie-list a').should('have.length', 1)
    })

    it('Check login btn', () => {
        cy.get('#login-btn a').click()
        cy.location('href').should('contain', 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/auth')
    })

    it('Check register btn', () => {
        cy.get('#register-btn a').click()
        cy.location('href').should('contain', 'https://accounts.agravelot.eu/auth/realms/wtw/protocol/openid-connect/registrations')
    })

    it('Check click film', () => {
        cy.get('#movie-list a:first').click()
        cy.location('pathname').should('contain', '/movies')
    })

})
