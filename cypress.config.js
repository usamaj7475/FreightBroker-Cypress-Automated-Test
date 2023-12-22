const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    projectId: "yfiba6",
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      screenshotOnRunFailure=true;
      // Remove the following line as it's not needed and causing the issue:
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
