describe('User registration', () => {
  
  it('shows a registration form', () => {
    cy.visit('http://localhost:3000/#/pages/register')
    cy.get('input[data-cy="username"]').should('exist');
    cy.get('input[data-cy="email"]').should('exist');
    cy.get('input[data-cy="password"]').should('exist');
    cy.get('input[data-cy="repeat-password"]').should('exist');
    cy.get('button[data-cy="register"]').should('exist');
    cy.get('button[data-cy="i-have-an-account"]').should('exist');
  })


})