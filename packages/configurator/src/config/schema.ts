import { z } from "zod";
import type { Options, Targets } from "zod-to-json-schema";
import { zodToJsonSchema } from "zod-to-json-schema";

export function integrationsSchema<T extends z.ZodRawShape>(
  shape: T = {} as T
) {
  return z
    .object(shape)
    .describe(
      "The integrations object is a key-value object where the key is the name of the integration and the value is the configuration for that integration."
    )
    .passthrough();
}

export interface ConfigSchemaOptions<
  Integrations extends ReturnType<typeof integrationsSchema>
> {
  extendedIntegrationsSchema?: Integrations;
}
export function ConfigSchema<
  Integrations extends ReturnType<typeof integrationsSchema>
>(customOptions: ConfigSchemaOptions<Integrations> = {}) {
  const integrations =
    (customOptions && customOptions.extendedIntegrationsSchema) ||
    (integrationsSchema() as Integrations);

  return z.object({ integrations });
}

export function generateJsonSchema<Target extends Targets = "jsonSchema7">(
  schema: z.Schema,
  options: Partial<Options<Target>> = {}
) {
  return zodToJsonSchema(schema, options);
}
