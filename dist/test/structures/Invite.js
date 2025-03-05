import { expect } from "chai";
import { INVITE_BASE_URL } from "../../src/constants.js";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../src/testData.js";
import { Invite } from "../../src/structures.js";
import { JsonTypes } from "#typings/enums.js";
describe("Invite", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Invite).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite).to.have.property("code");
      expect(invite).to.have.property("guildId");
      expect(invite).to.have.property("channelId");
      expect(invite).to.have.property("guild");
      expect(invite).to.have.property("channel");
      expect(invite).to.have.property("uses");
      expect(invite).to.have.property("expires");
      expect(invite).to.have.property("inviter");
      expect(invite).to.have.property("url");
      expect(invite).to.have.property("id");
      expect(invite).to.have.property("maxUses");
      expect(invite).to.have.property("toString");
      expect(invite).to.have.property("toJSON");
    });
  });
  context("check code", function () {
    it("should have the correct code", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.code).to.equal(TEST_DATA.INVITE.code);
    });
  });
  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.guildId).to.equal(TEST_DATA.INVITE.guild_id);
    });
  });
  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.channelId).to.equal(TEST_DATA.INVITE.channel.id);
    });
  });
  context("check uses", function () {
    it("should have the correct uses", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.uses).to.equal(TEST_DATA.INVITE.uses);
    });
  });
  context("check expires", function () {
    it("should have the correct expires", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.expires).to.equal(
        (new Date(TEST_DATA.INVITE.expires_at).getTime() / 1000) | 0,
      );
    });
  });
  context("check inviter", function () {
    it("should have the correct inviter", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.inviter.id).to.equal(TEST_DATA.INVITE.inviter.id);
    });
  });
  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.id).to.equal(TEST_DATA.INVITE.code);
    });
  });
  context("check url", function () {
    it("should have the correct url", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.url).to.equal(
        `${INVITE_BASE_URL}/${TEST_DATA.INVITE.code}`,
      );
    });
  });
  context("check maxUses", function () {
    it("should have the correct maxUses", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.maxUses).to.equal(TEST_DATA.INVITE.max_uses);
    });
  });
  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.guildId).to.equal(TEST_DATA.INVITE.guild_id);
    });
  });
  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.guild.id).to.equal(TEST_DATA.GUILD_ID);
    });
  });
  context("check getUrl", function () {
    it("should return the correct url", function () {
      expect(Invite.getUrl(TEST_DATA.INVITE.code)).to.equal(
        `${INVITE_BASE_URL}/${TEST_DATA.INVITE.code}`,
      );
    });
    it("should throw an error if no code is provided", function () {
      expect(() => Invite.getUrl()).to.throw(
        TypeError,
        "GLUON: Invalid invite code.",
      );
    });
  });
  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.toString()).to.equal(`<Invite: ${TEST_DATA.INVITE.code}>`);
    });
  });
  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.toJSON()).to.deep.equal({
        code: TEST_DATA.INVITE.code,
        channel: {
          id: TEST_DATA.INVITE.channel.id,
          messages: [],
          name: TEST_DATA.INVITE.channel.name,
          nsfw: TEST_DATA.INVITE.channel.nsfw,
          parent_id: TEST_DATA.INVITE.channel.parent_id,
          position: 0,
          rate_limit_per_user: TEST_DATA.INVITE.channel.rate_limit_per_user,
          topic: TEST_DATA.INVITE.channel.topic,
          type: TEST_DATA.INVITE.channel.type,
          rate_limit_per_user: 0,
          permission_overwrites: [],
        },
        uses: TEST_DATA.INVITE.uses,
        expires_at: new Date(
          ((new Date(TEST_DATA.INVITE.expires_at).getTime() / 1000) | 0) * 1000,
        ).toISOString(),
        max_uses: TEST_DATA.INVITE.max_uses,
        inviter: {
          id: TEST_DATA.INVITE.inviter.id,
          username: TEST_DATA.INVITE.inviter.username,
          discriminator: TEST_DATA.INVITE.inviter.discriminator,
          avatar: TEST_DATA.INVITE.inviter.avatar,
          bot: TEST_DATA.INVITE.inviter.bot,
          global_name: TEST_DATA.INVITE.inviter.global_name,
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(invite.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        code: TEST_DATA.INVITE.code,
        channel: {
          _attributes: 0,
          _cacheOptions: 1023,
          id: TEST_DATA.INVITE.channel.id,
          messages: [],
          name: TEST_DATA.INVITE.channel.name,
          parent_id: TEST_DATA.INVITE.channel.parent_id,
          position: 0,
          rate_limit_per_user: TEST_DATA.INVITE.channel.rate_limit_per_user,
          topic: TEST_DATA.INVITE.channel.topic,
          type: TEST_DATA.INVITE.channel.type,
          rate_limit_per_user: 0,
          permission_overwrites: [],
        },
        uses: TEST_DATA.INVITE.uses,
        expires: new Date(TEST_DATA.INVITE.expires_at).getTime(),
        max_uses: TEST_DATA.INVITE.max_uses,
        inviter: {
          _cached: invite.inviter._cached,
          id: TEST_DATA.INVITE.inviter.id,
          username: TEST_DATA.INVITE.inviter.username,
          discriminator: TEST_DATA.INVITE.inviter.discriminator,
          avatar: TEST_DATA.INVITE.inviter.avatar,
          bot: TEST_DATA.INVITE.inviter.bot,
          global_name: TEST_DATA.INVITE.inviter.global_name,
        },
      });
      expect(invite.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        code: TEST_DATA.INVITE.code,
        channel: {
          _attributes: 0,
          _cacheOptions: 1023,
          id: TEST_DATA.INVITE.channel.id,
          messages: [],
          name: TEST_DATA.INVITE.channel.name,
          parent_id: TEST_DATA.INVITE.channel.parent_id,
          position: 0,
          rate_limit_per_user: TEST_DATA.INVITE.channel.rate_limit_per_user,
          topic: TEST_DATA.INVITE.channel.topic,
          type: TEST_DATA.INVITE.channel.type,
          rate_limit_per_user: 0,
          permission_overwrites: [],
        },
        uses: TEST_DATA.INVITE.uses,
        expires: new Date(TEST_DATA.INVITE.expires_at).getTime(),
        max_uses: TEST_DATA.INVITE.max_uses,
        inviter: {
          id: TEST_DATA.INVITE.inviter.id,
          username: TEST_DATA.INVITE.inviter.username,
          discriminator: TEST_DATA.INVITE.inviter.discriminator,
          avatar: TEST_DATA.INVITE.inviter.avatar,
          bot: TEST_DATA.INVITE.inviter.bot,
          global_name: TEST_DATA.INVITE.inviter.global_name,
        },
      });
      expect(invite.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        code: TEST_DATA.INVITE.code,
        channel: {
          id: TEST_DATA.INVITE.channel.id,
          messages: [],
          name: TEST_DATA.INVITE.channel.name,
          nsfw: TEST_DATA.INVITE.channel.nsfw,
          parent_id: TEST_DATA.INVITE.channel.parent_id,
          position: 0,
          rate_limit_per_user: TEST_DATA.INVITE.channel.rate_limit_per_user,
          topic: TEST_DATA.INVITE.channel.topic,
          type: TEST_DATA.INVITE.channel.type,
          rate_limit_per_user: 0,
          permission_overwrites: [],
        },
        uses: TEST_DATA.INVITE.uses,
        expires_at: new Date(
          ((new Date(TEST_DATA.INVITE.expires_at).getTime() / 1000) | 0) * 1000,
        ).toISOString(),
        max_uses: TEST_DATA.INVITE.max_uses,
        inviter: {
          id: TEST_DATA.INVITE.inviter.id,
          username: TEST_DATA.INVITE.inviter.username,
          discriminator: TEST_DATA.INVITE.inviter.discriminator,
          avatar: TEST_DATA.INVITE.inviter.avatar,
          bot: TEST_DATA.INVITE.inviter.bot,
          global_name: TEST_DATA.INVITE.inviter.global_name,
        },
      });
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Invite(client, invite.toJSON(), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.code).to.equal(invite.code);
      expect(rebundled.channelId).to.equal(invite.channelId);
      expect(rebundled.channel.id).to.equal(invite.channel.id);
      expect(rebundled.guildId).to.equal(invite.guildId);
      expect(rebundled.guild.id).to.equal(invite.guild.id);
      expect(rebundled.uses).to.equal(invite.uses);
      expect(rebundled.expires).to.equal(invite.expires);
      expect(rebundled.inviter.id).to.equal(invite.inviter.id);
      expect(rebundled.url).to.equal(invite.url);
      expect(rebundled.id).to.equal(invite.id);
      expect(rebundled.maxUses).to.equal(invite.maxUses);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Invite(
        client,
        invite.toJSON(JsonTypes.CACHE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.code).to.equal(invite.code);
      expect(rebundled.channelId).to.equal(invite.channelId);
      expect(rebundled.channel.id).to.equal(invite.channel.id);
      expect(rebundled.guildId).to.equal(invite.guildId);
      expect(rebundled.guild.id).to.equal(invite.guild.id);
      expect(rebundled.uses).to.equal(invite.uses);
      expect(rebundled.expires).to.equal(invite.expires);
      expect(rebundled.inviter.id).to.equal(invite.inviter.id);
      expect(rebundled.url).to.equal(invite.url);
      expect(rebundled.id).to.equal(invite.id);
      expect(rebundled.maxUses).to.equal(invite.maxUses);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Invite(
        client,
        invite.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.code).to.equal(invite.code);
      expect(rebundled.channelId).to.equal(invite.channelId);
      expect(rebundled.channel.id).to.equal(invite.channel.id);
      expect(rebundled.guildId).to.equal(invite.guildId);
      expect(rebundled.guild.id).to.equal(invite.guild.id);
      expect(rebundled.uses).to.equal(invite.uses);
      expect(rebundled.expires).to.equal(invite.expires);
      expect(rebundled.inviter.id).to.equal(invite.inviter.id);
      expect(rebundled.url).to.equal(invite.url);
      expect(rebundled.id).to.equal(invite.id);
      expect(rebundled.maxUses).to.equal(invite.maxUses);
    });
    it("should bundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Invite(
        client,
        invite.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.code).to.equal(invite.code);
      expect(rebundled.channelId).to.equal(invite.channelId);
      expect(rebundled.channel.id).to.equal(invite.channel.id);
      expect(rebundled.guildId).to.equal(invite.guildId);
      expect(rebundled.guild.id).to.equal(invite.guild.id);
      expect(rebundled.uses).to.equal(invite.uses);
      expect(rebundled.expires).to.equal(invite.expires);
      expect(rebundled.inviter.id).to.equal(invite.inviter.id);
      expect(rebundled.url).to.equal(invite.url);
      expect(rebundled.id).to.equal(invite.id);
      expect(rebundled.maxUses).to.equal(invite.maxUses);
    });
  });
});
//# sourceMappingURL=Invite.js.map
