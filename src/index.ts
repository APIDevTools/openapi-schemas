// tslint:disable: no-var-requires no-require-imports
import { JsonSchema } from "./json-schema";
export { JsonSchema };

/**
 * JSON Schema for OpenAPI Specification v1.2
 */
export const openapiV1 = require("../schemas/v1.2/apiDeclaration.json") as JsonSchema;

/**
 * JSON Schema for OpenAPI Specification v2.0
 */
export const openapiV2 = require("../schemas/v2.0/schema.json") as JsonSchema;

/**
 * JSON Schema for OpenAPI Specification v3.0
 */
export const openapiV3 = require("../schemas/v3.0/schema.json") as JsonSchema;

/**
 * JSON Schemas for every version of the OpenAPI Specification
 */
export const openapi = {
  v1: openapiV1,
  v2: openapiV2,
  v3: openapiV3,
};

// Export `openapi` as the default export
// tslint:disable: no-default-export
export default openapi;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
