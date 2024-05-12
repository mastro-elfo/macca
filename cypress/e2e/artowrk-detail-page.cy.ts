/// <reference types="Cypress" />

describe("Artwork detail page", () => {
  it("should be visible", () => {
    cy.dbjson().as("db");
    cy.visit("#/artworks/1");
    cy.wait("@db").then(() => {
      cy.contains("Artwork Title");
      cy.contains("2345");
      cy.contains("Artwork Town");
      cy.contains("Artwork Address");
    });
  });
});
