import { expect } from "chai";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import { SlashCommand } from "../../src/structures.js";

describe("SlashCommand", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(SlashCommand).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand).to.have.property("id");
      expect(slashCommand).to.have.property("data");
      expect(slashCommand).to.have.property("toString");
    });
  });

  context("check data", function () {
    it("should have the correct data", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand.data).to.equal(TEST_DATA.SLASH_COMMAND.data);
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const slashCommand = new SlashCommand(client, TEST_DATA.SLASH_COMMAND);
      expect(slashCommand.toString()).to.equal(
        `<SlashCommand: ${TEST_DATA.SLASH_COMMAND.id}>`,
      );
    });
  });
});
