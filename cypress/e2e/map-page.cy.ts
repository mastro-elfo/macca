/// <reference types="Cypress" />

describe("Map page", () => {
  it("should be visible", () => {
    cy.visit("#/map");
    cy.location("hash").should("match", /map\/[\d\.]+\/[\d\.]+\/\d+/);
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
    cy.visit("#/map/43.548747/10.721708/18");
    cy.wait("@db");
    cy.contains("1").first().click();
    cy.contains("Test").first().click();
    cy.location("hash").should("match", /artworks\/1/);
  });
});
