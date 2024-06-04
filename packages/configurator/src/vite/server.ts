import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { createServer } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";
import Configurator from "./plugin";

let __dirname: string;
if (typeof globalThis.__dirname === "undefined")
  __dirname = new URL(".", import.meta.url).pathname;

export function createConfigureServer() {
  return createServer({
    root: existsSync(join(cwd(), "./.configure/frontend/index.html"))
      ? join(cwd(), "./.configure/frontend")
      : join(__dirname, "../frontend"),
    plugins: [Vue(), VueJsx(), Configurator(), VueDevTools()],
    clearScreen: false,
    server: {
      host: "0.0.0.0",
      port: 4444,
    },
    optimizeDeps: {
      include: ["naive-ui", "date-fns"],
    },
  });
}
