/// <reference types="Cypress" />

describe("Map page", () => {
  it("should be visible", () => {
    cy.visit("#/map");
    cy.location("hash").should("match", /map\/[\d\.]+\/[\d\.]+\/\d+/);
  });
});
