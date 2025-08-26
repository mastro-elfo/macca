/// <reference types="Cypress" />

describe("Artwork detail page", () => {
  it("should be visible", () => {
    cy.visit("#/share");
    cy.contains("Share");
  });

  it("should navigate from menu", () => {
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("Share").click();
    cy.location("hash").should("eq", "#/share");
  });
});
