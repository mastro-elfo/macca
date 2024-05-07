/// <reference types="Cypress" />

describe("Author list page", () => {
  it("should be visible", () => {
    cy.dbjson().as("db");
    cy.visit("#/authors");
    cy.wait("@db");
    cy.contains("Author first name");
    cy.contains("Author last name");
  });

  it("should open the detail page", () => {
    cy.dbjson().as("db");
    cy.visit("#/authors");
    cy.wait("@db");
    cy.contains("Author first name").click();
    cy.location("hash").should("match", /authors\/1/);
  });
});
