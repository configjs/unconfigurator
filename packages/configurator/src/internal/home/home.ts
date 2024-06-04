import { join } from "node:path";
import { defineIntegration } from "../../config";

let __dirname: string;
if (typeof globalThis.__dirname === "undefined")
  __dirname = new URL(".", import.meta.url).pathname;

export const Home = defineIntegration({
  configureFrontend(ctx) {
    ctx
      .registerRoute({
        path: "/",
        name: "Home",
        component: join(__dirname, "internal/home/home.vue"),
      })
      .registerAppBar({
        title: "Home",
        icon: "i-ph-house-duotone",
        to: "/",
      });
  },

  configureBackend(ctx) {
    ctx.io.on("connection", () => {
      console.log("A user connected to the home page!");
    });
  },
});
