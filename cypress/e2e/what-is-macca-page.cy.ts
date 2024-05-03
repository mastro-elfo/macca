/// <reference types="Cypress" />

describe("What is MACCA page", () => {
  it("should be visible", () => {
    cy.intercept("GET", "**/what-is-macca.md", "What is MACCA");
    cy.visit("#/what-is-macca");
    cy.contains("What is MACCA");
  });

  it("should navigate from menu", () => {
    cy.intercept("GET", "**/what-is-macca.md", "");
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("What is MACCA?").click();
    cy.location("hash").should("eq", "#/what-is-macca");
  });
});
