import { expect } from "chai";
import { spy } from "sinon";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import TextChannel from "../../src/structures/TextChannel.js";
import Member from "../../src/structures/Member.js";
import Role from "../../src/structures/Role.js";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";

describe("TextChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(TextChannel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel).to.have.property("id");
      expect(textChannel).to.have.property("name");
      expect(textChannel).to.have.property("type");
      expect(textChannel).to.have.property("guildId");
      expect(textChannel).to.have.property("mention");
      expect(textChannel).to.have.property("guild");
      expect(textChannel).to.have.property("parentId");
      expect(textChannel).to.have.property("parent");
      expect(textChannel).to.have.property("rateLimitPerUser");
      expect(textChannel).to.have.property("nsfw");
      expect(textChannel).to.have.property("topic");
      expect(textChannel).to.have.property("_cacheOptions");
      expect(textChannel).to.have.property("messages");
      expect(textChannel).to.have.property("toString");
      expect(textChannel).to.have.property("toJSON");
      expect(textChannel).to.have.property("send");
      expect(textChannel).to.have.property("bulkDelete");
    });
  });

  context("check bulkDelete", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.bulkDelete).to.be.a("function");
    });
    it("should return an error if the bot has insufficient permissions", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(textChannel.bulkDelete()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: MANAGE_MESSAGES",
      );
    });
    it("should return an error if messages is not an array of strings", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(textChannel.bulkDelete(["1", 2])).to.be.rejectedWith(
        TypeError,
        "GLUON: Messages is not an array of strings.",
      );
    });
    it("should return an error if reason is provided and not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      await expect(
        textChannel.bulkDelete(["1"], { reason: 1 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason is not a string.");
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      const request = spy(client.request, "makeRequest");
      await textChannel.bulkDelete(["1", "2"]);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postBulkDeleteMessages", [
        TEST_DATA.TEXT_CHANNEL.id,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.toString()).to.equal(
        `<TextChannel: ${TEST_DATA.TEXT_CHANNEL.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return a JSON object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.toJSON()).to.be.a("object");
    });
    it("should return the correct JSON object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.toJSON()).to.deep.equal({
        id: TEST_DATA.TEXT_CHANNEL.id,
        messages: [],
        name: TEST_DATA.TEXT_CHANNEL.name,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        type: TEST_DATA.TEXT_CHANNEL.type,
        nsfw: TEST_DATA.TEXT_CHANNEL.nsfw,
        permission_overwrites: [],
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(textChannel.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT)).to.deep.equal(
        {
          _attributes: 0,
          _cacheOptions: 1023,
          id: TEST_DATA.TEXT_CHANNEL.id,
          messages: [],
          name: TEST_DATA.TEXT_CHANNEL.name,
          parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
          rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
          topic: TEST_DATA.TEXT_CHANNEL.topic,
          type: TEST_DATA.TEXT_CHANNEL.type,
          permission_overwrites: [],
        },
      );
      expect(
        textChannel.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
      ).to.deep.equal({
        _attributes: 0,
        _cacheOptions: 1023,
        id: TEST_DATA.TEXT_CHANNEL.id,
        messages: [],
        name: TEST_DATA.TEXT_CHANNEL.name,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        type: TEST_DATA.TEXT_CHANNEL.type,
        permission_overwrites: [],
      });
      expect(
        textChannel.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
      ).to.deep.equal({
        id: TEST_DATA.TEXT_CHANNEL.id,
        messages: [],
        name: TEST_DATA.TEXT_CHANNEL.name,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        type: TEST_DATA.TEXT_CHANNEL.type,
        nsfw: TEST_DATA.TEXT_CHANNEL.nsfw,
        permission_overwrites: [],
      });
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });

      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);

      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });

      const rebundled = new TextChannel(client, textChannel.toJSON(), {
        guild_id: TEST_DATA.GUILD_ID,
      });

      expect(rebundled.id).to.equal(textChannel.id);
      expect(rebundled.name).to.equal(textChannel.name);
      expect(rebundled.type).to.equal(textChannel.type);
      expect(rebundled.guildId).to.equal(textChannel.guildId);
      expect(rebundled.mention).to.equal(textChannel.mention);
      expect(rebundled.guild.id).to.equal(textChannel.guild.id);
      expect(rebundled.parentId).to.equal(textChannel.parentId);
      expect(rebundled.parent.id).to.equal(textChannel.parent.id);
      expect(rebundled.rateLimitPerUser).to.equal(textChannel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(textChannel.nsfw);
      expect(rebundled.topic).to.equal(textChannel.topic);
      expect(rebundled._cacheOptions).to.deep.equal(textChannel._cacheOptions);
      expect(rebundled.messages).to.deep.equal(textChannel.messages);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });

      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);

      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });

      const rebundled = new TextChannel(
        client,
        textChannel.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );

      expect(rebundled.id).to.equal(textChannel.id);
      expect(rebundled.name).to.equal(textChannel.name);
      expect(rebundled.type).to.equal(textChannel.type);
      expect(rebundled.guildId).to.equal(textChannel.guildId);
      expect(rebundled.mention).to.equal(textChannel.mention);
      expect(rebundled.guild.id).to.equal(textChannel.guild.id);
      expect(rebundled.parentId).to.equal(textChannel.parentId);
      expect(rebundled.parent.id).to.equal(textChannel.parent.id);
      expect(rebundled.rateLimitPerUser).to.equal(textChannel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(textChannel.nsfw);
      expect(rebundled.topic).to.equal(textChannel.topic);
      expect(rebundled._cacheOptions).to.deep.equal(textChannel._cacheOptions);
      expect(rebundled.messages).to.deep.equal(textChannel.messages);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });

      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);

      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });

      const rebundled = new TextChannel(
        client,
        textChannel.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );

      expect(rebundled.id).to.equal(textChannel.id);
      expect(rebundled.name).to.equal(textChannel.name);
      expect(rebundled.type).to.equal(textChannel.type);
      expect(rebundled.guildId).to.equal(textChannel.guildId);
      expect(rebundled.mention).to.equal(textChannel.mention);
      expect(rebundled.guild.id).to.equal(textChannel.guild.id);
      expect(rebundled.parentId).to.equal(textChannel.parentId);
      expect(rebundled.parent.id).to.equal(textChannel.parent.id);
      expect(rebundled.rateLimitPerUser).to.equal(textChannel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(textChannel.nsfw);
      expect(rebundled.topic).to.equal(textChannel.topic);
      expect(rebundled._cacheOptions).to.deep.equal(textChannel._cacheOptions);
      expect(rebundled.messages).to.deep.equal(textChannel.messages);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });

      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);

      const textChannel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.GUILD_ID,
      });

      const rebundled = new TextChannel(
        client,
        textChannel.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );

      expect(rebundled.id).to.equal(textChannel.id);
      expect(rebundled.name).to.equal(textChannel.name);
      expect(rebundled.type).to.equal(textChannel.type);
      expect(rebundled.guildId).to.equal(textChannel.guildId);
      expect(rebundled.mention).to.equal(textChannel.mention);
      expect(rebundled.guild.id).to.equal(textChannel.guild.id);
      expect(rebundled.parentId).to.equal(textChannel.parentId);
      expect(rebundled.parent.id).to.equal(textChannel.parent.id);
      expect(rebundled.rateLimitPerUser).to.equal(textChannel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(textChannel.nsfw);
      expect(rebundled.topic).to.equal(textChannel.topic);
      expect(rebundled._cacheOptions).to.deep.equal(textChannel._cacheOptions);
      expect(rebundled.messages).to.deep.equal(textChannel.messages);
    });
  });
});