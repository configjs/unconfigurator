import { join } from "node:path";
import { defineIntegration } from "../../config";

let __dirname: string;
if (typeof globalThis.__dirname === "undefined")
  __dirname = new URL(".", import.meta.url).pathname;

export const Package = defineIntegration({
  configureFrontend(ctx) {
    ctx
      .registerRoute({
        path: "/unconfigurator-integration-internal:package",
        name: "Package",
        component: join(__dirname, "internal/package/package.vue"),
      })
      .registerAppBar({
        title: "Package",
        icon: "i-ph-package-duotone",
        to: "/unconfigurator-integration-internal:package",
        component: join(__dirname, "internal/package/packageSideBar.vue"),
      });
  },
});
