const signup = require('../pages/signupPage.js');
const faker = require('faker');

describe('sign up', function () {
  beforeEach(function() {
    cy.visitSignUpPage();
  });

  describe('sign up landing page', function () {
    it('should navigate to sign up page and show header', function () {
      cy.xpath(signup.signUpForWorkMarketHeader).should('be.visible');
    });

    it('should have fields - first name, last name, email, password, and terms accept', function () {
      cy.verifyFieldsVisible();
    });

    it('should have asterik for required fields', function () {
      cy.get(signup.requiredFieldAsterik)
        .should('have.length', 4);
    });

    it('should have input field in focus when clicked', function () {
      cy.get(signup.firstNameInput).click();
      cy.focused().should('have.attr', 'id', 'firstname');
      cy.get(signup.lastNameInput).click();
      cy.focused().should('have.attr', 'id', 'lastname');
      cy.get(signup.emailInput).click();
      cy.focused().should('have.attr', 'id', 'email');
      cy.get(signup.passwordInput).click();
      cy.focused().should('have.attr', 'id', 'password');
    });
  });

  describe('successful sign up', function () {
    it('should be able to sign up successfully with valid inputs, checking checkbox, clicking register button', function () {
      const confirmationMessage = 'You\'ve completed the sign-up process and should receive a confirmation email shortly.';
      cy.fillInForm();
      cy.get(signup.registerButton).click();
      cy.url().should('include', '/register/thankyou');
      cy.xpath(signup.signUpConfirmationText).should('be.visible');
      cy.xpath(signup.signUpConfirmationText).should('have.text', confirmationMessage );
    });
  });

  describe('password', function () {
    it('should give you error message "Please enter valid password" if password is not in correct format', function (shortPassword="shortp") {
      cy.fillInForm();
      cy.get(signup.passwordInput).clear();
      cy.get(signup.passwordInput).type(shortPassword);
      cy.get(signup.emailInput).click();
      cy.xpath(signup.passwordInvalidText).should('be.visible');
    });

    it('should give you error message if password is too simple', function (simplePassword="password1") {
      const passwordToSimpleText = 'Your password entered is not allowed because it is too simple'
      cy.fillInForm();
      cy.get(signup.passwordInput).clear();
      cy.get(signup.passwordInput).type(simplePassword);
      cy.get(signup.registerButton).click();
      cy.xpath(signup.warningMessageText).should('have.text', passwordToSimpleText);
    });

    it('should display password format prompt', function () {
      const passwordFormatText = 'Min 8 characters, at least 1 number';
      cy.xpath(signup.passwordInputFormatPrompt).contains(passwordFormatText);
    });

    it('should not be able to proceed with empty password ', function () {
      cy.fillInForm();
      cy.get(signup.registerButton).should('not.have.attr', 'disabled');
      cy.get(signup.passwordInput).clear();
      cy.get(signup.registerButton).should('have.attr', 'disabled');
    });

    /* Experiencing some flakiness with termsOfUserInput.
      Will check the box but then throw, "cannot read property 'split' of undefined"
      Was working fine before.
    */
    xit('should fail if only numbers in password', function () {
      cy.fillInForm();
      cy.get(signup.password).clear();
      cy.get(signup.password).type('112232356432');
      cy.get(signup.registerButton).click();
      cy.xpath(signup.warningMessageText).should('be.visible');
    });

    // Same issue above.
    xit('should fail if password entered does not consist of at least 1 number', function () {
      cy.fillInForm();
      cy.get(signup.password).clear();
      cy.get(signup.password).type('pswddwithoutnumber');
      cy.get(signup.registerButton).click();
      cy.xpath(signup.warningMessageText).should('be.visible');
    });
  });

  describe('email', function () {
    it('should display error if email entered is already registered', function () {
      const email = faker.internet.email();
      const emailAlreadyInUseText = `The email address ${email} is already being used.`
      cy.fillInForm();
      cy.get(signup.emailInput).clear();
      cy.get(signup.emailInput).type(email);
      cy.get(signup.registerButton).click();
      cy.url().should('include', '/register/thankyou');
      cy.visitSignUpPage();
      cy.fillInForm();
      cy.get(signup.emailInput).clear();
      cy.get(signup.emailInput).type(email);
      cy.get(signup.registerButton).click();
      cy.xpath(signup.warningMessageText).should('have.text', emailAlreadyInUseText);
    });

    it('should validate malformed email address without @ sign', function (emailWithoutAtSign="santana.com") {
      cy.get(signup.emailInput).type(emailWithoutAtSign);
      // Need to click another field to trigger email warning message
      cy.get(signup.passwordInput).click();
      cy.xpath(signup.emailInvalidText).should('be.visible');
    });
  });

  describe('register button', function () {
    it('should have register button disabled when no input fields entered', function () {
      cy.get(signup.registerButton).should('have.attr', 'disabled');
    });

    it('should have register button enabled when valid input fields entered', function () {
      cy.fillInForm();
      cy.get(signup.registerButton).should('not.have.attr', 'disabled');
    });

    it('should disble register button if field is emptied', function () {
      cy.fillInForm();
      cy.get(signup.passwordInput).clear();
      cy.get(signup.registerButton).should('have.attr', 'disabled');
    });
  });
});
