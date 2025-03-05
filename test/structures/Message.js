import { expect } from "chai";
import { spy } from "sinon";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_MEMBERS,
  TEST_MESSAGES,
  TEST_ROLES,
} from "../../src/testData.js";
import FileUpload from "../../src/util/builder/fileUpload.js";
import MessageComponents from "../../src/util/builder/messageComponents.js";
import path from "path";
import Embed from "../../src/util/builder/embedBuilder.js";
import {
  Message,
  MessageReactionManager,
  Poll,
  Guild,
} from "../../src/structures.js";
import { JsonTypes } from "#typings/enums.js";

describe("Message", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Message).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
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
      expect(message).to.have.property("delete");
      expect(message).to.have.property("hashName");
      expect(message).to.have.property("encrypt");
      expect(message).to.have.property("toString");
      expect(message).to.have.property("toJSON");
    });
    it("should have the correct static structure", function () {
      expect(Message).to.have.property("getHashName");
      expect(Message).to.have.property("decrypt");
      expect(Message).to.have.property("shouldCache");
      expect(Message).to.have.property("getUrl");
      expect(Message).to.have.property("delete");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.id).to.equal(TEST_DATA.MESSAGE.id);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.type).to.equal(TEST_DATA.MESSAGE.type);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.guild).to.deep.equal(guild);
      expect(message.guild).to.be.an.instanceOf(Guild);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.channelId).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });

  context("check channel", function () {
    it("should have the correct channel", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.channel.id).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });

  context("check author", function () {
    it("should have the correct author", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.author.id).to.equal(TEST_DATA.MESSAGE.author.id);
    });
  });

  context("check content", function () {
    it("should have the correct content", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.content).to.equal(TEST_DATA.MESSAGE.content);
    });
  });

  context("check timestamp", function () {
    it("should have the correct timestamp", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.timestamp).to.equal(1449504684);
    });
  });

  context("check editedTimestamp", function () {
    it("should have the correct editedTimestamp", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.editedTimestamp).to.equal(1640995200);
    });
  });

  context("check mentionEveryone", function () {
    it("should have the correct mentionEveryone", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.mentionEveryone).to.equal(true);
    });
  });

  context("check mentions", function () {
    it("should have the correct mentions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.mentions).to.equal(true);
    });
  });

  context("check mentionRoles", function () {
    it("should have the correct mentionRoles", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.mentionRoles).to.equal(true);
    });
  });

  context("check attachments", function () {
    it("should have the correct attachments", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.attachments).to.deep.equal([{}]);
    });
  });

  context("check embeds", function () {
    it("should have the correct embeds", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.embeds).to.deep.equal([
        {
          color: TEST_DATA.MESSAGE.embeds[0].color,
          description: TEST_DATA.MESSAGE.embeds[0].description,
          fields: [
            {
              name: TEST_DATA.MESSAGE.embeds[0].fields[0].name,
              value: TEST_DATA.MESSAGE.embeds[0].fields[0].value,
              inline: TEST_DATA.MESSAGE.embeds[0].fields[0].inline,
            },
          ],
          footer: {
            text: TEST_DATA.MESSAGE.embeds[0].footer.text,
          },
          image: {
            url: TEST_DATA.MESSAGE.embeds[0].image.url,
          },
          thumbnail: {
            url: TEST_DATA.MESSAGE.embeds[0].thumbnail.url,
          },
          timestamp: new Date(TEST_DATA.MESSAGE.embeds[0].timestamp).getTime(),
          title: TEST_DATA.MESSAGE.embeds[0].title,
          url: TEST_DATA.MESSAGE.embeds[0].url,
          video: {
            url: TEST_DATA.MESSAGE.embeds[0].video.url,
          },
        },
      ]);
    });
  });

  context("check reference", function () {
    it("should have the correct reference", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.reference).to.deep.equal({
        messageId: "123456339013345678",
      });
    });
  });

  context("check poll", function () {
    it("should have the correct poll", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.poll).to.be.an.instanceOf(Poll);
    });
  });

  context("check reactions", function () {
    it("should have the correct reactions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.reactions).to.be.an.instanceOf(MessageReactionManager);
    });
  });

  context("check pinned", function () {
    it("should have the correct pinned", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.pinned).to.equal(true);
    });
  });

  context("check member", function () {
    it("should have the correct member", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.member.id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check mirrored", function () {
    it("should have the correct mirrored", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.mirrored).to.equal(false);
    });
  });

  context("check webhookId", function () {
    it("should have the correct webhookId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.webhookId).to.equal(TEST_DATA.MESSAGE.webhook_id);
    });
  });

  context("check stickerItems", function () {
    it("should have the correct stickerItems", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.stickerItems).to.deep.equal([{}]);
    });
  });

  context("check messageSnapshots", function () {
    it("should have the correct messageSnapshots", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.messageSnapshots).to.deep.equal(
        TEST_DATA.MESSAGE.message_snapshots.map(
          (snapshot) =>
            new Message(client, snapshot, {
              channelId: TEST_DATA.CHANNEL_ID,
              guildId: TEST_DATA.GUILD_ID,
            }),
        ),
      );
    });
  });

  context("check url", function () {
    it("should have the correct url", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.reply).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.reply({ content: "test" })).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    it("should throw an error if no input is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.reply()).to.be.rejectedWith(
        Error,
        "GLUON: Must provide content, embeds, components or files",
      );
    });
    it("should throw an error if content is provided but not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.reply({ content: {} })).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string",
      );
    });
    it("should throw an error if embeds is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(
        message.reply({ content: "test", embeds: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Embeds must be an array");
    });
    it("should throw an error if components is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(
        message.reply({ content: "test", components: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Components must be an array");
    });
    it("should throw an error if files is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(
        message.reply({ content: "test", files: 123 }),
      ).to.be.rejectedWith(TypeError, "GLUON: Files must be an array");
    });
    it("should not throw an error if content is provided as a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.reply({ content: "test" })).to.not.be.rejected;
    });
    it("should not throw an error if embeds is provided as an array of embeds", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.reply({ content: "test", embeds: [new Embed()] })).to
        .not.be.rejected;
    });
    it("should not throw an error if components is provided as a message components class", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const components = new MessageComponents();
      await expect(message.reply({ content: "test", components })).to.not.be
        .rejected;
    });
    it("should not throw an error if files is provided as an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const file = new FileUpload()
        .setName("test.txt")
        .setPath(path.join(process.cwd(), "media", "quark.png"));
      await expect(message.reply({ content: "test", files: [file] })).to.not.be
        .rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const request = spy(client.request, "makeRequest");
      await message.reply({ content: "test" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("postCreateMessage", [
        TEST_DATA.CHANNEL_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check edit", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.edit).to.be.a("function");
    });
    it("should throw an error if bot permissions are insufficient", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ content: "test" })).to.be.rejectedWith(
        Error,
        "MISSING PERMISSIONS: SEND_MESSAGES",
      );
    });
    // it("should throw an error if no input is provided", async function () {
    //   const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    //   TEST_GUILDS.ALL_CACHES_ENABLED(client);
    //   TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    //   TEST_ROLES.GENERIC_ADMIN_ROLE(client);
    //   TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
    //   TEST_MEMBERS.CLIENT_MEMBER(client);
    //   const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
    //   await expect(message.edit()).to.be.rejectedWith(
    //     Error,
    //     "GLUON: Must provide content, embeds, components or files",
    //   );
    // });
    it("should throw an error if content is provided but not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ content: {} })).to.be.rejectedWith(
        TypeError,
        "GLUON: Content must be a string",
      );
    });
    it("should throw an error if embeds is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ embeds: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Embeds must be an array",
      );
    });
    it("should throw an error if components is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ components: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Components must be an array",
      );
    });
    it("should throw an error if files is provided but not an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ files: 123 })).to.be.rejectedWith(
        TypeError,
        "GLUON: Files must be an array",
      );
    });
    it("should not throw an error if content is provided as a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ content: "test" })).to.not.be.rejected;
    });
    it("should not throw an error if embeds is provided as an array of embeds", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      await expect(message.edit({ embeds: [new Embed()] })).to.not.be.rejected;
    });
    it("should not throw an error if components is provided as a message components class", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const components = new MessageComponents();
      await expect(message.edit({ components })).to.not.be.rejected;
    });
    it("should not throw an error if files is provided as an array", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const file = new FileUpload()
        .setName("test.txt")
        .setPath(path.join(process.cwd(), "media", "quark.png"));
      await expect(message.edit({ files: [file] })).to.not.be.rejected;
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const request = spy(client.request, "makeRequest");
      await message.edit({ content: "test" });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("patchEditMessage", [
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE.id,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check hashName", function () {
    it("should return the correct hashName", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.hashName).to.equal(
        "f5c5c86b4cb6ccf0e4aadf5d80eecb8bc19f005225ae37c856f95b50b02bad4482cbff6a2ca6a0a411eec7cc82e9c1ac654cc9d44c2f1c87f07d90b88da025b8",
      );
    });
  });

  context("check encrypt", function () {
    it("should return the correct encrypted message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const encrypted = message.encrypt();
      expect(encrypted).to.equal(
        "D7VouuLdNv/GOhSZHlt6sW6b3/LIoNHYIMOjkFzFgpw10SAjFZ6eeQXF6/mxBxgG4zC1h1GwI5dvCFA3LLnQrqXB/ToylQte2qiNhwAZ5oKWFbrE8YYCjGMGfIRA9cwIENjWytyYmbcE529uleVWsj0yIl9rfzSHLE/LrslM9cqXdnqP6MyThBw201H+4Wr0pTp9ODtnnGAp59S5gMYfAW6+aw77wsSJCgjWQnsXWV11SWa1ia12Q6ftXsvwKr7nAbAeYvA8ulfTvGhRWYsL6a9XhlTgjjjj7V4nMptpiROOX5wqoRBorA5ajMjIus+hLSI8MYohjUY/dvy+P/DsMqif91yaCq00DbVGxq7bISenTYrQxeh4NKUbZgwgMwM7Mioun85T7qTdLWvmCQ/EbfqbT9KbKj+WtqdNVUOtnVw9Zth7rJlQL0RPm03Oq0IULhFXpFlBOcOqKsGPmsURA5Oxt8KQbUS1j4aFjQI0n0eHq3ZJBF/3vdO3KsgEs1WnccwjC8F1x1PlaVD8q2Ll6c5dukhS+FBgFJE8SvpNCuqvdOIGdZndcM8Gk/1HXePSeYP7JiTw4Yg5kFU9qMazHMQ50CUYui3rQhEKkHOL4IYsOjHfVE/h+pYJB7aYriBtipYnJR5VhVZia3+gf83/5LECrHte9UofR3RXQMViSRDjeXP3MIT0qYxRnsIIioV28dKYWCunO1MHNPY8zb9ic0eHhXM9uXXs4logcSJfq1mjsclMJ4KkxGyzaT7mG7e1Azbp153909seNWQrw7XFkLmB+XYTNOx2QlkaEcdAvXM/QSzAehezCdWl7kJsZdBsSLB+1xLNkaqhhPqAJpKL1Vs8KSP5BbhA5Um4rM0aDH+7EY/aBwq2AlTM2qulB8WN5ev/L87W2zK1CQAbUc9hUFhQ3SDSA3BHpP4egRbixuQHFc908yhtcaC3Ss6fKVziqFtcQYPpqRKVxQa4Rv8b9FU+cFseeVdRUPz2IiHXw/j2tQ9vJKKsdSHbW8JerHctDaDTPunC8KiMp3dlsBW2V4U2A3yLae2SmoRp+u1c9P7fxKHUdAM72h3Vj58pH9CS/3xaSswsTPo0TpOZV+SizeI4/dYRMdLbs2ifAxBQ0QDELl/ZN1pGuENNQJtoD+nH5Vh8UczfOVJhODaT0OJVggv0Ah8EADNrntyv/Nf5bFkTOoizobfBuNIt/AxhSPXfJDMl842950sOF/2SjZ+SbIPo97WnpW75BtPvYIoXAhYHayOpYOI6i/bpTOZC62FdhXlHBL7mvTh8R0lXuHQzCg1+a+nLQJjbtDmk83aaw5FvTwjhr/nqsgjt88vKZdOpcaeZswhTyzRewkiLgu5SYYFIZsrWXVEnH9n/cSB5NkdtdTUD9dSriCJwHGYZ0jItVkFHT0r96y/j/UvrCXT47NsMV+RmUR/8KPBuE8DHtC2ETlqkwmI09Rev/KmM+oZzyOl3MglWz5/VITWUVGBl0C5X6Wx68wC2C2CgPe2J/fYx2JhG/WBDsnFPf56u8wFNgglurfvba6pAxOxpUU49JJoc61blM7p+tLCQfDC23HtZ3DgtdXmrDzNeaFFahosePO0r9MHiWPH21lHqPAGWsAogkSkQy5PYaU0sCUeZWGu2woG6CMAUarTxE4TfhozuZnfBED574bJnN9cgrYIleR6fMqAjfYx3f9Kkc1HYxNbEnbScZWTSry2DGRmE0NWvFafSEQZ4atD10fxgGqFiXsDF601pO37FUmbzaQx5qf+BSbf/kJ2EGnIrLJB7Ib+1/d9EIe+2evhp9TS56ZMyhDu5NmK/2kAe0cG/poJ4u/Vv9Mr0/ZzAvHLuc2TZUSuKmYymF5LcEFeuFStRbOIGZQCcBzkcWe1h1gthLv7QNz50v3sheweba6pMjNvbqqJUtvNKG9D/RuvGxsbuWUZ8FxFCefxCGUd/U/j5JzWZjVvFJQpUeX30gAXPbterR4vnM0I++V1XjT1Pocs3JJNRzhN7r/2anpLYvq6y8KWbINeKsd9CMyGd4H+gTCEwMGp43W0d7VQMwEUTSl79q2s7i/kD3jhvx//9Kn3KesdqCTZ733GIF/Du2NJIMpH6un0Vm1MZKmXcLZt4A7q5Gb6e64P6s85fwCE2Hr1s4w6vJb+sxNGKlpjZQ29/sT/biGSigUr64bSVOtJV+gcemZ4E4a1BE4zCHrGIuznoBJ8KUDho+A3oggQvvh8eX/2gin2H5rM7m4VFe5XC0YJHJCuTe/t29LjYdoHGCc2YjNKMH5pQ/WQsTK5Rs4+AowI1nVkeOusJvug2u6q+5PnZLp4TI5eAuJ7lpozuEcmy3/UhX1QKsFBqe1jxPNaJsg8nSGe488OUahnjiY6sGdTpmIHuzlQzB66VbiwJl4VnSG8smOPPoRZr75kVsg4WfqYv5oarJmYkEqqut1YBF3P3g/BELVVIP0/tfcOMDAoroabD6P7viuLR/TBGvCoFoVNolBUHZfFit1Mhmp0v9+WtKaIaBEAjBR+Os/EIBmXGNplcxHf0SKOu6GxWVaudsqh6dqFb",
      );
    });
  });

  context("check decrypt", function () {
    it("should return the correct decrypted message", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const decrypted = Message.decrypt(
        client,
        "D7VouuLdNv/GOhSZHlt6sW6b3/LIoNHYIMOjkFzFgpw10SAjFZ6eeQXF6/mxBxgG4zC1h1GwI5dvCFA3LLnQrqXB/ToylQte2qiNhwAZ5oKWFbrE8YYCjGMGfIRA9cwIENjWytyYmbcE529uleVWsj0yIl9rfzSHLE/LrslM9cpTOXYv3NBN50cKvYTDaeNfx1T2kFwlE3jlqjNxKBQYKGeyoB0wqvnrjyLgOxa4jhdPnb/95ZHUa30tGiwqbDW4Is0KOBdxePJ5NVxok9fGWFqaFPGG3bmY1Ln2Oz5qTAkPDsqlYFY0mna+gEsk0o1AggRJ6Bru4xHH1g09S7CPKHmD2DkbF/gVVm3HI5h7v4mPZfwAtFBXn6rCySl3QrQ+TaU9/pafwmkOaKIkQAkcC8I7q6O4C9EEalBBHheu1jFlLE2Y1Gz2SZRNjwopARIeCS7bT/03Llm1XVv8pVd60vicMkLw41yoTnlJsPgQ+RZ4Xwa5eW9aofk6U+yHGzyV+x8V57s4gIPpX7rcLBWXBk60El2amyJHWVsWf6DJfFyk6c52U8yHoK4HnlJL52Dqx7R6vYa1on2UzJcOVBh9UQHdXIiOCKAxq1+sn8iiX2KqGHXo/JhHnRkMTJOULeH3XEkGItaDe3y5zweHHIhj0W/dnHwUslv+pYcr9hR6kYBZVpYerHtQdCVuYdnNcyCBF+iwKgvoX+1AqyJsJlUT7/En5xXScnrZNxRjh/ZCdrRHLAOS19uQfzfNto39XaAtEWb8kdBQMpL1TRsj35E7YJCqgSMkRqsCjnva5E6qawcRU/RfxLNMikcO7Yyq3pqYA5Xy34xkLpCSgSBS1mGNt/maHyxOAVt2LVA74pb0cATC9GcB7irqj57ayTZ3msuyjbY613ArY+/0xfju+GHf2yQBASrLYa5LL3nmtoCzrsWQzbdLIdv+XdVckriqs4uNk1k7wvZs4mawJnNhhIeU2fxKxin99rHOU4exmbbUMVqeWoMb8BkgKLO6Cn1BUU6IPS4t8YY8n9Y34m4cRJ9k2pKXfjHGgbzWRAaTBxx7I0WMZFnX2oLSmaiv3mT8hcBhDWEMyHhYOrNGjLgY+sEJiK50POisCJNC0rsq7aNbNvP8r/wjjLyEwcdEsItbeKwZhYuoAcynWODHM6slOT+IPfXVhtSB85vK8JgYcrfK1r2aO16vf01c7ZHCMuthNsZ8U8xw9iLW/R7ouyH4zzM1DnVQ1QiiBdzCh6SKpSWsMOsQTLrLqrmRHoZR5zMw9ZbPaZgJ6y/pIEpXSHNJWMCNub3qg/VoYjrQmU7NnyIbLjW0ktwlrjIssd1QTJysv7kcAuj4dGRKs0V1Vw9D/aMgh6T6WggHyYxivWCa33pDeMf57HT7hy3lUYf44PL+5p4WMb7yxkhABhdDd3okOpZvD77o2XnHr8acOLA8xoYOSfFKmc0FTau8qrVN88R7bIe/X/VGGLut/G2gK0Ibt4i8eEgx8TRwGbMh2odHxj9ANveZj0U4gxkA1x9x2k0dmDLxFhtpcCZACgjVA4mQOTrux4SZ8vYkKT3/EByC3R8TCPl44hymlAldWGjcoMqGiqS1rfibaQXFy4p/pYGgTVrItwX5w4XLIoUIblScQPjKeXV4TbACt9BtDGXVRUb4REDc8ufDvNdDHlddcjVv633gwQdgi39vXKflrxed+mfOsWIiI5DZRKL/gCVh2s1EzpnZF875enjnH64KxVSQsjlx7k0wL31J6oFSxuiMNlAXrtEJxZkkCouklQ/Hl+9ub9x5nofQsZhwo/TW22G6x9ljmBeXdWRjMDyULNwZoZzOCCmqMcNZY//jIADjRW5mqF/J4hx2lpj5RT8nKGTv5RChiDk5M3NF/lUXsXOplpDvyr89RXkB9tXvFwXQjkNemiujUjc3maTjD4ppmXqiqe8WUIN5usXy1Xhs7Bj3LL7W++U=",
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE_ID,
      );
      expect(decrypted.id).to.equal(TEST_DATA.MESSAGE_ID);
    });
  });

  context("check getUrl", function () {
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

  context("check delete", function () {
    it("should throw an error if client is not an instance of Client", async function () {
      await expect(Message.delete()).to.be.rejectedWith(
        Error,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guildId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(Message.delete(client, 123)).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID is not a string.",
      );
    });
    it("should throw an error if channelId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        Message.delete(client, TEST_DATA.GUILD_ID, 123),
      ).to.be.rejectedWith(TypeError, "GLUON: Channel ID is not a string.");
    });
    it("should throw an error if messageId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        Message.delete(client, TEST_DATA.GUILD_ID, TEST_DATA.CHANNEL_ID, 123),
      ).to.be.rejectedWith(TypeError, "GLUON: Message ID is not a string.");
    });
    it("should throw an error if reason is provided but not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(
        Message.delete(
          client,
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.MESSAGE_ID,
          { reason: 123 },
        ),
      ).to.be.rejectedWith(TypeError, "GLUON: Reason is not a string.");
    });
    it("should throw an error if the client user does not have the MANAGE_MESSAGES permission", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      await expect(
        Message.delete(
          client,
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.MESSAGE_ID,
        ),
      ).to.be.rejectedWith(Error, "MISSING PERMISSIONS: MANAGE_MESSAGES");
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await Message.delete(
        client,
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE_ID,
      );
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("deleteChannelMessage", [
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.an("object");
    });
  });

  context("check shouldCache", function () {
    it("should return true if message caching is enabled", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(
        Message.shouldCache(
          client._cacheOptions,
          guild._cacheOptions,
          channel._cacheOptions,
        ),
      ).to.be.true;
    });
    it("should return false if message caching is disabled for the client", function () {
      const client = TEST_CLIENTS.NO_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(
        Message.shouldCache(
          client._cacheOptions,
          guild._cacheOptions,
          channel._cacheOptions,
        ),
      ).to.be.false;
    });
    it("should return false if message caching is disabled for the guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.NO_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      expect(
        Message.shouldCache(
          client._cacheOptions,
          guild._cacheOptions,
          channel._cacheOptions,
        ),
      ).to.be.false;
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.toString()).to.equal(`<Message: ${TEST_DATA.MESSAGE_ID}>`);
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.toJSON).to.be.a("function");
    });
    it("should return an object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.toJSON()).to.be.an("object");
    });
    it("should return the correct object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
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
            footer: {
              text: TEST_DATA.MESSAGE.embeds[0].footer.text,
            },
            image: {
              url: TEST_DATA.MESSAGE.embeds[0].image.url,
            },
            thumbnail: {
              url: TEST_DATA.MESSAGE.embeds[0].thumbnail.url,
            },
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
          answers: TEST_DATA.MESSAGE.poll.answers,
          expiry: new Date(TEST_DATA.MESSAGE.poll.expiry).toISOString(),
          layout_type: 1,
          question: TEST_DATA.MESSAGE.poll.question,
          results: {
            answer_counts: [],
          },
        },
        message_snapshots: [
          {
            attachments: [],
            author: undefined,
            content: "test message @everyone",
            channel_id: TEST_DATA.CHANNEL_ID,
            mention_everyone: false,
            mention_roles: [],
            mentions: [],
            pinned: false,
            reactions: [],
            edited_timestamp: null,
            embeds: [],
            id: TEST_DATA.MESSAGE_ID,
            member: undefined,
            message_snapshots: undefined,
            poll: undefined,
            referenced_message: undefined,
            sticker_items: [],
            type: 0,
          },
        ],
        member: {
          avatar: TEST_DATA.MEMBER.user.avatar,
          communication_disabled_until:
            TEST_DATA.MEMBER.communication_disabled_until,
          flags: TEST_DATA.MEMBER.flags,
          joined_at: TEST_DATA.MEMBER.joined_at,
          nick: TEST_DATA.MEMBER.nick,
          pending: TEST_DATA.MEMBER.pending,
          roles: [],
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
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      expect(message.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 15,
        id: TEST_DATA.MESSAGE_ID,
        type: TEST_DATA.MESSAGE.type,
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
          _cached: message.author._cached,
          id: TEST_DATA.MESSAGE.author.id,
          username: TEST_DATA.MESSAGE.author.username,
          discriminator: TEST_DATA.MESSAGE.author.discriminator,
          avatar: TEST_DATA.MESSAGE.author.avatar,
          bot: TEST_DATA.MESSAGE.author.bot,
          global_name: TEST_DATA.MESSAGE.author.global_name,
        },
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
            timestamp: new Date(
              TEST_DATA.MESSAGE.embeds[0].timestamp,
            ).getTime(),
            footer: {
              text: TEST_DATA.MESSAGE.embeds[0].footer.text,
            },
            image: {
              url: TEST_DATA.MESSAGE.embeds[0].image.url,
            },
            thumbnail: {
              url: TEST_DATA.MESSAGE.embeds[0].thumbnail.url,
            },
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
          answers: TEST_DATA.MESSAGE.poll.answers,
          expiry: new Date(TEST_DATA.MESSAGE.poll.expiry).getTime(),
          layout_type: 1,
          question: TEST_DATA.MESSAGE.poll.question,
          _results: {},
        },
        message_snapshots: [
          {
            _attributes: 0,
            attachments: [],
            author: undefined,
            content: "test message @everyone",
            edited_timestamp: null,
            embeds: [],
            id: TEST_DATA.MESSAGE_ID,
            member: undefined,
            messageReactions: {},
            message_snapshots: undefined,
            poll: undefined,
            referenced_message: undefined,
            sticker_items: [],
            type: 0,
          },
        ],
        member: {
          _attributes: 0,
          avatar: TEST_DATA.MEMBER.user.avatar,
          communication_disabled_until:
            TEST_DATA.MEMBER.communication_disabled_until,
          flags: TEST_DATA.MEMBER.flags,
          joined_at: new Date(TEST_DATA.MEMBER.joined_at).getTime(),
          nick: TEST_DATA.MEMBER.nick,
          roles: [],
          permissions: "8",
          user: {
            _cached: message.member.user._cached,
            avatar: TEST_DATA.MEMBER.user.avatar,
            bot: TEST_DATA.MEMBER.user.bot,
            discriminator: TEST_DATA.MEMBER.user.discriminator,
            global_name: TEST_DATA.MEMBER.user.global_name,
            id: TEST_DATA.MEMBER.user.id,
            username: TEST_DATA.MEMBER.user.username,
          },
        },
        messageReactions: {},
      });
      expect(message.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 15,
        id: TEST_DATA.MESSAGE_ID,
        type: TEST_DATA.MESSAGE.type,
        content: TEST_DATA.MESSAGE.content,
        attachments: [
          {
            id: TEST_DATA.MESSAGE.attachments[0].id,
            filename: TEST_DATA.MESSAGE.attachments[0].filename,
            size: TEST_DATA.MESSAGE.attachments[0].size,
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
            timestamp: new Date(
              TEST_DATA.MESSAGE.embeds[0].timestamp,
            ).getTime(),
            footer: {
              text: TEST_DATA.MESSAGE.embeds[0].footer.text,
            },
            image: {
              url: TEST_DATA.MESSAGE.embeds[0].image.url,
            },
            thumbnail: {
              url: TEST_DATA.MESSAGE.embeds[0].thumbnail.url,
            },
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
          answers: TEST_DATA.MESSAGE.poll.answers,
          expiry: new Date(TEST_DATA.MESSAGE.poll.expiry).getTime(),
          layout_type: 1,
          question: TEST_DATA.MESSAGE.poll.question,
          _results: {},
        },
        message_snapshots: [
          {
            _attributes: 0,
            attachments: [],
            author: undefined,
            content: "test message @everyone",
            edited_timestamp: null,
            embeds: [],
            id: TEST_DATA.MESSAGE_ID,
            member: undefined,
            messageReactions: {},
            message_snapshots: undefined,
            poll: undefined,
            referenced_message: undefined,
            sticker_items: [],
            type: 0,
          },
        ],
        member: {
          _attributes: 0,
          avatar: TEST_DATA.MEMBER.user.avatar,
          communication_disabled_until:
            TEST_DATA.MEMBER.communication_disabled_until,
          flags: TEST_DATA.MEMBER.flags,
          joined_at: new Date(TEST_DATA.MEMBER.joined_at).getTime(),
          nick: TEST_DATA.MEMBER.nick,
          roles: [],
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
        messageReactions: {},
      });
      expect(message.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
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
            footer: {
              text: TEST_DATA.MESSAGE.embeds[0].footer.text,
            },
            image: {
              url: TEST_DATA.MESSAGE.embeds[0].image.url,
            },
            thumbnail: {
              url: TEST_DATA.MESSAGE.embeds[0].thumbnail.url,
            },
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
          answers: TEST_DATA.MESSAGE.poll.answers,
          expiry: new Date(TEST_DATA.MESSAGE.poll.expiry).toISOString(),
          layout_type: 1,
          question: TEST_DATA.MESSAGE.poll.question,
          results: {
            answer_counts: [],
          },
        },
        message_snapshots: [
          {
            attachments: [],
            author: undefined,
            content: "test message @everyone",
            edited_timestamp: null,
            embeds: [],
            id: TEST_DATA.MESSAGE_ID,
            member: undefined,
            mention_everyone: false,
            mention_roles: [],
            mentions: [],
            channel_id: TEST_DATA.CHANNEL_ID,
            message_snapshots: undefined,
            poll: undefined,
            referenced_message: undefined,
            sticker_items: [],
            reactions: [],
            pinned: false,
            type: 0,
          },
        ],
        member: {
          avatar: TEST_DATA.MEMBER.user.avatar,
          communication_disabled_until:
            TEST_DATA.MEMBER.communication_disabled_until,
          flags: TEST_DATA.MEMBER.flags,
          joined_at: TEST_DATA.MEMBER.joined_at,
          nick: TEST_DATA.MEMBER.nick,
          pending: TEST_DATA.MEMBER.pending,
          roles: [],
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
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const rebundled = new Message(client, message.toJSON(), {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
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
    it("should rebundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const rebundled = new Message(
        client,
        message.toJSON(JsonTypes.CACHE_FORMAT),
        {
          channelId: TEST_DATA.CHANNEL_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
    it("should rebundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const rebundled = new Message(
        client,
        message.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          channelId: TEST_DATA.CHANNEL_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
    it("should rebundle correctly with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_MEMBERS.GENERIC_MEMBER(client);
      const message = TEST_MESSAGES.GENERIC_MESSAGE(client);
      const rebundled = new Message(
        client,
        message.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          channelId: TEST_DATA.CHANNEL_ID,
          guildId: TEST_DATA.GUILD_ID,
        },
      );
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
