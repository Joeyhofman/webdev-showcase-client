describe('User login', () => {
  
  it('shows a login form', () => {
    cy.visit('http://localhost:3000/#/pages/login')
    cy.get('input[data-cy="email"]').should('exist');
    cy.get('input[data-cy="password"]').should('exist');
    cy.get('button[data-cy="login"]').should('exist');
    cy.get('button[data-cy="create-account"]').should('exist');
  });

  it('wrong credentials show error feedback', () => {
    cy.visit('http://localhost:3000/#/pages/login')
    cy.get('input[data-cy="email"]').type('example@example.com');
    cy.get('input[data-cy="password"]').type('password123');
    cy.get('button[data-cy="login"]').click();
    cy.get('span[data-cy="error-message"]').should('exist');
    cy.get('span[data-cy="error-message"]').contains("Uw gebruikersnaam of wachtwoord is onnuist.")
  });

  it('it redirects to dashboard when provided with correct credentials', () => {
    cy.visit('http://localhost:3000/#/pages/login')
    cy.get('input[data-cy="email"]').type('admin@admin.nl');
    cy.get('input[data-cy="password"]').type('Infra123#');
    cy.get('button[data-cy="login"]').click();
    cy.url().should('include', 'dashboard');
  });
  
  it('redirets to two factor code screen when account requires two factor authentication', () => {
    cy.visit('http://localhost:3000/#/pages/login')
    cy.get('input[data-cy="email"]').type('joey@joey.nl');
    cy.get('input[data-cy="password"]').type('Infra123#');
    cy.get('button[data-cy="login"]').click();
    cy.url().should('include', 'twofactorcode');
  });

  it('show two factor code input field', () => {
    cy.visit('http://localhost:3000/#/pages/twofactorcode')
    cy.get('input[data-cy="code"]').should("exist");
  });
});