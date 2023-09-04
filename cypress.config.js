const { defineConfig } = require("cypress");

module.exports = defineConfig({


  
  e2e: {
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
