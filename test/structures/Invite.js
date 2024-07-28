import { expect } from "chai";
import { INVITE_BASE_URL, TEST_DATA } from "../../src/constants.js";
import Invite from "../../src/structures/Invite.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";

describe("Invite", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Invite).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
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
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.code).to.equal(TEST_DATA.INVITE.code);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.guildId).to.equal(TEST_DATA.INVITE.guild_id);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.channelId).to.equal(TEST_DATA.INVITE.channel.id);
    });
  });

  context("check uses", function () {
    it("should have the correct uses", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.uses).to.equal(TEST_DATA.INVITE.uses);
    });
  });

  context("check expires", function () {
    it("should have the correct expires", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.expires).to.equal(
        (new Date(TEST_DATA.INVITE.expires_at).getTime() / 1000) | 0,
      );
    });
  });

  context("check inviter", function () {
    it("should have the correct inviter", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.inviter.id).to.equal(TEST_DATA.INVITE.inviter.id);
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.id).to.equal(TEST_DATA.INVITE.code);
    });
  });

  context("check url", function () {
    it("should have the correct url", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.url).to.equal(
        `${INVITE_BASE_URL}/${TEST_DATA.INVITE.code}`,
      );
    });
  });

  context("check maxUses", function () {
    it("should have the correct maxUses", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.maxUses).to.equal(TEST_DATA.INVITE.max_uses);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.guildId).to.equal(TEST_DATA.INVITE.guild_id);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.guild.id).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = {};
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.toString()).to.be.a("string");
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(invite.toJSON()).to.deep.equal({
        code: TEST_DATA.INVITE.code,
        channel: {},
        uses: TEST_DATA.INVITE.uses,
        expires: (new Date(TEST_DATA.INVITE.expires_at).getTime() / 1000) | 0,
        max_uses: TEST_DATA.INVITE.max_uses,
        inviter: {},
      });
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const invite = new Invite(client, TEST_DATA.INVITE, {
        guild_id: TEST_DATA.GUILD_ID,
      });

      const rebundled = new Invite(client, invite.toJSON(), {
        guild_id: TEST_DATA.GUILD_ID,
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
  });
});
