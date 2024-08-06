import { expect } from "chai";
import { spy } from "sinon";
import { TEST_DATA } from "../../src/constants.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";
import Message from "../../src/structures/Message.js";
import cacheChannel from "../../src/util/gluon/cacheChannel.js";
import MessagePollManager from "../../src/managers/MessagePollManager.js";
import MessageReactionManager from "../../src/managers/MessageReactionManager.js";
import Member from "../../src/structures/Member.js";
import Role from "../../src/structures/Role.js";
import Poll from "../../src/structures/Poll.js";

describe("Message", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Message).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message).to.have.property("id");
      expect(message).to.have.property("type");
      expect(message).to.have.property("guildId");
      expect(message).to.have.property("guild");
      expect(message).to.have.property("channelId");
      expect(message).to.have.property("channel");
      expect(message).to.have.property("authorId");
      expect(message).to.have.property("author");
      expect(message).to.have.property("member");
      expect(message).to.have.property("content");
      expect(message).to.have.property("timestamp");
      expect(message).to.have.property("editedTimestamp");
      expect(message).to.have.property("mentionEveryone");
      expect(message).to.have.property("mentions");
      expect(message).to.have.property("mentionRoles");
      expect(message).to.have.property("attachments");
      expect(message).to.have.property("embeds");
      expect(message).to.have.property("reference");
      expect(message).to.have.property("poll");
      expect(message).to.have.property("reactions");
      expect(message).to.have.property("pinned");
      expect(message).to.have.property("mirrored");
      expect(message).to.have.property("webhookId");
      expect(message).to.have.property("stickerItems");
      expect(message).to.have.property("messageSnapshots");
      expect(message).to.have.property("url");
      expect(message).to.have.property("reply");
      expect(message).to.have.property("edit");
      expect(message).to.have.property("shelf");
      expect(message).to.have.property("toString");
      expect(message).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.id).to.equal(TEST_DATA.MESSAGE.id);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.type).to.equal(TEST_DATA.MESSAGE.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.guild).to.deep.equal(guild);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.channelId).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });

  context("check channel", function () {
    it("should have the correct channel", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.channel.id).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });

  context("check author", function () {
    it("should have the correct author", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.author.id).to.equal(TEST_DATA.MESSAGE.author.id);
    });
  });

  context("check content", function () {
    it("should have the correct content", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.content).to.equal(TEST_DATA.MESSAGE.content);
    });
  });

  context("check timestamp", function () {
    it("should have the correct timestamp", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.timestamp).to.equal(1449504684);
    });
  });

  context("check editedTimestamp", function () {
    it("should have the correct editedTimestamp", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.editedTimestamp).to.equal(1640995200);
    });
  });

  context("check mentionEveryone", function () {
    it("should have the correct mentionEveryone", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.mentionEveryone).to.equal(true);
    });
  });

  context("check mentions", function () {
    it("should have the correct mentions", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.mentions).to.equal(true);
    });
  });

  context("check mentionRoles", function () {
    it("should have the correct mentionRoles", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.mentionRoles).to.equal(true);
    });
  });

  context("check attachments", function () {
    it("should have the correct attachments", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.attachments).to.deep.equal([{}]);
    });
  });

  context("check embeds", function () {
    it("should have the correct embeds", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.embeds).to.deep.equal(TEST_DATA.MESSAGE.embeds);
    });
  });

  context("check reference", function () {
    it("should have the correct reference", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.reference).to.deep.equal({
        messageId: "123456339013345678",
      });
    });
  });

  context("check poll", function () {
    it("should have the correct poll", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.poll).to.be.an.instanceOf(Poll);
    });
  });

  context("check reactions", function () {
    it("should have the correct reactions", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.reactions).to.be.an.instanceOf(MessageReactionManager);
    });
  });

  context("check pinned", function () {
    it("should have the correct pinned", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.pinned).to.equal(true);
    });
  });

  context("check member", function () {
    it("should have the correct member", function () {
      const client = {
        cacheGuilds: true,
        cacheChannels: true,
        cacheMembers: true,
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.member.id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check mirrored", function () {
    it("should have the correct mirrored", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.mirrored).to.equal(false);
    });
  });

  context("check webhookId", function () {
    it("should have the correct webhookId", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.webhookId).to.equal(TEST_DATA.MESSAGE.webhook_id);
    });
  });

  context("check stickerItems", function () {
    it("should have the correct stickerItems", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.stickerItems).to.deep.equal([{}]);
    });
  });

  context("check messageSnapshots", function () {
    it("should have the correct messageSnapshots", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.messageSnapshots).to.deep.equal(
        TEST_DATA.MESSAGE.message_snapshots,
      );
    });
  });

  context("check url", function () {
    it("should have the correct url", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.url).to.equal(
        `https://discord.com/channels/${TEST_DATA.GUILD_ID}/${TEST_DATA.CHANNEL_ID}/${TEST_DATA.MESSAGE.id}`,
      );
    });
  });

  context("check getUrl", function () {
    it("should return the correct url", function () {
      expect(
        Message.getUrl(
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.MESSAGE_ID,
        ),
      ).to.equal(
        `https://discord.com/channels/${TEST_DATA.GUILD_ID}/${TEST_DATA.CHANNEL_ID}/${TEST_DATA.MESSAGE.id}`,
      );
    });
    it("should throw an error if no guildId is provided", function () {
      expect(() =>
        Message.getUrl(null, TEST_DATA.CHANNEL_ID, TEST_DATA.MESSAGE_ID),
      ).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
    it("should throw an error if no channelId is provided", function () {
      expect(() =>
        Message.getUrl(TEST_DATA.GUILD_ID, null, TEST_DATA.MESSAGE_ID),
      ).to.throw(TypeError, "GLUON: Channel ID must be a string.");
    });
    it("should throw an error if no messageId is provided", function () {
      expect(() =>
        Message.getUrl(TEST_DATA.GUILD_ID, TEST_DATA.CHANNEL_ID, null),
      ).to.throw(TypeError, "GLUON: Message ID must be a string.");
    });
  });

  context("check reply", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.reply).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test")).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    it("should throw an error if no input is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply()).to.be.rejectedWith(
        Error,
        "GLUON: Must provide content, embeds, components or files",
      );
    });
    it("should throw an error if content is provided but not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply({})).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string",
      );
    });
    it("should throw an error if embeds is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test", { embeds: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array",
      );
    });
    it("should throw an error if components is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(
        message.reply("test", { components: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Components must be an array");
    });
    it("should throw an error if files is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test", { files: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Files must be an array",
      );
    });
    it("should not throw an error if content is provided as a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test")).to.not.be.rejected;
    });
    it("should not throw an error if embeds is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test", { embeds: [{}] })).to.not.be.rejected;
    });
    it("should not throw an error if components is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test", { components: [{}] })).to.not.be
        .rejected;
    });
    it("should not throw an error if files is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.reply("test", { files: [{}] })).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      const request = spy(client.request, "makeRequest");
      await message.reply("test");
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postCreateMessage", [
        TEST_DATA.CHANNEL_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check edit", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.edit).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test")).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    it("should throw an error if no input is provided", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit()).to.be.rejectedWith(
        Error,
        "GLUON: Must provide content, embeds, components or files",
      );
    });
    it("should throw an error if content is provided but not a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit({})).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string",
      );
    });
    it("should throw an error if embeds is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test", { embeds: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array",
      );
    });
    it("should throw an error if components is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(
        message.edit("test", { components: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Components must be an array");
    });
    it("should throw an error if files is provided but not an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: { makeRequest: () => {} },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test", { files: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Files must be an array",
      );
    });
    it("should not throw an error if content is provided as a string", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test")).to.not.be.rejected;
    });
    it("should not throw an error if embeds is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test", { embeds: [{}] })).to.not.be.rejected;
    });
    it("should not throw an error if components is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test", { components: [{}] })).to.not.be
        .rejected;
    });
    it("should not throw an error if files is provided as an array", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      await expect(message.edit("test", { files: [{}] })).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = {
        cacheGuilds: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheRoles: true,
        request: {
          makeRequest: () => {
            return TEST_DATA.MESSAGE;
          },
        },
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Role(client, TEST_DATA.ROLE_ADMIN, { guild_id: TEST_DATA.GUILD_ID });
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      new Member(client, TEST_DATA.CLIENT_MEMBER, {
        user_id: TEST_DATA.CLIENT_MEMBER.user.id,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      const request = spy(client.request, "makeRequest");
      await message.edit("test");
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchEditMessage", [
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE.id,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check shelf", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.shelf).to.be.a("function");
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.toString()).to.equal(`<Message: ${TEST_DATA.MESSAGE_ID}>`);
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.toJSON).to.be.a("function");
    });
    it("should return an object", function () {
      const client = { cacheGuilds: true, cacheChannels: true };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.toJSON()).to.be.an("object");
    });
    it("should return the correct object", function () {
      const client = {
        cacheGuilds: true,
        cacheChannels: true,
        cacheMembers: true,
      };
      client.guilds = new GuildManager(client);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      expect(message.toJSON()).to.deep.equal({
        id: TEST_DATA.MESSAGE_ID,
        type: TEST_DATA.MESSAGE.type,
        channel_id: TEST_DATA.CHANNEL_ID,
        content: TEST_DATA.MESSAGE.content,
        attachments: [
          {
            id: TEST_DATA.MESSAGE.attachments[0].id,
            filename: TEST_DATA.MESSAGE.attachments[0].filename,
            size: TEST_DATA.MESSAGE.attachments[0].size,
            url: TEST_DATA.MESSAGE.attachments[0].url.slice(0, -1),
          },
        ],
        author: {
          id: TEST_DATA.MESSAGE.author.id,
          username: TEST_DATA.MESSAGE.author.username,
          discriminator: TEST_DATA.MESSAGE.author.discriminator,
          avatar: TEST_DATA.MESSAGE.author.avatar,
          bot: TEST_DATA.MESSAGE.author.bot,
          global_name: TEST_DATA.MESSAGE.author.global_name,
        },
        pinned: true,
        edited_timestamp:
          ((new Date(TEST_DATA.MESSAGE.edited_timestamp).getTime() / 1000) |
            0) *
          1000,
        embeds: [
          {
            title: TEST_DATA.MESSAGE.embeds[0].title,
            description: TEST_DATA.MESSAGE.embeds[0].description,
            url: TEST_DATA.MESSAGE.embeds[0].url,
            color: TEST_DATA.MESSAGE.embeds[0].color,
            timestamp: TEST_DATA.MESSAGE.embeds[0].timestamp,
            footer: TEST_DATA.MESSAGE.embeds[0].footer,
            image: TEST_DATA.MESSAGE.embeds[0].image,
            thumbnail: TEST_DATA.MESSAGE.embeds[0].thumbnail,
            video: TEST_DATA.MESSAGE.embeds[0].video,
            fields: TEST_DATA.MESSAGE.embeds[0].fields,
            author: TEST_DATA.MESSAGE.embeds[0].author,
          },
        ],
        sticker_items: [...TEST_DATA.MESSAGE.sticker_items],
        referenced_message: {
          id: TEST_DATA.MESSAGE.referenced_message.id,
        },
        poll: {
          allow_multiselect: TEST_DATA.MESSAGE.poll.allow_multiselect,
          answers: [],
          expiry: new Date(TEST_DATA.MESSAGE.poll.expiry).toISOString(),
          layout_type: undefined,
          question: TEST_DATA.MESSAGE.poll.question,
          results: {
            answer_counts: [],
          },
        },
        message_snapshots: TEST_DATA.MESSAGE.message_snapshots,
        member: {
          avatar: TEST_DATA.MEMBER.user.avatar,
          communication_disabled_until:
            TEST_DATA.MEMBER.communication_disabled_until,
          flags: TEST_DATA.MEMBER.flags,
          joined_at: TEST_DATA.MEMBER.joined_at,
          nick: TEST_DATA.MEMBER.nick,
          pending: TEST_DATA.MEMBER.pending,
          roles: undefined,
          permissions: "8",
          user: {
            avatar: TEST_DATA.MEMBER.user.avatar,
            bot: TEST_DATA.MEMBER.user.bot,
            discriminator: TEST_DATA.MEMBER.user.discriminator,
            global_name: TEST_DATA.MEMBER.user.global_name,
            id: TEST_DATA.MEMBER.user.id,
            username: TEST_DATA.MEMBER.user.username,
          },
        },
        reactions: [],
        mention_everyone: true,
        mention_roles: [""],
        mentions: [""],
      });
    });
  });

  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = {
        cacheGuilds: true,
        cacheChannels: true,
        cacheMembers: true,
      };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      cacheChannel(client, TEST_DATA.TEXT_CHANNEL, TEST_DATA.GUILD_ID);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        guild_id: TEST_DATA.GUILD_ID,
        channel_id: TEST_DATA.CHANNEL_ID,
      });
      const rebundled = new Message(client, message.toJSON(), {
        channel_id: TEST_DATA.CHANNEL_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(message.id);
      expect(rebundled.type).to.equal(message.type);
      expect(rebundled.content).to.equal(message.content);
      expect(rebundled.authorId).to.equal(message.authorId);
      expect(rebundled.author.toJSON()).to.deep.equal(message.author.toJSON());
      expect(rebundled.timestamp).to.equal(message.timestamp);
      expect(rebundled.editedTimestamp).to.equal(message.editedTimestamp);
      expect(rebundled.channelId).to.equal(message.channelId);
      expect(rebundled.channel.toJSON()).to.deep.equal(
        message.channel.toJSON(),
      );
      expect(rebundled.guildId).to.equal(message.guildId);
      expect(rebundled.guild.toJSON()).to.deep.equal(message.guild.toJSON());
      expect(rebundled.member.toJSON()).to.deep.equal(message.member.toJSON());
      expect(rebundled.reference.messageId).to.equal(
        message.reference.messageId,
      );
      expect(rebundled.attachments).to.deep.equal(message.attachments);
      expect(rebundled.embeds).to.deep.equal(message.embeds);
      expect(rebundled.mentions).to.equal(message.mentions);
      expect(rebundled.mentionEveryone).to.equal(message.mentionEveryone);
      expect(rebundled.mentionRoles).to.deep.equal(message.mentionRoles);
      expect(rebundled.poll).to.deep.equal(message.poll);
      expect(rebundled.pinned).to.equal(message.pinned);
      expect(rebundled.mirrored).to.equal(message.mirrored);
      expect(rebundled.webhookId).to.equal(message.webhookId);
      expect(rebundled.stickerItems).to.deep.equal(message.stickerItems);
      expect(rebundled.reactions.toJSON()).to.deep.equal(
        message.reactions.toJSON(),
      );
      expect(rebundled.messageSnapshots).to.deep.equal(
        message.messageSnapshots,
      );
      expect(rebundled.url).to.equal(message.url);
    });
  });
});
