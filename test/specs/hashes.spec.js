"use strict";

const { openapi } = require("../../lib");
const { expect } = require("chai");
const crypto = require("crypto");

describe("Schema hashes", () => {

  /**
   * These hashes match the versions that are currently published to NPM.
   * If the hashes ever change, then we want the build to fail so that we
   * have to publish the latest versions to NPM.
   */
  const hashes = {
    openapiV1: "fedbb966f17e54afd8ddcb87cb12d4b42715fbb493a66581861cf2f8aa4d6b10",
    openapiV2: "220e4d47e8dbd8f72a612898429b970bfd652e663569f7202002ceb9767e033a",
    openapiV3: "12ba334b36afd9443f1a04cf7fccf09b4a8059d1b7f851faebe91cf60d01f633",
    openapiV31: "549386120954be0bdd3778c72ceb376becb83489b4143fe9c26b0b65ebe9891e",
  };

  for (let [version, hash] of Object.entries(hashes)) {
    it(`should match the ${version} hash that's currently published to NPM`, () => {
      let json = JSON.stringify(openapi[version]);
      let sha256 = crypto.createHash("sha256").update(json).digest("hex");

      try {
        expect(sha256).to.equal(hash);
      }
      catch (error) {
        console.error(
          "\n================================================================================" +
          `\nThe ${version} schema has changed!\n` +
          `\nThe hash that's currently published to NPM is: ${hash}` +
          `\nThe hash of the latest OpenAPI Specification is: ${sha256}` +
          "\n================================================================================\n"
        );
        throw error;
      }
    });
  }

});
