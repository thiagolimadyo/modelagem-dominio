import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts", "test/**/*.spec.ts"],
    coverage: {
      enabled: true,
      //   reporter: ["text", "html"],
      include: ["src/**/*.ts"], // arquivos para calcular cobertura
    },
    environment: "node", // perfeito para Node 25
    globals: true, // permite usar test(), expect() sem importar
  },
})
