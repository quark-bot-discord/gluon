import { expect } from "chai";
import { spy } from "sinon";
import { Channel } from "../../src/structures.js";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
  TEST_ROLES,
} from "../../src/testData.js";
import Guild from "../../src/structures/Guild.js";
import ChannelMessageManager from "../../src/managers/ChannelMessageManager.js";
import ChannelCacheOptions from "../../src/managers/ChannelCacheOptions.js";
import Role from "../../src/structures/Role.js";
import { PERMISSIONS } from "../../src/constants.js";
import { JsonTypes } from "#typings/enums.js";

describe("Channel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Channel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel).to.have.property("id");
      expect(channel).to.have.property("name");
      expect(channel).to.have.property("type");
      expect(channel).to.have.property("guildId");
      expect(channel).to.have.property("mention");
      expect(channel).to.have.property("guild");
      expect(channel).to.have.property("parentId");
      expect(channel).to.have.property("parent");
      expect(channel).to.have.property("rateLimitPerUser");
      expect(channel).to.have.property("nsfw");
      expect(channel).to.have.property("topic");
      expect(channel).to.have.property("_cacheOptions");
      expect(channel).to.have.property("messages");
      expect(channel).to.have.property("toString");
      expect(channel).to.have.property("toJSON");
      expect(channel).to.have.property("send");
      expect(channel).to.have.property("checkPermission");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.id).to.equal(TEST_DATA.TEXT_CHANNEL.id);
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.name).to.equal(TEST_DATA.TEXT_CHANNEL.name);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.type).to.equal(TEST_DATA.TEXT_CHANNEL.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.guildId).to.equal(TEST_DATA.TEXT_CHANNEL.guild_id);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.mention).to.equal(`<#${TEST_DATA.TEXT_CHANNEL.id}>`);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.guild).to.be.an.instanceOf(Guild);
    });
  });

  context("check parentId", function () {
    it("should have the correct parentId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.parentId).to.equal(TEST_DATA.TEXT_CHANNEL.parent_id);
    });
  });

  context("check parent", function () {
    it("should have the correct parent", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(channel.parent.id).to.equal(TEST_DATA.CATEGORY_CHANNEL.id);
    });
  });

  context("check rateLimitPerUser", function () {
    it("should have the correct rateLimitPerUser", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.rateLimitPerUser).to.equal(
        TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
      );
    });
  });

  context("check position", function () {
    it("should have the correct position", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.position).to.equal(TEST_DATA.TEXT_CHANNEL.position);
    });
  });

  context("check nsfw", function () {
    it("should have the correct nsfw", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.nsfw).to.equal(TEST_DATA.TEXT_CHANNEL.nsfw);
    });
  });

  context("check topic", function () {
    it("should have the correct topic", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.topic).to.equal(TEST_DATA.TEXT_CHANNEL.topic);
    });
  });

  context("check _cacheOptions", function () {
    it("should have the correct _cacheOptions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
    });
  });

  context("check messages", function () {
    it("should have the correct messages", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
  });

  context("check checkPermission", function () {
    it("should throw an error if no parameters are passed", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(() => channel.checkPermission()).to.throw(
        TypeError,
        "GLUON: No member provided.",
      );
    });
    it("should throw an error if member is not a Member instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(() => channel.checkPermission(123)).to.throw(
        TypeError,
        "GLUON: Member must be a Member.",
      );
    });
    it("should return the correct permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Role(client, TEST_DATA.ROLE_OVERRIDES, {
        guildId: TEST_DATA.GUILD_ID,
      });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_OVERRIDES.id];
      const member = TEST_MEMBERS.CLIENT_MEMBER(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL_2, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.checkPermission(member)).to.equal(
        String(
          PERMISSIONS.ADD_REACTIONS |
            PERMISSIONS.VIEW_CHANNEL |
            PERMISSIONS.ATTACH_FILES,
        ),
      );
    });
  });

  context("check getMention", function () {
    it("should throw an error if no parameters are passed", function () {
      expect(() => Channel.getMention()).to.throw(
        TypeError,
        "GLUON: No channel ID provided.",
      );
    });
    it("should return the correct mention", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      expect(Channel.getMention(TEST_DATA.CHANNEL_ID)).to.equal(
        `<#${TEST_DATA.TEXT_CHANNEL.id}>`,
      );
    });
  });

  context("check toString", function () {
    it("should have the correct toString", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.toString()).to.equal(
        `<Channel: ${TEST_DATA.TEXT_CHANNEL.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should have the correct toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.toJSON()).to.deep.equal({
        id: TEST_DATA.TEXT_CHANNEL.id,
        name: TEST_DATA.TEXT_CHANNEL.name,
        type: TEST_DATA.TEXT_CHANNEL.type,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        position: TEST_DATA.TEXT_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        permission_overwrites: [],
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        messages: [],
        nsfw: false,
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cacheOptions: 1023,
        id: TEST_DATA.TEXT_CHANNEL.id,
        name: TEST_DATA.TEXT_CHANNEL.name,
        type: TEST_DATA.TEXT_CHANNEL.type,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        position: TEST_DATA.TEXT_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        permission_overwrites: [],
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        messages: [],
      });
      expect(channel.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cacheOptions: 1023,
        id: TEST_DATA.TEXT_CHANNEL.id,
        name: TEST_DATA.TEXT_CHANNEL.name,
        type: TEST_DATA.TEXT_CHANNEL.type,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        position: TEST_DATA.TEXT_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        permission_overwrites: [],
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        messages: [],
      });
      expect(channel.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        id: TEST_DATA.TEXT_CHANNEL.id,
        name: TEST_DATA.TEXT_CHANNEL.name,
        type: TEST_DATA.TEXT_CHANNEL.type,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        position: TEST_DATA.TEXT_CHANNEL.position,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        permission_overwrites: [],
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        messages: [],
        nsfw: false,
      });
    });
  });

  context("check send", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.send).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      guild.channels.set(TEST_DATA.TEXT_CHANNEL.id, channel);
      await expect(channel.send({ content: "test" })).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const request = spy(client.request, "makeRequest");
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await channel.send({ content: "test" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postCreateMessage", [
        TEST_DATA.TEXT_CHANNEL.id,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      const rebundled = new Channel(client, channel.toJSON(), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(channel.id);
      expect(rebundled.name).to.equal(channel.name);
      expect(rebundled.type).to.equal(channel.type);
      expect(rebundled.guildId).to.equal(channel.guildId);
      expect(rebundled.mention).to.equal(channel.mention);
      expect(rebundled.guild).to.be.an.instanceOf(Guild);
      expect(rebundled.parentId).to.equal(channel.parentId);
      expect(rebundled.parent.id).to.equal(TEST_DATA.CATEGORY_CHANNEL.id);
      expect(rebundled.rateLimitPerUser).to.equal(channel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(channel.nsfw);
      expect(rebundled.topic).to.equal(channel.topic);
      expect(rebundled._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
      expect(rebundled.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
    it("should bundle correctly with custom toJSON", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      const rebundled = new Channel(
        client,
        channel.toJSON(JsonTypes.CACHE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(channel.id);
      expect(rebundled.name).to.equal(channel.name);
      expect(rebundled.type).to.equal(channel.type);
      expect(rebundled.guildId).to.equal(channel.guildId);
      expect(rebundled.mention).to.equal(channel.mention);
      expect(rebundled.guild).to.be.an.instanceOf(Guild);
      expect(rebundled.parentId).to.equal(channel.parentId);
      expect(rebundled.parent.id).to.equal(TEST_DATA.CATEGORY_CHANNEL.id);
      expect(rebundled.rateLimitPerUser).to.equal(channel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(channel.nsfw);
      expect(rebundled.topic).to.equal(channel.topic);
      expect(rebundled._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
      expect(rebundled.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
    it("should bundle correctly with custom toJSON", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      const rebundled = new Channel(
        client,
        channel.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(channel.id);
      expect(rebundled.name).to.equal(channel.name);
      expect(rebundled.type).to.equal(channel.type);
      expect(rebundled.guildId).to.equal(channel.guildId);
      expect(rebundled.mention).to.equal(channel.mention);
      expect(rebundled.guild).to.be.an.instanceOf(Guild);
      expect(rebundled.parentId).to.equal(channel.parentId);
      expect(rebundled.parent.id).to.equal(TEST_DATA.CATEGORY_CHANNEL.id);
      expect(rebundled.rateLimitPerUser).to.equal(channel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(channel.nsfw);
      expect(rebundled.topic).to.equal(channel.topic);
      expect(rebundled._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
      expect(rebundled.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
    it("should bundle correctly with custom toJSON", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guildId: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      const rebundled = new Channel(
        client,
        channel.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(channel.id);
      expect(rebundled.name).to.equal(channel.name);
      expect(rebundled.type).to.equal(channel.type);
      expect(rebundled.guildId).to.equal(channel.guildId);
      expect(rebundled.mention).to.equal(channel.mention);
      expect(rebundled.guild).to.be.an.instanceOf(Guild);
      expect(rebundled.parentId).to.equal(channel.parentId);
      expect(rebundled.parent.id).to.equal(TEST_DATA.CATEGORY_CHANNEL.id);
      expect(rebundled.rateLimitPerUser).to.equal(channel.rateLimitPerUser);
      expect(rebundled.nsfw).to.equal(channel.nsfw);
      expect(rebundled.topic).to.equal(channel.topic);
      expect(rebundled._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
      expect(rebundled.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
  });
});
