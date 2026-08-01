/// <reference types="cypress" />

describe("Artwork list page", () => {
  beforeEach(() => {
    cy.dbjson().as("db");
  });

  it("should be visible", () => {
    cy.visit("#/artworks");
    cy.contains("Artworks");
    cy.contains("Artwork Title");
  });

  it("should open the detail page", () => {
    cy.visit("#/artworks");
    cy.contains("Detail").first().click();
    cy.location("hash").should("match", /artworks\/1/);
  });

  it("should navigate from menu", () => {
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("Artworks").click();
    cy.location("hash").should("eq", "#/artworks");
  });
});
