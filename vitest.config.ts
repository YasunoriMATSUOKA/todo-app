import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ["crypto", "util", "stream"],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
    topLevelAwait(),
    wasm(),

    react(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "symbol-crypto-wasm-node": "symbol-crypto-wasm-web/symbol_crypto_wasm.js",
    },
  },
});
