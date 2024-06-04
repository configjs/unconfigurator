import { importx } from "importx";
import type { Integration } from "../config";
import { ConfigSchema } from "../config/schema";
import { Logger } from "../utils";
import { loadConfig } from "./config";

let __dirname: string;
if (typeof globalThis.__dirname === "undefined")
  __dirname = new URL(".", import.meta.url).pathname;

export interface IntegrationInfo {
  /** The name of the integration */
  name: string;
  /** The integration instance */
  integration: Integration;
  /** The options of the integration */
  options?: Record<string, any>;
  /** Is internal integration */
  isInternal?: true;
}

export async function loadAllIntegrations(
  configSchema = ConfigSchema()
): Promise<IntegrationInfo[]> {
  const config = loadConfig().load();
  const logger = new Logger();

  const parsedConfig = configSchema
    .default({
      integrations: {},
    })
    .parse(config);
  const loadedIntegrations: IntegrationInfo[] = [];
  for (const [name, options] of Object.entries(
    parsedConfig.integrations || {}
  )) {
    const mod = await importx(name, __dirname);
    let integration: Integration;
    if (typeof mod === "function") integration = mod(options);
    else if (typeof mod === "object" && typeof mod.default === "function")
      integration = mod.default(options);
    else if (typeof mod === "object" && typeof mod.default === "object")
      integration = mod.default;
    else
      throw new TypeError(
        `Integration "${name}" must export a function or an object with a default function.`
      );

    logger.logBeforeViteStart("External Integration", name);
    loadedIntegrations.push({ name, integration, options });
  }
  return loadedIntegrations;
}

export function addIntegration(
  info: IntegrationInfo[],
  integration: IntegrationInfo
) {
  info.push({
    ...integration,
    isInternal: true,
  });
  new Logger().logBeforeViteStart("Internal Integration", integration.name);
  return { addIntegration };
}
