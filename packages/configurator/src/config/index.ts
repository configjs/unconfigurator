import type { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import type { Promisable } from "@naiable/utils";
import type { Route } from "vite-plugin-vue-configurable-router";
import type { Connect } from "vite";
import type { Namespace } from "socket.io";
import { Logger } from "../utils";
import type { IntegrationInfo } from "../vite";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "CONNECT"
  | "TRACE";

export namespace Integration {
  export namespace ConfigureFrontend {
    export type FrontendRoute = Omit<Route, "children">;
    export interface AppBar {
      /** The title of the app bar. */
      title: string;
      /** The icon of the app bar. */
      icon: string;
      /** The route to redirect to. */
      to: string;
      /**
       * The component path to render in sidebar.
       *
       * - If you developing a integration, this path must be `absolute`;
       * - If you load a local project integration, this path can be `relative`.
       * - Like vscode, a app bar only can render one component in sidebar.
       */
      component?: string;
    }
    export interface StatusBar {
      /** The component to render in status bar. */
      component: string;
    }
    export class Context {
      protected readonly _routes: FrontendRoute[] = [];
      protected readonly _appBars: AppBar[] = [];
      protected readonly _statusBars: StatusBar[] = [];

      constructor(private readonly integration: IntegrationInfo) {}

      /** Register a route. */
      registerRoute(route: FrontendRoute) {
        this._routes.push({
          ...route,
          path: this.integration.isInternal
            ? route.path
            : join(this.integration.name, route.path),
        });
        return this;
      }

      /** Register a app bar. */
      registerAppBar(appBar: AppBar) {
        this._appBars.push(appBar);
        return this;
      }

      /** Register a status bar item. */
      registerStatusBar(statusBar: StatusBar) {
        this._statusBars.push(statusBar);
        return this;
      }
    }
  }
  export namespace ConfigureBackend {
    export interface BackendRoute<Path extends string = string> {
      /** The path for the route */
      path: Path;
      /** The HTTP method for the route */
      method: HttpMethod;
      /** The handler function for the route */
      handler: (
        req: IncomingMessage,
        res: ServerResponse,
        next: Connect.NextFunction
      ) => Promisable<void>;
    }
    export class Context {
      protected readonly _routes: BackendRoute[] = [];

      constructor(public readonly io: Namespace) {}

      /** Register a route. */
      registerRoute<Path extends string>(route: BackendRoute<Path>) {
        this._routes.push(route);
        return this;
      }

      /** Get logger. */
      get logger() {
        return new Logger();
      }
    }
  }
}
export interface Integration {
  /** Configure the frontend. */
  configureFrontend?: (
    ctx: Integration.ConfigureFrontend.Context
  ) => Promisable<void>;
  /** Configure the backend. */
  configureBackend?: (
    ctx: Integration.ConfigureBackend.Context
  ) => Promisable<void>;
}
export function defineIntegration(integration: Integration) {
  return integration;
}
