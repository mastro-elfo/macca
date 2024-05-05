/// <reference types="Cypress" />

describe("Artwork list page", () => {
  it("should be visible", () => {
    cy.visit("#/artworks");
  });

  it("should open the detail page", () => {
    cy.visit("#/artworks");
    cy.contains("Detail").first().click();
    cy.location("hash").should("match", /artworks\/\d+/);
  });
});
