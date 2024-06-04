import "vite-plugin-vue-configurable-router/runtime";
import "../../types/env.d.ts";
import "virtual:unconfigurator/menu";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { getRoutes } from "virtual:vite-plugin-vue-configurable-router/runtime";
import persistState from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import Index from "./App.vue";
import "uno.css";
import "./global.less";

const app = createApp(Index);
const router = createRouter({
  history: createWebHistory(),
  routes: getRoutes(),
});
app.use(router);
app.use(createPinia().use(persistState));
app.mount(document.querySelector("[unconfigurator]")!);
