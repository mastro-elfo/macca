/// <reference types="Cypress" />

describe("Author list page", () => {
  it("should be visible", () => {
    cy.visit("#/authors");
  });
});
