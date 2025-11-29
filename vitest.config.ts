import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // perfeito para Node 25
    globals: true, // permite usar test(), expect() sem importar
  },
});
