import { expect } from "chai";
import { spy, match } from "sinon";
import Channel from "../../src/structures/Channel.js";
import { TEST_DATA } from "../../src/constants.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import ChannelMessageManager from "../../src/managers/ChannelMessageManager.js";
import ChannelCacheOptions from "../../src/managers/ChannelCacheOptions.js";
import User from "../../src/structures/User.js";
import Member from "../../src/structures/Member.js";
import Role from "../../src/structures/Role.js";

describe("Channel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Channel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
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
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.id).to.equal(TEST_DATA.TEXT_CHANNEL.id);
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.name).to.equal(TEST_DATA.TEXT_CHANNEL.name);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.type).to.equal(TEST_DATA.TEXT_CHANNEL.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.guildId).to.equal(TEST_DATA.TEXT_CHANNEL.guild_id);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.mention).to.equal(`<#${TEST_DATA.TEXT_CHANNEL.id}>`);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.guild).to.be.an.instanceOf(Guild);
    });
  });

  context("check parentId", function () {
    it("should have the correct parentId", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.parentId).to.equal(TEST_DATA.TEXT_CHANNEL.parent_id);
    });
  });

  context("check parent", function () {
    it("should have the correct parent", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.parent).to.be.null;
    });
  });

  context("check rateLimitPerUser", function () {
    it("should have the correct rateLimitPerUser", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.rateLimitPerUser).to.equal(
        TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
      );
    });
  });

  context("check nsfw", function () {
    it("should have the correct nsfw", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.nsfw).to.equal(TEST_DATA.TEXT_CHANNEL.nsfw);
    });
  });

  context("check topic", function () {
    it("should have the correct topic", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.topic).to.equal(TEST_DATA.TEXT_CHANNEL.topic);
    });
  });

  context("check _cacheOptions", function () {
    it("should have the correct _cacheOptions", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel._cacheOptions).to.be.an.instanceOf(ChannelCacheOptions);
    });
  });

  context("check messages", function () {
    it("should have the correct messages", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.messages).to.be.an.instanceOf(ChannelMessageManager);
    });
  });

  context("check toString", function () {
    it("should have the correct toString", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.toString()).to.equal(
        `<Channel: ${TEST_DATA.TEXT_CHANNEL.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should have the correct toJSON", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.toJSON()).to.deep.equal({
        id: TEST_DATA.TEXT_CHANNEL.id,
        name: TEST_DATA.TEXT_CHANNEL.name,
        type: TEST_DATA.TEXT_CHANNEL.type,
        parent_id: TEST_DATA.TEXT_CHANNEL.parent_id,
        rate_limit_per_user: TEST_DATA.TEXT_CHANNEL.rate_limit_per_user,
        topic: TEST_DATA.TEXT_CHANNEL.topic,
        _attributes: 0,
        _cacheOptions: {},
        messages: {},
      });
    });
  });

  context("check send", function () {
    it("should be a function", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      expect(channel.send).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = { cacheMembers: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(channel.send()).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    it("should throw an error if no parameters are passed", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(channel.send()).to.be.rejectedWith(
        Error,
        "GLUON: No content, embeds, components or files provided.",
      );
    });
    it("should throw an error if content is not a string", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(channel.send(123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string.",
      );
    });
    it("should throw an error if suppressMentions is not a boolean", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(
        channel.send("test", { suppressMentions: 123 }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Suppress mentions must be a boolean.",
      );
    });
    it("should throw an error if embeds is not an array", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(channel.send("test", { embeds: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array of embeds.",
      );
    });
    it("should throw an error if embeds is not an array of embeds", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(
        channel.send("test", { embeds: ["test"] }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array of embeds.",
      );
    });
    it("should throw an error if components is not an array", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(
        channel.send("test", { components: 123 }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Components must be an array of action rows.",
      );
    });
    it("should throw an error if components is not an array of components", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(
        channel.send("test", { components: ["test"] }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Components must be an array of action rows.",
      );
    });
    it("should throw an error if files is not an array", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(channel.send("test", { files: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Files must be an array of files.",
      );
    });
    it("should throw an error if files is not an array of files", async function () {
      const client = { cacheMembers: true, cacheRoles: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await expect(
        channel.send("test", { files: ["test"] }),
      ).to.be.rejectedWith(
        TypeError,
        "GLUON: Files must be an array of files.",
      );
    });
    it("should call makeRequest with the correct parameters", async function () {
      const client = {
        cacheMembers: true,
        cacheRoles: true,
        request: { makeRequest: async () => TEST_DATA.MESSAGE },
      };
      const request = spy(client.request, "makeRequest");
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.guilds.set(TEST_DATA.GUILD_ID, guild);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const channel = new Channel(client, TEST_DATA.TEXT_CHANNEL, {
        guild_id: TEST_DATA.TEXT_CHANNEL.guild_id,
      });
      await channel.send("test");
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postCreateMessage", [
        TEST_DATA.TEXT_CHANNEL.id,
      ]);
    });
  });
});
