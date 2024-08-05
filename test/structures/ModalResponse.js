import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import ModalResponse from "../../src/structures/ModalResponse.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("ModalResponse", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ModalResponse).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse).to.have.property("id");
      expect(modalResponse).to.have.property("type");
      expect(modalResponse).to.have.property("guildId");
      expect(modalResponse).to.have.property("channelId");
      expect(modalResponse).to.have.property("member");
      expect(modalResponse).to.have.property("values");
      expect(modalResponse).to.have.property("guild");
      expect(modalResponse).to.have.property("channel");
      expect(modalResponse).to.have.property("textPrompt");
      expect(modalResponse).to.have.property("autocompleteResponse");
      expect(modalResponse).to.have.property("reply");
      expect(modalResponse).to.have.property("edit");
      expect(modalResponse).to.have.property("acknowledge");
    });
  });

  context("check values", function () {
    it("should have the correct values", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.values).to.equal(
        TEST_DATA.MODAL_RESPONSE.data.components[0].components,
      );
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.toString()).to.equal(
        `<ModalResponse: ${TEST_DATA.MODAL_RESPONSE.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.toJSON).to.be.a("function");
    });
    it("should return the correct JSON object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const modalResponse = new ModalResponse(client, TEST_DATA.MODAL_RESPONSE);
      expect(modalResponse.toJSON()).to.deep.equal({
        channel_id: TEST_DATA.MODAL_RESPONSE.channel_id,
        guild_id: TEST_DATA.MODAL_RESPONSE.guild_id,
        id: TEST_DATA.MODAL_RESPONSE.id,
        member: {
          avatar: TEST_DATA.MODAL_RESPONSE.member.avatar,
          communication_disabled_until:
            TEST_DATA.MODAL_RESPONSE.member.communication_disabled_until,
          flags: TEST_DATA.MODAL_RESPONSE.member.flags,
          joined_at: TEST_DATA.MODAL_RESPONSE.member.joined_at,
          nick: TEST_DATA.MODAL_RESPONSE.member.nick,
          pending: TEST_DATA.MODAL_RESPONSE.member.pending,
          permissions: TEST_DATA.MODAL_RESPONSE.member.permissions,
          roles: TEST_DATA.MODAL_RESPONSE.member.roles,
          user: {
            avatar: TEST_DATA.MODAL_RESPONSE.member.user.avatar,
            discriminator: TEST_DATA.MODAL_RESPONSE.member.user.discriminator,
            id: TEST_DATA.MODAL_RESPONSE.member.user.id,
            username: TEST_DATA.MODAL_RESPONSE.member.user.username,
            global_name: TEST_DATA.MODAL_RESPONSE.member.user.global_name,
            bot: TEST_DATA.MODAL_RESPONSE.member.user.bot,
          },
        },
        type: TEST_DATA.MODAL_RESPONSE.type,
        data: {
          components: [
            {
              components:
                TEST_DATA.MODAL_RESPONSE.data.components[0].components,
            },
          ],
        },
      });
    });
  });
});
