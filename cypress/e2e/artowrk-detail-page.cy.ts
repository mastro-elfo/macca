/// <reference types="Cypress" />

describe("Artwork detail page", () => {
  it("should be visible", () => {
    cy.intercept("GET", "**/db.json", {
      artworks: [
        {
          id: 1,
          title: "Artwork Title",
          year: 2345,
          tags: [],
          town: "Artwork Town",
          address: "Artwork Address",
          latitude: 43.548747,
          longitude: 10.721708,
          authors: [],
          authorIds: [],
          images: [],
          isAuthorUnknown: true,
        },
      ],
      authors: [],
    }).as("db");
    cy.visit("#/artworks/1");
    cy.contains("Artwork Title");
    cy.contains("2345");
    cy.contains("Artwork Town");
    cy.contains("Artwork Address");
  });
});
