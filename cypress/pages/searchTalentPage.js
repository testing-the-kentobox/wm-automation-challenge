const searchTalent = Object.create({
  loginButton: 'button[id="login_page_button"]',
  loginEmailInput: 'input[id="login-email"]',
  loginPasswordInput: 'input[id="login-password"]',
  profileCardJobTitleCompany: '//*[@class="profile-card--address"]//*[contains(text(), "test")]',
  profileCardName: '.profile-card--name',
  profileCardSkills: '//*[@class="profile-card--tests"]//*[contains(text(), "test")]',
  resultsPerPageSelect: 'select[id="page_size"]',
  searchInput: 'input[id="input-text"]',
  searchResultList: 'div[class="profile-card"]',
  searchTalentLink: '//span[text()="Find Talent"]',
});

module.exports = searchTalent;
