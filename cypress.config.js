const { defineConfig } = require("cypress");

module.exports = defineConfig({


  
  e2e: {
<<<<<<< HEAD
    projectId: "yfiba6",
=======
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
>>>>>>> 4fdde57b7ccab7784330c0db443d31353010e2e9
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
