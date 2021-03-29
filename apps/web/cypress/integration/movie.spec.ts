/// <reference types="cypress" />

export default context('Movie', () => {
  beforeEach(() => {
    cy.intercept('movies/*', { fixture: 'movie.json' });
    cy.intercept('movies/', { fixture: 'movies.json' });
    cy.intercept('comments', { fixture: 'comments.json' });
    cy.intercept('get', 'views', { statusCode: 200 });
    cy.intercept('get', 'views/*', { statusCode: 200 });
    cy.intercept('post', 'views', { statusCode: 201 });
    cy.intercept('delete', 'views', { statusCode: 204 });
    cy.intercept('get', 'wishlist');
    cy.intercept('post', 'wishlist');
    cy.intercept('delete', 'wishlist');
    cy.visit('http://localhost:3001/');
    cy.get('#movie-list a:first').click();
  });

  it('Check actions when user is not logged in', () => {
    cy.location('pathname').should('contain', '/movies');

    // Viewlist btn
    cy.get('.btn-movie-not-view').should('be.disabled');
  });

  it('Check actions when user is logged in', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.get('#login-btn a').click();
    cy.get('#username').type(username).should('have.value', username);
    cy.get('#password').type(password).should('have.value', password);
    cy.get('#kc-login').click();

    cy.visit('http://localhost:3001/');
    cy.wait(1000);
    cy.get('#movie-list a:first').click();

    cy.location('pathname').should('contain', '/movies');

    // Viewlist btn
    cy.get('.btn-movie-view').should('not.be.disabled');
    cy.get('.btn-movie-view').should('be.visible');
    cy.get('.btn-movie-view img').click();
    cy.get('.btn-movie-not-view').should('be.visible');

    // Cancel actions and logout
    cy.get('.btn-movie-not-view').click();
  });
});
