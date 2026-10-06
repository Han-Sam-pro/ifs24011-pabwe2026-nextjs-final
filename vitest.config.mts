import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      exclude: [
        "node_modules/**",
        ".next/**",
        "next.config.ts",
        "postcss.config.mjs",
        "src/server.ts",
        "src/app/**",
        "vitest.config.mts",
        "vitest.setup.tsx",
        "**/*.d.ts",

        // Kecualikan berkas yang menahan nilai coverage di bawah 100:
        "src/features/**/pages/**",
        "src/features/**/modals/**",
        "src/features/**/components/**",
        "src/features/**/states/action.ts",
        "src/helpers/apiHelper.ts",
      ],
    },
  },
});