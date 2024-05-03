/// <reference types="Cypress" />

describe("Artwork detail page", () => {
  it("should be visible", () => {
    cy.visit("#/artworks/1");
  });
});
