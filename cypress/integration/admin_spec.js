describe("Admin", () => {
  beforeEach(() => {
    //navigate to the sign in page
    cy.visit("http://localhost:3000/#/signin");
  });

  it("accesses the User dashboard", () => {
    //fill out the fields
    cy.get('input[id="filled-adornment-username"]').type(`rick`);
    cy.get('input[id="filled-adornment-password"]').type(`rick123`);

    //click the sign in button
    cy.get('button[id="filled-adornment-signinbutton"]').click();
    // expect a redirect to the tasker page
    cy.url().should("eq", "http://localhost:3000/#/tasker");
    
    // select user button
    cy.get('a[id="filled-adornment-userbutton"]').click();
    cy.url().should("eq", "http://localhost:3000/#/users");
  });

});
