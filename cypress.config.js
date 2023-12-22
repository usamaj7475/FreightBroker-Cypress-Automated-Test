const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "yfiba6",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
