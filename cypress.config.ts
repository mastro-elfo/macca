import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "riamsw",
  e2e: {
    baseUrl: "http://localhost:5173/macca",
    defaultCommandTimeout: 32000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
