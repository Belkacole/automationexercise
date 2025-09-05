describe('Register User', () => {

  let t;

  before(() => {
    cy.prepareTestData().then((data) => { t = data; });
  });

  it('Should register a new user and then delete the account', () => {
    const email = `elena.qa+${Date.now()}@example.com`;

    cy.visit('/');
    cy.contains(/home/i).should('be.visible');

    cy.get('a[href="/login"]').should('be.visible').click();
    cy.url().should('include', '/login');
    cy.get('.signup-form h2').should('be.visible');

    cy.get('[data-qa="signup-name"]').should('be.visible').type(t.user.name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.contains(/enter account information/i).should('be.visible');

    cy.get('input[id="id_gender2"]').should('exist').check({ force: true });
    cy.get('[data-qa="name"]').should('have.value', t.user.name);
    cy.get('[data-qa="password"]').should('be.visible').type(t.user.password);

    cy.get('[data-qa="days"]').select(t.dob.day);
    cy.get('[data-qa="months"]').select(t.dob.month);
    cy.get('[data-qa="years"]').select(t.dob.year);

    cy.get('[name="newsletter"]').check();
    cy.get('[name="optin"]').check();

    cy.get('[data-qa="first_name"]').type(t.address.firstName);
    cy.get('[data-qa="last_name"]').type(t.address.lastName);
    cy.get('[data-qa="company"]').type(t.address.company);
    cy.get('[data-qa="address"]').type(t.address.address1);
    cy.get('[data-qa="country"]').select(t.address.country);
    cy.get('[data-qa="state"]').type(t.address.state);
    cy.get('[data-qa="city"]').type(t.address.city);
    cy.get('[data-qa="zipcode"]').type(t.address.zipcode);
    cy.get('[data-qa="mobile_number"]').type(t.address.mobile);

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('contain.text', 'Account Created');
    cy.get('[data-qa="continue-button"]').click({ force: true });

    cy.contains('a', /logout/i).should('be.visible'); 
    cy.contains('a', /delete account/i).click();
    cy.get('[data-qa="account-deleted"]').should('contain.text', 'Account Deleted');
    cy.get('[data-qa="continue-button"]').click({ force: true });

    cy.contains(/home/i).should('be.visible');
  });

  it('Email already exists', () => {

    const existing = 'existing.user@example.com'; 

    cy.visit('/login');
    cy.get('[data-qa="signup-name"]').type('Elena');
    cy.get('[data-qa="signup-email"]').type(existing);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains(/email address already exist/i).should('be.visible');
    cy.contains(/enter account information/i).should('not.exist');
  });

  it('Empty required fields (no password) should block submit', () => {
    cy.visit('/login');
    cy.get('[data-qa="signup-name"]').type('Elena');
    cy.get('[data-qa="signup-email"]').type(`e+${Date.now()}@ex.com`);
    cy.get('[data-qa="signup-button"]').click();

    cy.url().should('include', '/signup');
    cy.contains(/enter account information/i).should('be.visible');

    cy.intercept('POST', '**/createAccount*').as('create');
    cy.get('[data-qa="create-account"]').click();

    cy.get('@create.all').should('have.length', 0);

    cy.url().should('include', '/signup');
    cy.contains(/account created/i).should('not.exist');
    cy.get('[data-qa="password"]').should('be.visible');
  });

  ['plain', 'a@', '@b.com', 'user@@example.com', 'user@.com', 'a@b..com'].forEach((invalid) => {
  it(`Email validation (client-side): "${invalid}"`, () => {
      cy.visit('/login');
      cy.intercept('POST', '**/signup*').as('signup');

      cy.get('[data-qa="signup-name"]').type('Elena');
      cy.get('[data-qa="signup-email"]').clear().type(invalid);
      cy.get('[data-qa="signup-button"]').click();

      cy.get('@signup.all').should('have.length', 0);

      cy.location('pathname').should('eq', '/login');
      cy.contains(/enter account information/i).should('not.exist');
    });
  });

  it('Name max length is handled (truncates or accepts up to limit)', () => {
    const long = 'É'.repeat(100);
    cy.visit('/login');
    cy.get('[data-qa="signup-name"]').type(long);
    cy.get('[data-qa="signup-email"]').type(`e+${Date.now()}@ex.com`);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="name"]').should('have.value', long.slice(0, 100));
  });

  it('Name supports Unicode characters', () => {
    cy.visit('/login');
    cy.get('[data-qa="signup-name"]').type('Éléna-Colesnicova QA');
    cy.get('[data-qa="signup-email"]').type(`e+${Date.now()}@ex.com`);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="name"]').should('have.value', 'Éléna-Colesnicova QA');
  });
});