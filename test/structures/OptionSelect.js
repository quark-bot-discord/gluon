import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import { OptionSelect } from "../../src/structures.js";
import { JsonTypes } from "#typings/enums.js";

describe("OptionSelect", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(OptionSelect).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect).to.have.property("id");
      expect(optionSelect).to.have.property("type");
      expect(optionSelect).to.have.property("guildId");
      expect(optionSelect).to.have.property("channelId");
      expect(optionSelect).to.have.property("member");
      expect(optionSelect).to.have.property("customId");
      expect(optionSelect).to.have.property("message");
      expect(optionSelect).to.have.property("values");
      expect(optionSelect).to.have.property("guild");
      expect(optionSelect).to.have.property("channel");
      expect(optionSelect).to.have.property("textPrompt");
      expect(optionSelect).to.have.property("autocompleteResponse");
      expect(optionSelect).to.have.property("reply");
      expect(optionSelect).to.have.property("edit");
      expect(optionSelect).to.have.property("acknowledge");
    });
  });

  context("check customId", function () {
    it("should have the correct customId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.customId).to.equal(
        TEST_DATA.OPTION_SELECT.data.custom_id,
      );
    });
  });

  context("check message", function () {
    it("should have the correct message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.message.id).to.equal(
        TEST_DATA.OPTION_SELECT.message.id,
      );
    });
  });

  context("check values", function () {
    it("should have the correct values", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.values).to.deep.equal(
        TEST_DATA.OPTION_SELECT.data.values,
      );
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.toString()).to.equal(
        `<OptionSelect: ${TEST_DATA.OPTION_SELECT.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.toJSON).to.be.a("function");
    });
    it("should return the correct JSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.toJSON()).to.deep.equal({
        id: TEST_DATA.OPTION_SELECT.id,
        type: TEST_DATA.OPTION_SELECT.type,
        guild_id: TEST_DATA.OPTION_SELECT.guild_id,
        channel_id: TEST_DATA.OPTION_SELECT.channel_id,
        member: {
          avatar: TEST_DATA.OPTION_SELECT.member.avatar,
          communication_disabled_until:
            TEST_DATA.OPTION_SELECT.member.communication_disabled_until,
          flags: TEST_DATA.OPTION_SELECT.member.flags,
          joined_at: new Date(
            TEST_DATA.OPTION_SELECT.member.joined_at,
          ).toISOString(),
          nick: TEST_DATA.OPTION_SELECT.member.nick,
          pending: TEST_DATA.OPTION_SELECT.member.pending,
          permissions: TEST_DATA.OPTION_SELECT.member.permissions,
          roles: [],
          user: {
            avatar: TEST_DATA.OPTION_SELECT.member.user.avatar,
            bot: TEST_DATA.OPTION_SELECT.member.user.bot,
            discriminator: TEST_DATA.OPTION_SELECT.member.user.discriminator,
            id: TEST_DATA.OPTION_SELECT.member.user.id,
            username: TEST_DATA.OPTION_SELECT.member.user.username,
            global_name: TEST_DATA.OPTION_SELECT.member.user.global_name,
          },
        },
        message: {
          attachments: TEST_DATA.OPTION_SELECT.message.attachments,
          author: {
            avatar: TEST_DATA.OPTION_SELECT.message.author.avatar,
            bot: TEST_DATA.OPTION_SELECT.message.author.bot,
            discriminator: TEST_DATA.OPTION_SELECT.message.author.discriminator,
            id: TEST_DATA.OPTION_SELECT.message.author.id,
            username: TEST_DATA.OPTION_SELECT.message.author.username,
            global_name: TEST_DATA.OPTION_SELECT.message.author.global_name,
          },
          channel_id: TEST_DATA.OPTION_SELECT.message.channel_id,
          content: TEST_DATA.OPTION_SELECT.message.content,
          edited_timestamp: TEST_DATA.OPTION_SELECT.message.edited_timestamp,
          embeds: TEST_DATA.OPTION_SELECT.message.embeds,
          id: TEST_DATA.OPTION_SELECT.message.id,
          member: undefined,
          mention_everyone: false,
          mention_roles: [],
          mentions: [],
          pinned: false,
          message_snapshots: undefined,
          pinned: false,
          poll: undefined,
          reactions: [],
          referenced_message: undefined,
          sticker_items: [],
          type: 0,
        },
        data: {
          custom_id: TEST_DATA.OPTION_SELECT.data.custom_id,
          values: TEST_DATA.OPTION_SELECT.data.values,
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const optionSelect = new OptionSelect(client, TEST_DATA.OPTION_SELECT, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(optionSelect.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        id: TEST_DATA.OPTION_SELECT.id,
        type: TEST_DATA.OPTION_SELECT.type,
        guild_id: TEST_DATA.OPTION_SELECT.guild_id,
        channel_id: TEST_DATA.OPTION_SELECT.channel_id,
        custom_id: TEST_DATA.OPTION_SELECT.data.custom_id,
        member: {
          _attributes: 0,
          avatar: TEST_DATA.OPTION_SELECT.member.avatar,
          communication_disabled_until:
            TEST_DATA.OPTION_SELECT.member.communication_disabled_until,
          flags: TEST_DATA.OPTION_SELECT.member.flags,
          joined_at: new Date(
            TEST_DATA.OPTION_SELECT.member.joined_at,
          ).getTime(),
          nick: TEST_DATA.OPTION_SELECT.member.nick,
          permissions: TEST_DATA.OPTION_SELECT.member.permissions,
          roles: [],
          user: {
            _cached: optionSelect.member.user._cached,
            avatar: TEST_DATA.OPTION_SELECT.member.user.avatar,
            bot: TEST_DATA.OPTION_SELECT.member.user.bot,
            discriminator: TEST_DATA.OPTION_SELECT.member.user.discriminator,
            id: TEST_DATA.OPTION_SELECT.member.user.id,
            username: TEST_DATA.OPTION_SELECT.member.user.username,
            global_name: TEST_DATA.OPTION_SELECT.member.user.global_name,
          },
        },
        message: {
          _attributes: 0,
          attachments: TEST_DATA.OPTION_SELECT.message.attachments,
          author: {
            _cached: optionSelect.message.author._cached,
            avatar: TEST_DATA.OPTION_SELECT.message.author.avatar,
            bot: TEST_DATA.OPTION_SELECT.message.author.bot,
            discriminator: TEST_DATA.OPTION_SELECT.message.author.discriminator,
            id: TEST_DATA.OPTION_SELECT.message.author.id,
            username: TEST_DATA.OPTION_SELECT.message.author.username,
            global_name: TEST_DATA.OPTION_SELECT.message.author.global_name,
          },
          content: TEST_DATA.OPTION_SELECT.message.content,
          edited_timestamp: TEST_DATA.OPTION_SELECT.message.edited_timestamp,
          embeds: TEST_DATA.OPTION_SELECT.message.embeds,
          id: TEST_DATA.OPTION_SELECT.message.id,
          member: undefined,
          message_snapshots: undefined,
          poll: undefined,
          referenced_message: undefined,
          sticker_items: [],
          type: 0,
          messageReactions: {},
        },
        values: TEST_DATA.OPTION_SELECT.data.values,
      });
      expect(optionSelect.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        id: TEST_DATA.OPTION_SELECT.id,
        type: TEST_DATA.OPTION_SELECT.type,
        guild_id: TEST_DATA.OPTION_SELECT.guild_id,
        channel_id: TEST_DATA.OPTION_SELECT.channel_id,
        custom_id: TEST_DATA.OPTION_SELECT.data.custom_id,
        member: {
          _attributes: 0,
          avatar: TEST_DATA.OPTION_SELECT.member.avatar,
          communication_disabled_until:
            TEST_DATA.OPTION_SELECT.member.communication_disabled_until,
          flags: TEST_DATA.OPTION_SELECT.member.flags,
          joined_at: new Date(
            TEST_DATA.OPTION_SELECT.member.joined_at,
          ).getTime(),
          nick: TEST_DATA.OPTION_SELECT.member.nick,
          permissions: TEST_DATA.OPTION_SELECT.member.permissions,
          roles: [],
          user: {
            avatar: TEST_DATA.OPTION_SELECT.member.user.avatar,
            bot: TEST_DATA.OPTION_SELECT.member.user.bot,
            discriminator: TEST_DATA.OPTION_SELECT.member.user.discriminator,
            id: TEST_DATA.OPTION_SELECT.member.user.id,
            username: TEST_DATA.OPTION_SELECT.member.user.username,
            global_name: TEST_DATA.OPTION_SELECT.member.user.global_name,
          },
        },
        message: {
          _attributes: 0,
          attachments: TEST_DATA.OPTION_SELECT.message.attachments,
          author: {
            avatar: TEST_DATA.OPTION_SELECT.message.author.avatar,
            bot: TEST_DATA.OPTION_SELECT.message.author.bot,
            discriminator: TEST_DATA.OPTION_SELECT.message.author.discriminator,
            id: TEST_DATA.OPTION_SELECT.message.author.id,
            username: TEST_DATA.OPTION_SELECT.message.author.username,
            global_name: TEST_DATA.OPTION_SELECT.message.author.global_name,
          },
          content: TEST_DATA.OPTION_SELECT.message.content,
          edited_timestamp: TEST_DATA.OPTION_SELECT.message.edited_timestamp,
          embeds: TEST_DATA.OPTION_SELECT.message.embeds,
          id: TEST_DATA.OPTION_SELECT.message.id,
          member: undefined,
          message_snapshots: undefined,
          poll: undefined,
          referenced_message: undefined,
          sticker_items: [],
          type: 0,
          messageReactions: {},
        },
        values: TEST_DATA.OPTION_SELECT.data.values,
      });
      expect(optionSelect.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        id: TEST_DATA.OPTION_SELECT.id,
        type: TEST_DATA.OPTION_SELECT.type,
        guild_id: TEST_DATA.OPTION_SELECT.guild_id,
        channel_id: TEST_DATA.OPTION_SELECT.channel_id,
        member: {
          avatar: TEST_DATA.OPTION_SELECT.member.avatar,
          communication_disabled_until:
            TEST_DATA.OPTION_SELECT.member.communication_disabled_until,
          flags: TEST_DATA.OPTION_SELECT.member.flags,
          joined_at: new Date(
            TEST_DATA.OPTION_SELECT.member.joined_at,
          ).toISOString(),
          nick: TEST_DATA.OPTION_SELECT.member.nick,
          pending: TEST_DATA.OPTION_SELECT.member.pending,
          permissions: TEST_DATA.OPTION_SELECT.member.permissions,
          roles: [],
          user: {
            avatar: TEST_DATA.OPTION_SELECT.member.user.avatar,
            bot: TEST_DATA.OPTION_SELECT.member.user.bot,
            discriminator: TEST_DATA.OPTION_SELECT.member.user.discriminator,
            id: TEST_DATA.OPTION_SELECT.member.user.id,
            username: TEST_DATA.OPTION_SELECT.member.user.username,
            global_name: TEST_DATA.OPTION_SELECT.member.user.global_name,
          },
        },
        message: {
          attachments: TEST_DATA.OPTION_SELECT.message.attachments,
          author: {
            avatar: TEST_DATA.OPTION_SELECT.message.author.avatar,
            bot: TEST_DATA.OPTION_SELECT.message.author.bot,
            discriminator: TEST_DATA.OPTION_SELECT.message.author.discriminator,
            id: TEST_DATA.OPTION_SELECT.message.author.id,
            username: TEST_DATA.OPTION_SELECT.message.author.username,
            global_name: TEST_DATA.OPTION_SELECT.message.author.global_name,
          },
          channel_id: TEST_DATA.OPTION_SELECT.message.channel_id,
          content: TEST_DATA.OPTION_SELECT.message.content,
          edited_timestamp: TEST_DATA.OPTION_SELECT.message.edited_timestamp,
          embeds: TEST_DATA.OPTION_SELECT.message.embeds,
          id: TEST_DATA.OPTION_SELECT.message.id,
          member: undefined,
          mention_everyone: false,
          mention_roles: [],
          mentions: [],
          pinned: false,
          message_snapshots: undefined,
          pinned: false,
          poll: undefined,
          reactions: [],
          referenced_message: undefined,
          sticker_items: [],
          type: 0,
        },
        data: {
          custom_id: TEST_DATA.OPTION_SELECT.data.custom_id,
          values: TEST_DATA.OPTION_SELECT.data.values,
        },
      });
    });
  });
});
