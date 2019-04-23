# Work Market Automation Challenge With Cypress.io.

Cypress is a dev centric automation framework. Its different architecturally and methodology wise, in
comparison to Selenium. I have decided to learn Cypress over the weekend to challenge myself and use
this framework for this test automation challenge.

Places to look for code sample of work:


cypress/integrations  
cypress/pages  
cypress/support/command.js -> page actions  
cypress.json  
index.json  

Cypress doesn't support out the box nor recommend using page object model due to additional layer of abstraction.
I had to include because I felt like it was absolutely necessary for organization, and to prevent proverbial
maintenance nightmare, ya know ... keeping it DRY.

## Set Up

Clone the repository.  
Navigate to this project directory in your terminal.  
Install the NPM dependencies.  

```sh
npm install
```

To start application, copy and paste this into terminal

```sh
./node_modules/.bin/cypress open
```

The cypress test runner UI will open up. Clicking any of the test will run that suite of test.
