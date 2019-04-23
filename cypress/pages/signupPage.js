const signup = Object.create({
  emailInput: 'input[id="email"]',
  emailInvalidText: '//div[text()="Please enter a valid  email"]',
  firstNameInput: 'input[id="firstname"]',
  inputValidationWarning: '//div[text()="Please enter a valid  email"]',
  joinAsIndividualButton: '//span[contains(text(), "Join as an individual")]/ancestor::button',
  lastNameInput: 'input[id="lastname"]',
  passwordInput: 'input[id="password"]',
  passwordInputFormatPrompt: '//input[@id="password"]/preceding-sibling::div',
  passwordInvalidText: '//div[text()="Please enter a valid password"]',
  registerButton: 'button[data-component-identifier="wm-validating-form__submit"]',
  requiredFieldAsterik: '[data-component-identifier="configurable-label__asterisk"]',
  signUpConfirmationText: '//p[contains(text(), "receive a confirmation email shortly.")]',
  signUpForWorkMarketHeader: '//h3[text()="Sign Up for Work Market"]',
  termsConsentInput: 'input[type="checkbox"]',
  warningMessageText: '//div[@data-component-identifier="wm-message-banner-text"]/p',
  wmStatementAgreements: 'a[data-component-identifier="wm-link"]',
});

module.exports = signup;
