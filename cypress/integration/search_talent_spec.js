const searchTalent = require('../pages/searchTalentPage.js');
const configs = require('../../cypress.json');

const loginEmail = 'qa+candidatetest@workmarket.com';
const loginPassword = 'candidate123';

describe('search results', function () {
  beforeEach(function () {
    cy.visit(configs.searchTalentUrl);
    cy.signInToSearchTalentPortal(loginEmail, loginPassword);
    cy.revisitUrlForAllResourcesToLoad();
  });

  /* "Test" is visible in either or combo of Name, Job Title, Company, Skills
      This test checks for all these places and asserts true if found in at least one of them.
  */
  it('should return only profile results with keyword, "test" on the UI', function (name='test') {
    cy.searchForTalent('test');

    /* There is issue with all resources loading before script continues.
       When you apply the cy.visit(), that command waits for all resources
       to load before proceeding. Action below should trigger this behavior.
    */
    cy.revisitUrlForAllResourcesToLoad();

    let resultsNotMatched = [];
    let resultsMatched = [];

    //Iterate over the elements and check if true
    cy.get(searchTalent.searchResultList).each(function () {
      let profileCardName, profileJobTitleCompany, profileCardSkills;

      // The .within() allows nested .get queries to be specific to the parent element
      cy.get(searchTalent.searchResultList).within(() => {
        // This line below checks if name contains 'test'
        cy.get(searchTalent.profileCardName).then(function (nameElement) {
          let profileCardName = nameElement.text().includes(`${name}`);
        });

        // These checks use variables that are broad. If any element that matches
        // criteria, "contains(text(), "test")", then it will return. I then do
        // assertion that length is above 0, meaning there was a hit.

        let profileJobTitleCompany = cy.xpath(searchTalent.profileCardJobTitleCompany).its('length').should('be.above', 0);
        let profileCardSkills = cy.xpath(searchTalent.profileCardSkills).its('length').should('be.above', 0);

        /* If anyone of these are truthy, meaning resolves to true, then execute first path
           If no variables resolves to true, then append name from profile card to array, 'resultsNotMatched'
        */

        // Duplication. Not good but will leave for now.
        if (profileCardName || profileJobTitleCompany || profileCardSkills) {
          cy.get(searchTalent.profileCardName).then(function (name) {
            resultsMatched.push(name.text());
          });
        } else {
          cy.get(searchTalent.profileCardName).then(function (name) {
            resultsNotMatched.push(name.text());
          });
        }

        cy.log('matched : ' + resultsMatched.length);
        cy.log('string ' + JSON.stringify(resultsMatched));
        cy.log('not matched : ' + resultsNotMatched.length);
        cy.log('string ' + JSON.stringify(resultsNotMatched));
      });
    });
  });


    /* This only runs smoothly when you have the chrome dev console opened in cypress test runner browser. Weird.
      Just learned Cypress over the weekend for this code challenge, complete total uber ramp up.
      Found this. May be it. https://github.com/cypress-io/cypress/issues/2700
    */

  it('should return only search results with text, "test" in the response body in JSON', function (name = "test") {
    const routeToWatchFor = 'https://dev.workmarket.com/search/retrieve?searchType=workers&sortby=availability_asc&start=0&limit=25&search_type=PEOPLE_SEARCH&resource_mode=workers&keyword=test';

    // Start the server & define the route, in order to get request and do JSON validation
    cy.server();
    cy.route('GET', routeToWatchFor).as('searchResults');

    cy.searchForTalent(name);

    cy.wait('@searchResults');
    cy.get('@searchResults').then(function (res) {
      expect(res.status).to.eq(200);
      expect(res.method).to.eq('GET');

      let profile = res.responseBody.results;
      let resultsNotMatched = [];

      for(let i = 0; i < profile.length; i++) {
        let firstName = profile[i].first_name != null && (profile[i].first_name).includes(`${name}`);
        let lastName = profile[i].last_name !== null && (profile[i].last_name).includes(`${name}`);
        let company = profile[i].company_name !== null && (profile[i].company_name).includes(`${name}`);
        let jobTitle = profile[i].job_title !== null && (profile[i].job_title).includes(`${name}`);
        // skills has snippets.skillNames, then snippets.jobFunction. Yikes. This is tricky, will just leave as is for now.
        // let skillNames = profile[i].snippets.skillNames !== null && (snippets.skillNames).includes(`${name}`);

        // Add back snippets
        if (firstName || lastName || company || jobTitle) {
          continue;
        } else {
          resultsNotMatched.push(profile[i].userNumber);
        }
      }

      if (resultsNotMatched.length >= 1) {
        throw new Error(`There were ${resultsNotMatched.length} profiles that did not match search criteria, ${name}`);
      }
    });
  });
});
