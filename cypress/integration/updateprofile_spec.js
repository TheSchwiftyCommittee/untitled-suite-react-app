describe("User", () => {
  beforeEach(() => {
    //navigate to the sign up page
    cy.visit("http://localhost:3000/signin");
  });

  it("signs in as an existing user and updates profile", () => {
    //fill out the fields
    cy.get('input[id="filled-adornment-username"]').type(`morty`);
    cy.get('input[id="filled-adornment-password"]').type("morty123");

    //click the sign in button
    cy.get('button[id="filled-adornment-signinbutton"]').click();
    // expect a redirect to the tasker page
    cy.url().should("eq", "http://localhost:3000/tasker");

    // select profile button
    cy.get('a[id="filled-adornment-profilebutton"]').click();

    //fill out the fields for profile
    cy.wait(500);
    cy.get('input[id="filled-adornment-firstname"]').focus().clear();
    cy.get('input[id="filled-adornment-firstname"]').type(`sonic`);
    cy.get('input[id="filled-adornment-lastname"]').focus().clear();
    cy.get('input[id="filled-adornment-lastname"]').type("hedgehog");

    //click the create profile button
    cy.get('button[id="filled-adornment-updateprofilebutton"]').click();
    // expect a redirect to the profile page
    cy.url().should("eq", "http://localhost:3000/profile");
  });
});