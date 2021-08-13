describe("user signup", () => {
  beforeEach(() => {
    //navigate to the sign up page
    cy.visit("http://localhost:3000/#/signup");
  });

  it("creates a new user and profile", () => {
    //fill out the fields
    cy.get('input[id="filled-adornment-username"]').type(`u${Date.now()}`);
    cy.get('input[id="filled-adornment-email"]').type(`u${Date.now()}@test.com`);
    cy.get('input[id="filled-adornment-password"]').type("password123");
    cy.get('input[id="filled-adornment-passwordConfirmation"]').type("password123");

    //click the sign up button
    cy.get('button[id="filled-adornment-signupbutton"]').click();
    // expect a redirect to the profile page
    cy.url().should("eq", "http://localhost:3000/#/profile/new");
  });

  it("requires a username", () => {
    //fill out the fields except for usernames
    // cy.get('input[id="filled-adornment-username"]').type(`u${Date.now()}`);
    cy.get('input[id="filled-adornment-email"]').type(`u${Date.now()}@test.com`);
    cy.get('input[id="filled-adornment-password"]').type("password123");
    cy.get('input[id="filled-adornment-passwordConfirmation"]').type("password123");

    //click the sign up button
    cy.get('button[id="filled-adornment-signupbutton"]').click();
    // expect a redirect to the profile page
    cy.url().should("eq", "http://localhost:3000/#/signup");
  });
});
