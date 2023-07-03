// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("openExtension", () => {
  cy.visit("https://stgchrome.paradox.ai/automation-engineer-assignment/");
});

Cypress.Commands.add("enterMailSuccesfully", () => {
  cy.visit("https://stgchrome.paradox.ai/automation-engineer-assignment/");
  cy.get('[data-test="email-login-input"]').type(
    "rnd.extension+noashpack@paradox.ai"
  );
  cy.get('[data-test="email-login-submit-button"]').click();
});
