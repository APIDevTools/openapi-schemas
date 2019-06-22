"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, openapi: namedExport } = require("../../");
const { v1, v2, v3, openapiV1, openapiV2, openapiV3 } = require("../../");
const { expect } = require("chai");

describe("openapi-schemas package exports", () => {

  const specVersions = ["v1", "v2", "v3", "openapiV1", "openapiV2", "openapiV3"];
  const exports = ["default", "openapi", ...specVersions];

  /**
   * Asserts that the given object contains every verion of the OpenAPI Specification
   */
  function isAllSpecs (obj) {
    expect(obj).to.be.an("object").and.have.keys(exports);
    expect(obj.default).to.equal(obj);
    expect(obj.openapi).to.equal(obj);
    expect(obj.v1).to.satisfy(isJsonSchema);
    expect(obj.v2).to.satisfy(isJsonSchema);
    expect(obj.v3).to.satisfy(isJsonSchema);
    expect(obj.openapiV1).to.satisfy(isJsonSchema);
    expect(obj.openapiV2).to.satisfy(isJsonSchema);
    expect(obj.openapiV3).to.satisfy(isJsonSchema);
    return true;
  }

  /**
   * Assets that the given object is a JSON schema
   */
  function isJsonSchema (obj) {
    expect(obj).to.be.an("object");
    expect(obj).to.include.keys("id", "$schema", "properties", "definitions");
    expect(obj).not.to.have.any.keys(exports);
    return true;
  }

  it("should export the openapi object as the default CommonJS export", () => {
    expect(commonJSExport).to.satisfy(isAllSpecs);
  });

  it("should export the openapi object as the default ESM export", () => {
    expect(defaultExport).satisfy(isAllSpecs);
  });

  it("should export the openapi object as a named export", () => {
    expect(namedExport).to.satisfy(isAllSpecs);
  });

  it("should export the openapiV1 object as a named export", () => {
    expect(v1).to.satisfy(isJsonSchema);
    expect(openapiV1).to.equal(v1);
    expect(v1.properties.swaggerVersion.enum).to.deep.equal(["1.2"]);
  });

  it("should export the openapiV2 object as a named export", () => {
    expect(v2).to.satisfy(isJsonSchema);
    expect(openapiV2).to.equal(v2);
    expect(v2.properties.swagger.enum).to.deep.equal(["2.0"]);
  });

  it("should export the openapiV3 object as a named export", () => {
    expect(v3).to.satisfy(isJsonSchema);
    expect(openapiV3).to.equal(v3);
    expect(v3.properties.openapi.pattern).to.equal("^3\\.0\\.\\d(-.+)?$");
  });

});
