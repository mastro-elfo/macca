/// <reference types="cypress" />

describe("Artwork list page", () => {
  it("should be visible", () => {
    cy.dbjson().as("db");
    cy.visit("#/artworks");
    cy.wait(["@db", "@db"]).then(() => {
      cy.contains("Artworks");
      cy.contains("Artwork Title");
    });
  });

  it("should open the detail page", () => {
    cy.dbjson().as("db");
    cy.visit("#/artworks");
    cy.wait(["@db", "@db"]).then(() => {
      cy.contains("Detail").first().click();
      cy.location("hash").should("match", /artworks\/1/);
    });
  });

  it("should navigate from menu", () => {
    cy.dbjson().as("db");
    cy.visit("/");
    cy.get('[data-cy="DrawerIconButton"]').click();
    cy.contains("Artworks").click();
    cy.location("hash").should("eq", "#/artworks");
  });
});
