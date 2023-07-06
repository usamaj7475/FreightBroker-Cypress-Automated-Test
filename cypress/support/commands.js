// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

///
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


/// <reference types="cypress"/>


Cypress.Commands.add('ignoreApplicationError', () => {
    cy.on('uncaught:exception', (err) => {
      // Check if the error message or stack trace includes the specific error you want to ignore
      if (err.message.includes('Cannot read properties of undefined') || err.stack.includes('SpecificError')) {
        // Log the error to the Cypress Command Log without failing the test
        Cypress.log({
          name: 'Error',
          message: err.message,
          consoleProps: () => ({
            Error: err,
          }),
        });
  
        // Return false to prevent the error from failing the test
        return false;
      }
    });
  });
  