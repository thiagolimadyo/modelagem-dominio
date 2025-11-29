# modelagem-dominio

Curso de Modelagem de Domínio - Formacao.DEV

1. npm init -y
2. npm i -D typescript @types/node
3. npx tsc --init
4. npm i -D vitest @vitest/coverage-v8
5. Criar o arquivo ./vitest.config.ts:

```bash
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // perfeito para Node 25
    globals: true, // permite usar test(), expect() sem importar
  },
```

6. Alterar o arquivo ./tsconfig.json:

```bash
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "node",
    "strict": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },

    "outDir": "./dist",
    "declaration": false
  },
  "include": ["src", "tests"]
}

```
