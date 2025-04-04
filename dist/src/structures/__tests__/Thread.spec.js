import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
} from "../../testData.js";
import { Thread } from "../../structures.js";
import { JsonTypes } from "#typings/enums.js";
describe("Thread", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Thread).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread).to.have.property("id");
      expect(thread).to.have.property("ownerId");
      expect(thread).to.have.property("owner");
      expect(thread).to.have.property("parentId");
      expect(thread).to.have.property("parent");
      expect(thread).to.have.property("toString");
      expect(thread).to.have.property("toJSON");
    });
  });
  context("check ownerId", function () {
    it("should have the correct ownerId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.ownerId).to.equal(TEST_DATA.THREAD.owner_id);
    });
  });
  context("check owner", function () {
    it("should have the correct owner", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.THREAD_OWNER_MEMBER(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.owner.id).to.equal(TEST_DATA.THREAD.owner_id);
    });
  });
  context("check parentId", function () {
    it("should have the correct parentId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.parentId).to.equal(TEST_DATA.THREAD.parent_id);
    });
  });
  context("check parent", function () {
    it("should have the correct parent", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
    });
  });
  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.toString()).to.equal(`<Thread: ${TEST_DATA.THREAD.id}>`);
    });
  });
  context("check toJSON", function () {
    it("should return an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.toJSON()).to.be.an("object");
    });
    it("should return the correct data", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.toJSON()).to.deep.equal({
        id: TEST_DATA.THREAD.id,
        messages: [],
        name: TEST_DATA.THREAD.name,
        owner_id: TEST_DATA.THREAD.owner_id,
        parent_id: TEST_DATA.THREAD.parent_id,
        position: TEST_DATA.THREAD.position,
        rate_limit_per_user: TEST_DATA.THREAD.rate_limit_per_user,
        topic: TEST_DATA.THREAD.topic,
        type: TEST_DATA.THREAD.type,
        nsfw: TEST_DATA.THREAD.nsfw,
        permission_overwrites: [],
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(thread.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cache_options: 1023,
        id: TEST_DATA.THREAD.id,
        messages: [],
        name: TEST_DATA.THREAD.name,
        owner_id: TEST_DATA.THREAD.owner_id,
        parent_id: TEST_DATA.THREAD.parent_id,
        position: TEST_DATA.THREAD.position,
        rate_limit_per_user: TEST_DATA.THREAD.rate_limit_per_user,
        topic: TEST_DATA.THREAD.topic,
        type: TEST_DATA.THREAD.type,
        permission_overwrites: [],
      });
      expect(thread.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 0,
        _cache_options: 1023,
        id: TEST_DATA.THREAD.id,
        messages: [],
        name: TEST_DATA.THREAD.name,
        owner_id: TEST_DATA.THREAD.owner_id,
        parent_id: TEST_DATA.THREAD.parent_id,
        position: TEST_DATA.THREAD.position,
        rate_limit_per_user: TEST_DATA.THREAD.rate_limit_per_user,
        topic: TEST_DATA.THREAD.topic,
        type: TEST_DATA.THREAD.type,
        permission_overwrites: [],
      });
      expect(thread.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        id: TEST_DATA.THREAD.id,
        messages: [],
        name: TEST_DATA.THREAD.name,
        owner_id: TEST_DATA.THREAD.owner_id,
        parent_id: TEST_DATA.THREAD.parent_id,
        position: TEST_DATA.THREAD.position,
        rate_limit_per_user: TEST_DATA.THREAD.rate_limit_per_user,
        topic: TEST_DATA.THREAD.topic,
        type: TEST_DATA.THREAD.type,
        nsfw: TEST_DATA.THREAD.nsfw,
        permission_overwrites: [],
      });
    });
  });
  context("check bundling", function () {
    it("should bundle", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.THREAD_OWNER_MEMBER(client);
      const thread = new Thread(client, TEST_DATA.THREAD, {
        guildId: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Thread(client, thread.toJSON(), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(thread.id);
      expect(rebundled.name).to.equal(thread.name);
      expect(rebundled.ownerId).to.equal(thread.ownerId);
      expect(rebundled.parentId).to.equal(thread.parentId);
      expect(rebundled.rateLimitPerUser).to.equal(thread.rateLimitPerUser);
      expect(rebundled.topic).to.equal(thread.topic);
      expect(rebundled.type).to.equal(thread.type);
      expect(rebundled.guild.id).to.equal(thread.guild.id);
      expect(rebundled.owner.id).to.equal(thread.owner.id);
      expect(rebundled.parent.id).to.equal(thread.parent.id);
    });
  });
  it("should bundle with custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    TEST_MEMBERS.THREAD_OWNER_MEMBER(client);
    const thread = new Thread(client, TEST_DATA.THREAD, {
      guildId: TEST_DATA.GUILD_ID,
    });
    const rebundled = new Thread(
      client,
      thread.toJSON(JsonTypes.CACHE_FORMAT),
      {
        guildId: TEST_DATA.GUILD_ID,
      },
    );
    expect(rebundled.id).to.equal(thread.id);
    expect(rebundled.name).to.equal(thread.name);
    expect(rebundled.ownerId).to.equal(thread.ownerId);
    expect(rebundled.parentId).to.equal(thread.parentId);
    expect(rebundled.rateLimitPerUser).to.equal(thread.rateLimitPerUser);
    expect(rebundled.topic).to.equal(thread.topic);
    expect(rebundled.type).to.equal(thread.type);
    expect(rebundled.guild.id).to.equal(thread.guild.id);
    expect(rebundled.owner.id).to.equal(thread.owner.id);
    expect(rebundled.parent.id).to.equal(thread.parent.id);
  });
  it("should bundle with custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    TEST_MEMBERS.THREAD_OWNER_MEMBER(client);
    const thread = new Thread(client, TEST_DATA.THREAD, {
      guildId: TEST_DATA.GUILD_ID,
    });
    const rebundled = new Thread(
      client,
      thread.toJSON(JsonTypes.STORAGE_FORMAT),
      {
        guildId: TEST_DATA.GUILD_ID,
      },
    );
    expect(rebundled.id).to.equal(thread.id);
    expect(rebundled.name).to.equal(thread.name);
    expect(rebundled.ownerId).to.equal(thread.ownerId);
    expect(rebundled.parentId).to.equal(thread.parentId);
    expect(rebundled.rateLimitPerUser).to.equal(thread.rateLimitPerUser);
    expect(rebundled.topic).to.equal(thread.topic);
    expect(rebundled.type).to.equal(thread.type);
    expect(rebundled.guild.id).to.equal(thread.guild.id);
    expect(rebundled.owner.id).to.equal(thread.owner.id);
    expect(rebundled.parent.id).to.equal(thread.parent.id);
  });
  it("should bundle with custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    TEST_MEMBERS.THREAD_OWNER_MEMBER(client);
    const thread = new Thread(client, TEST_DATA.THREAD, {
      guildId: TEST_DATA.GUILD_ID,
    });
    const rebundled = new Thread(
      client,
      thread.toJSON(JsonTypes.DISCORD_FORMAT),
      {
        guildId: TEST_DATA.GUILD_ID,
      },
    );
    expect(rebundled.id).to.equal(thread.id);
    expect(rebundled.name).to.equal(thread.name);
    expect(rebundled.ownerId).to.equal(thread.ownerId);
    expect(rebundled.parentId).to.equal(thread.parentId);
    expect(rebundled.rateLimitPerUser).to.equal(thread.rateLimitPerUser);
    expect(rebundled.topic).to.equal(thread.topic);
    expect(rebundled.type).to.equal(thread.type);
    expect(rebundled.guild.id).to.equal(thread.guild.id);
    expect(rebundled.owner.id).to.equal(thread.owner.id);
    expect(rebundled.parent.id).to.equal(thread.parent.id);
  });
});
//# sourceMappingURL=Thread.spec.js.map
