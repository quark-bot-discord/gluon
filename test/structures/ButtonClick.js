import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import { ButtonClick } from "../../src/structures.js";

describe("ButtonClick", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ButtonClick).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK, {
        guildId: TEST_DATA.GUILD_ID,
        channelId: TEST_DATA.CHANNEL_ID,
      });
      expect(buttonClick).to.have.property("id");
      expect(buttonClick).to.have.property("type");
      expect(buttonClick).to.have.property("guildId");
      expect(buttonClick).to.have.property("channelId");
      expect(buttonClick).to.have.property("member");
      expect(buttonClick).to.have.property("customId");
      expect(buttonClick).to.have.property("message");
      expect(buttonClick).to.have.property("guild");
      expect(buttonClick).to.have.property("channel");
      expect(buttonClick).to.have.property("textPrompt");
      expect(buttonClick).to.have.property("autocompleteResponse");
      expect(buttonClick).to.have.property("reply");
      expect(buttonClick).to.have.property("edit");
      expect(buttonClick).to.have.property("acknowledge");
    });
  });

  context("check customId", function () {
    it("should have the correct customId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK, {
        guildId: TEST_DATA.GUILD_ID,
        channelId: TEST_DATA.CHANNEL_ID,
      });
      expect(buttonClick.customId).to.equal(TEST_DATA.BUTTON_CLICK.custom_id);
    });
  });

  context("check message", function () {
    it("should have the correct message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const buttonClick = new ButtonClick(client, TEST_DATA.BUTTON_CLICK, {
        guildId: TEST_DATA.GUILD_ID,
        channelId: TEST_DATA.CHANNEL_ID,
      });
      expect(buttonClick.message.id).to.equal(
        TEST_DATA.BUTTON_CLICK.message.id,
      );
    });
  });
});
