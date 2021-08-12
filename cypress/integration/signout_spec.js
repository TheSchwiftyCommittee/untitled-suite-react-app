describe("Signed In User", () => {
  beforeEach(() => {
    //navigate to the sign in page
    cy.visit("http://localhost:3000/signin");
  });

  it("signs outs", () => {
    //fill out the fields
    cy.get('input[id="filled-adornment-username"]').type(`morty`);
    cy.get('input[id="filled-adornment-password"]').type("morty123");

    //click the sign in button
    cy.get('button[id="filled-adornment-signinbutton"]').click();
    // expect a redirect to the tasker page
    cy.url().should("eq", "http://localhost:3000/tasker");

    // select signout button
    cy.get('a[id="filled-adornment-signoutbutton"]').click();
    // expect a redirect to the home page
    cy.url().should("eq", "http://localhost:3000/");
  });
});
