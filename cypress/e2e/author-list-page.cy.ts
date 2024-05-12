/// <reference types="Cypress" />

describe("Author list page", () => {
  it("should be visible", () => {
    cy.dbjson().as("db");
    cy.visit("#/authors");
    cy.wait("@db").then(() => {
      cy.contains("Author first name");
      cy.contains("Author last name");
    });
  });

  it("should open the detail page", () => {
    cy.dbjson().as("db");
    cy.visit("#/authors");
    cy.wait("@db").then(() => {
      cy.contains("Author first name").click();
      cy.location("hash").should("match", /authors\/1/);
    });
  });

  it("should navigate from menu", () => {
    cy.dbjson().as("db");
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("Authors").click();
    cy.location("hash").should("eq", "#/authors");
  });
});
