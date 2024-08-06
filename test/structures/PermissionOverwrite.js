import { expect } from "chai";
import PermissionOverwrite from "../../src/structures/PermissionOverwrite.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";
import { TEST_DATA } from "../../src/constants.js";

describe("PermissionOverwrite", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(PermissionOverwrite).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite).to.have.property("id");
      expect(permissionOverwrite).to.have.property("type");
      expect(permissionOverwrite).to.have.property("allow");
      expect(permissionOverwrite).to.have.property("deny");
      expect(permissionOverwrite).to.have.property("toString");
      expect(permissionOverwrite).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.id).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.id,
      );
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.type).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.type,
      );
    });
  });

  context("check allow", function () {
    it("should have the correct allow permissions", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.allow).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.allow,
      );
    });
  });

  context("check deny", function () {
    it("should have the correct deny permissions", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.deny).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.deny,
      );
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.toString()).to.equal(
        `<PermissionOverwrite: ${TEST_DATA.PERMISSION_OVERWRITE.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = { user: { id: TEST_DATA.USER.id } };
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.toJSON()).to.deep.equal(
        TEST_DATA.PERMISSION_OVERWRITE,
      );
    });
  });
});
