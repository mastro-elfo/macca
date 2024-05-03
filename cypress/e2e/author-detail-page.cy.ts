/// <reference types="Cypress" />

describe("Author detail page", () => {
  it("should be visible", () => {
    cy.visit("#/authors/1");
  });
});
