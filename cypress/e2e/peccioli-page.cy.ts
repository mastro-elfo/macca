/// <reference types="Cypress" />

describe("Peccioli page", () => {
  it("should be visible", () => {
    cy.intercept("GET", "**/peccioli.md", "Peccioli").as("response");
    cy.visit("#/peccioli");
    cy.wait("@response").then(() => {
      cy.contains("Peccioli");
    });
  });

  it("should navigate from menu", () => {
    cy.intercept("GET", "**/peccioli.md", "");
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("Peccioli").click();
    cy.location("hash").should("eq", "#/peccioli");
  });
});
