describe('Search Product', () => {

  it('Should search product and display results', () => {
 
    cy.visit('/');
    cy.contains(/home/i).should('be.visible');

    cy.contains('a', /products/i).click();

    cy.url().should('include', '/products');
    cy.contains(/all products/i).should('be.visible');

    const searchProd = 'Dress';
    cy.get('#search_product').type(searchProd);
    cy.get('#submit_search').click();

    cy.contains(/searched products/i).should('be.visible');

    cy.get('.productinfo.text-center p')
      .should('exist')
      .invoke('text')
      .then((allText) => {
        expect(allText.toLowerCase()).to.include(searchProd.toLowerCase());
      });
  });

  it('Should show empty results for a non-existing product', () => {
   
    cy.visit('/');
    cy.contains(/home/i).should('be.visible');

    cy.contains('a', /products/i).click();
    cy.url().should('include', '/products');
    cy.contains(/all products/i).should('be.visible');

    cy.get('#search_product').type('Rubber Dinosaur');
    cy.get('#submit_search').click();

    cy.contains(/searched products/i).should('be.visible');

    cy.get('.productinfo.text-center').should('not.exist');
  });
});