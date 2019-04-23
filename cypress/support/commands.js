const faker = require('faker');
const searchTalent = require('../pages/searchTalentPage.js');
const signup = require('../pages/signupPage.js');

Cypress.Commands.add('visitSignUpPage', function () {
  cy.visit("/");
  cy.title().should('include', 'Work Market');
  cy.xpath(signup.joinAsIndividualButton).click();
});

Cypress.Commands.add('revisitUrlForAllResourcesToLoad', function () {
  cy.url().then(function (searchUrl) {
    cy.visit(searchUrl);
  });
});

Cypress.Commands.add('fillInForm', function () {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.name.firstName({min: 8, max: 10}) + faker.random.number();

  cy.get(signup.firstNameInput).type(firstName);
  cy.get(signup.lastNameInput).type(lastName);
  cy.get(signup.emailInput).type(email);
  cy.get(signup.passwordInput).type(password);
  cy.get(signup.termsConsentInput).check();
});

Cypress.Commands.add('verifyFieldsVisible', function () {
  cy.get(signup.firstNameInput).should('be.visible');
  cy.get(signup.lastNameInput).should('be.visible');
  cy.get(signup.emailInput).should('be.visible');
  cy.get(signup.passwordInput).should('be.visible');
  cy.get(signup.termsConsentInput).should('be.visible');
  cy.get(signup.registerButton).should('be.visible');
});

Cypress.Commands.add('searchForTalent', function (name) {
  cy.get(searchTalent.searchInput).should('be.visible');
  // Had to reduce page results for faster iteration of elements
  // for test. 50 was slowing down my tests. Can revisit this.
  cy.get(searchTalent.resultsPerPageSelect).select('25');
  cy.get(searchTalent.searchInput).type(name);
  cy.get(searchTalent.searchInput).type('{enter}');
  cy.wait(1000);
});

Cypress.Commands.add('signInToSearchTalentPortal', function (username, password) {
  cy.get(searchTalent.loginEmailInput).type(username);
  cy.get(searchTalent.loginPasswordInput).type(password);
  cy.get(searchTalent.loginButton).click();
  cy.xpath(searchTalent.searchTalentLink).should('be.visible');
  cy.xpath(searchTalent.searchTalentLink).click();
});
