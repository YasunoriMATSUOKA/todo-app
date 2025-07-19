import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
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
    base: "/todo-app/",
    build: {
      // 警告が出たので適当に大きめに設定
      chunkSizeWarningLimit: 4096,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "symbol-crypto-wasm-node":
          "symbol-crypto-wasm-web/symbol_crypto_wasm.js",
      },
    },
  };
});
