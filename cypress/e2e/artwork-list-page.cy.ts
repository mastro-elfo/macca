/// <reference types="Cypress" />

describe("Artwork list page", () => {
  it("should be visible", () => {
    cy.visit("#/artworks");
  });
});
