/// <reference types="Cypress" />

describe("Root", () => {
  it("should redirect to map", () => {
    cy.visit("/");
    cy.location("pathname").should("match", /macca/);
    cy.location("hash").should("match", /map/);
  });
});
