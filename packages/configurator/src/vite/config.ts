import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import type { LoadOptions } from "js-yaml";
import { load } from "js-yaml";

export interface RawConfigReturn {
  /** The raw content of the config file. */
  config: unknown;
  /** The format of the config file. */
  format: "yaml" | "yml" | "json";
  /** The name of the config file, if it not exists, it value is `unknown`. */
  fileName: "configure.yml" | "configure.yaml" | "configure.json" | "unknown";
  /** Full path to the config file, if it not exists, it value is `unknown`. */
  filePath: string;
}

loadConfig._cache = null as null | RawConfigReturn;
export function loadConfig() {
  const config = {
    /**
     * Auto read the raw content of the config file.
     *
     * @author Zero <zero@naily.cc>
     * @param {boolean} [cache] Whether to cache the config file.
     * @return {RawConfigReturn} The raw content information of the config file. Please see {@linkcode RawConfigReturn} for more information.
     * @see RawConfigReturn
     */
    readRawConfig(cache: boolean = true): RawConfigReturn {
      const configLayer: Array<Omit<RawConfigReturn, "config">> = [
        {
          fileName: "configure.yml",
          format: "yml",
          filePath: join(cwd(), "configure.yml"),
        },
        {
          fileName: "configure.yaml",
          format: "yaml",
          filePath: join(cwd(), "configure.yaml"),
        },
        {
          fileName: "configure.json",
          format: "json",
          filePath: join(cwd(), "configure.json"),
        },
      ];

      for (const layer of configLayer) {
        if (
          cache &&
          loadConfig._cache &&
          loadConfig._cache.fileName === layer.fileName &&
          loadConfig._cache.filePath === layer.filePath &&
          loadConfig._cache.format === layer.format &&
          existsSync(layer.filePath)
        )
          return loadConfig._cache;

        if (
          existsSync(layer.filePath) &&
          readFileSync(layer.filePath, "utf-8").toString().length > 0
        ) {
          const builder = {
            config: readFileSync(layer.filePath, "utf-8").toString(),
            format: layer.format,
            fileName: layer.fileName,
            filePath: layer.filePath,
          };
          loadConfig._cache = builder;
          return builder;
        }
      }

      loadConfig._cache = {
        config: '{ "integrations": {} }',
        format: "json",
        fileName: "unknown",
        filePath: "unknown",
      };
      return loadConfig._cache;
    },
    /**
     * Load the config file and parse it.
     *
     * @author Zero <zero@naily.cc>
     * @param {boolean} [cache] Whether to cache the config file.
     * @param {LoadOptions} [options] The options for parsing the `yml|yaml` config file.
     * @return {unknown} The parsed content of the config file.
     */
    load(cache: boolean = true, options?: LoadOptions): unknown {
      const rawConfig = config.readRawConfig(cache);
      if (rawConfig.format === "json")
        return JSON.parse(rawConfig.config as string);
      else return load(rawConfig.config as string, options);
    },
    /**
     * Load the raw config file and parse it.
     *
     * @author Zero <zero@naily.cc>
     * @param {boolean} [cache] Whether to cache the config file.
     * @param {LoadOptions} [options] The options for parsing the `yml|yaml` config file.
     * @return {RawConfigReturn} Different from `load`, this function will return the raw content of the config file.
     */
    loadRawConfig(
      cache: boolean = true,
      options?: LoadOptions
    ): RawConfigReturn {
      const rawConfig = config.readRawConfig(cache);
      if (rawConfig.format === "json")
        rawConfig.config = JSON.parse(rawConfig.config as string);
      else rawConfig.config = load(rawConfig.config as string, options);
      return rawConfig;
    },
  };
  return config;
}
