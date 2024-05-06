/// <reference types="Cypress" />

describe("Artwork list page", () => {
  it("should be visible", () => {
    cy.visit("#/artworks");
  });

  it("should open the detail page", () => {
    cy.intercept("GET", "**/db.json", {
      artworks: [
        {
          id: 1,
          title: "Test",
          year: 1,
          tags: [],
          town: "Town",
          address: "Address",
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
    cy.visit("#/artworks");
    cy.wait("@db");
    cy.contains("Detail").first().click();
    cy.location("hash").should("match", /artworks\/1/);
  });
});
