/// <reference types="vite/client" />

declare module "virtual:unconfigurator/menu" {
  import type { Integration } from "unconfigurator/config";

  const menu: Array<
    Integration.ConfigureFrontend.AppBar & {
      component?: Function;
    }
  >;
  export default menu;
}
