/// <reference types="Cypress" />

describe("Map page", () => {
  it("should be visible", () => {
    cy.visit("#/map");
    cy.location("hash").should("match", /map\/[\d\.]+\/[\d\.]+\/\d+/);
  });

  it("should open the detail page", () => {
    cy.dbjson().as("db");
    cy.visit("#/map/43.548747/10.721708/18");
    cy.wait("@db").then(() => {
      cy.contains("1").first().click();
      cy.contains("Artwork Title").first().click();
      cy.location("hash").should("match", /artworks\/1/);
    });
  });
});
