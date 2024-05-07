/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      dbjson(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("dbjson", () => {
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
        authorIds: [1],
        images: [],
        isAuthorUnknown: true,
      },
    ],
    authors: [
      {
        id: 1,
        firstName: "Author first name",
        lastName: "Author last name",
      },
    ],
  });
});
