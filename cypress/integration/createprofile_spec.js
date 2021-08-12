describe("user creates profile", () => {
  beforeEach(() => {
    //navigate to the create profile page
    cy.visit("http://localhost:3000/signup");
  });

  it("creates a new profile with default avatar image", () => {
    cy.get('input[id="filled-adornment-username"]').type(`u${Date.now()}`);
    cy.get('input[id="filled-adornment-email"]').type(`u${Date.now()}@test.com`);
    cy.get('input[id="filled-adornment-password"]').type("password123");
    cy.get('input[id="filled-adornment-passwordConfirmation"]').type("password123");

    //click the sign up button
    cy.get('button[id="filled-adornment-signupbutton"]').click();
    // expect a redirect to the profile page
    cy.url().should("eq", "http://localhost:3000/profile/new");

    //fill out the fields for profile
    cy.get('input[id="filled-adornment-firstname"]').type(`u${Date.now()}`);
    cy.get('input[id="filled-adornment-lastname"]').type("password");

    //click the create profile button
    cy.get('button[id="filled-adornment-createprofilebutton"]').click();
    // expect a redirect to the tasker page
    cy.url().should("eq", "http://localhost:3000/tasker");
  });
});
