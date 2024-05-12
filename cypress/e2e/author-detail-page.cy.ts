/// <reference types="Cypress" />

describe("Author detail page", () => {
  it("should be visible", () => {
    cy.dbjson().as("db");
    cy.visit("#/authors/1");
    cy.wait("@db").then(() => {
      cy.contains("Author first name");
      cy.contains("Author last name");
    });
  });
});
