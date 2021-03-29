/// <reference types="cypress" />

export default context('SideMenu', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/movies/', { fixture: 'movies.json' });
    cy.visit('http://localhost:3001/');
  });

  it('Check all elements are displayed', () => {
    cy.get('#side-menu').should('be.visible');
    cy.get('#logo').should('be.visible');
    cy.get('.menu img').should('be.visible');
    cy.get('.menu img').should('have.length', 3);
  });

  it('Check all menu links', () => {
    cy.get('#logo').click();
    cy.location('pathname').should('equal', '/');
    cy.get('.home-link').click();
    cy.location('pathname').should('equal', '/');
    cy.get('.wish-link').click();
    cy.location('pathname').should('equal', '/wishlist');
    cy.get('.view-link').click();
    cy.location('pathname').should('equal', '/viewlist');
  });

  it('Logout', () => {
    cy.get('#user-log a').click();
  });
});
