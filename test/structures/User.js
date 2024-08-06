import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import User from "../../src/structures/User.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";

describe("User", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(User).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user).to.have.property("id");
      expect(user).to.have.property("username");
      expect(user).to.have.property("globalName");
      expect(user).to.have.property("discriminator");
      expect(user).to.have.property("bot");
      expect(user).to.have.property("_cached");
      expect(user).to.have.property("mention");
      expect(user).to.have.property("displayAvatarURL");
      expect(user).to.have.property("tag");
      expect(user).to.have.property("createdTimestamp");
      expect(user).to.have.property("bot");
      expect(user).to.have.property("avatarIsAnimated");
      expect(user).to.have.property("toString");
      expect(user).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.id).to.equal(TEST_DATA.USER.id);
    });
  });

  context("check username", function () {
    it("should have the correct username", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.username).to.equal(TEST_DATA.USER.username);
    });
  });

  context("check discriminator", function () {
    it("should have the correct discriminator", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.discriminator).to.equal(TEST_DATA.USER.discriminator);
    });
  });

  context("check globalName", function () {
    it("should have the correct globalName", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.globalName).to.equal(TEST_DATA.USER.global_name);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.mention).to.equal(`<@${TEST_DATA.USER.id}>`);
    });
  });

  context("check displayAvatarURL", function () {
    it("should have the correct displayAvatarURL", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.displayAvatarURL).to.equal(
        "https://cdn.discordapp.com/avatars/301655085954367490/a_000000000000000000000000deadbeef.gif",
      );
    });
  });

  context("check tag", function () {
    it("should have the correct tag", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.tag).to.equal(
        `${TEST_DATA.USER.username}#${TEST_DATA.USER.discriminator}`,
      );
    });
  });

  context("check _cached", function () {
    it("should have the correct _cached", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user._cached).to.be.a("number");
    });
  });

  context("check createdTimestamp", function () {
    it("should have the correct createdTimestamp", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.createdTimestamp).to.equal(1491990576);
    });
  });

  context("check bot", function () {
    it("should have the correct bot", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.bot).to.equal(TEST_DATA.USER.bot);
    });
  });

  context("check avatarIsAnimated", function () {
    it("should have the correct avatarIsAnimated", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.avatarIsAnimated).to.equal(true);
    });
  });

  context("check getMention", function () {
    it("should return the correct mention", function () {
      expect(User.getMention(TEST_DATA.USER.id)).to.equal(
        `<@${TEST_DATA.USER.id}>`,
      );
    });
    it("should throw an error if no id is provided", function () {
      expect(() => User.getMention()).to.throw(
        TypeError,
        "GLUON: User id must be a string.",
      );
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.toString()).to.equal(`<User: ${TEST_DATA.USER.id}>`);
    });
  });

  context("check toJSON", function () {
    it("should return a JSON object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.toJSON()).to.be.a("object");
    });
    it("should return the correct JSON object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const user = new User(client, TEST_DATA.USER);
      expect(user.toJSON()).to.deep.equal({
        avatar: TEST_DATA.USER.avatar,
        bot: TEST_DATA.USER.bot,
        discriminator: TEST_DATA.USER.discriminator,
        id: TEST_DATA.USER.id,
        global_name: TEST_DATA.USER.global_name,
        username: TEST_DATA.USER.username,
      });
    });
  });
});
