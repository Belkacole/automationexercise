describe('Contact Us', () => {
  it('Should submit the Contact Us form with file upload', () => {
    
    const email = `elena.qa+${Date.now()}@example.com`;

    cy.visit('/');
    cy.contains(/home/i).should('be.visible');

    cy.contains('a', /contact us/i).click();
    cy.url().should('include', '/contact_us');

    cy.contains(/get in touch/i).should('be.visible');

    cy.get('[data-qa="name"]').type('Elena QA');
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').type('Feedback');
    cy.get('[data-qa="message"]').type('Great site! Thanks.');

    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/sample.pdf');

    cy.get('input[type="submit"]').click();

    cy.contains(/success! your details have been submitted successfully/i).should('be.visible');

    cy.contains(/home/i).click();
    cy.contains(/home/i).should('be.visible');
  });

  it('Contact Us - Long message', () => {
    const longMessage = 'x'.repeat(2000);

    cy.visit('/contact_us');

    cy.get('[data-qa="name"]').type('Elena QA');
    cy.get('[data-qa="email"]').type(`elena+${Date.now()}@ex.com`);
    cy.get('[data-qa="subject"]').type('Feedback');
    cy.get('[data-qa="message"]').type(longMessage);

    cy.get('input[type="submit"]').click();
    cy.contains(/success!/i).should('be.visible');
  });

  it('Contact Us - Unicode and emoji in message', () => {
    cy.visit('/contact_us');

    cy.get('[data-qa="name"]').type('Elena ✅');
    cy.get('[data-qa="email"]').type(`elena+${Date.now()}@ex.com`);
    cy.get('[data-qa="subject"]').type('Hi 🌟');
    cy.get('[data-qa="message"]').type('Message with emoji 😊');

    cy.get('input[type="submit"]').click();
    cy.contains(/success!/i).should('be.visible');
  });

  it('Contact Us - Email is required', () => {
    cy.visit('/contact_us');
    cy.get('[data-qa="name"]').type('Elena QA');
    cy.get('[data-qa="subject"]').type('Feedback');
    cy.get('[data-qa="message"]').type('Message without email');

    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/contact_us');

    cy.contains(/success!/i).should('not.exist');
    cy.get('[data-qa="email"]').should('be.visible');
  });
});