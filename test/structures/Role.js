import { expect } from "chai";
import {
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
  TEST_ROLES,
} from "../../src/testData.js";
import { Role } from "../../src/structures.js";
import { JsonTypes } from "#typings/enums.js";

describe("Role", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Role).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role).to.have.property("id");
      expect(role).to.have.property("hoist");
      expect(role).to.have.property("name");
      expect(role).to.have.property("managed");
      expect(role).to.have.property("mentionable");
      expect(role).to.have.property("mention");
      expect(role).to.have.property("displayIconURL");
      expect(role).to.have.property("guild");
      expect(role).to.have.property("guildId");
      expect(role).to.have.property("color");
      expect(role).to.have.property("position");
      expect(role).to.have.property("permissions");
      expect(role).to.have.property("tags");
      expect(role).to.have.property("_originalIconHash");
      expect(role).to.have.property("toString");
      expect(role).to.have.property("toJSON");
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.name).to.equal(TEST_DATA.ROLE_ADMIN.name);
    });
  });

  context("check color", function () {
    it("should have the correct color", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.color).to.equal(TEST_DATA.ROLE_ADMIN.color);
    });
  });

  context("check position", function () {
    it("should have the correct position", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.position).to.equal(TEST_DATA.ROLE_ADMIN.position);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.mention).to.equal(`<@&${TEST_DATA.ROLE_ID}>`);
    });
  });

  context("check permissions", function () {
    it("should have the correct permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.permissions).to.equal(
        String(TEST_DATA.ROLE_ADMIN.permissions),
      );
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.guild.id).to.equal(guild.id);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check displayIconURL", function () {
    it("should have the correct displayIconURL", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.displayIconURL).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/${TEST_DATA.ROLE_ADMIN.icon}.png`,
      );
    });
  });

  context("check tags", function () {
    it("should have the correct tags", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.tags).to.deep.equal({
        bot_id: "123456789012345678",
        premium_subscriber: null,
      });
    });
  });

  context("check getMention", function () {
    it("should return the correct mention", function () {
      expect(Role.getMention(TEST_DATA.ROLE_ID, TEST_DATA.GUILD_ID)).to.equal(
        `<@&${TEST_DATA.ROLE_ID}>`,
      );
    });
    it("should return the correct mention for the @everyone role", function () {
      expect(Role.getMention(TEST_DATA.GUILD_ID, TEST_DATA.GUILD_ID)).to.equal(
        "@everyone",
      );
    });
    it("should throw an error if the role id is not a string", function () {
      expect(() => Role.getMention(123)).to.throw(
        TypeError,
        "GLUON: Role ID must be a string",
      );
    });
    it("should throw an error if the guild id is not a string", function () {
      expect(() => Role.getMention(TEST_DATA.ROLE_ID, 123)).to.throw(
        TypeError,
        "GLUON: Guild ID must be a string",
      );
    });
  });

  context("check _originalIconHash", function () {
    it("should have the correct _originalIconHash", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = new Role(
        client,
        {
          id: TEST_DATA.ROLE_ID,
          name: "role",
          color: 123456,
          position: 1,
          permissions: 8,
          tags: {
            bot_id: "123456789012345678",
            integration_id: null,
            premium_subscriber: null,
          },
          icon: "deadbeef",
        },
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(role._originalIconHash).to.equal(
        "000000000000000000000000deadbeef",
      );
    });
  });

  context("check getIconUrl", function () {
    it("should throw an error if no role id is provided", function () {
      expect(() => Role.getIconUrl(undefined, "hash")).to.throw(
        TypeError,
        "GLUON: Role id must be a string.",
      );
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() => Role.getIconUrl(TEST_DATA.ROLE_ID, 123)).to.throw(
        TypeError,
        "GLUON: Role icon hash must be a string.",
      );
    });
    it("should return a string", function () {
      expect(Role.getIconUrl(TEST_DATA.ROLE_ID, "hash")).to.be.a("string");
    });
    it("should return null if no hash is provided", function () {
      expect(Role.getIconUrl(TEST_DATA.ROLE_ID)).to.be.null;
    });
    it("should return the correct icon url", function () {
      expect(Role.getIconUrl(TEST_DATA.ROLE_ID, "hash")).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/hash.png`,
      );
    });
    it("should return the correct icon url for a gif", function () {
      expect(Role.getIconUrl(TEST_DATA.ROLE_ID, "a_hash")).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/a_hash.gif`,
      );
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.toString()).to.equal(`<Role: ${TEST_DATA.ROLE_ID}>`);
    });
  });

  context("check toJSON", function () {
    it("should return a JSON object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.toJSON()).to.be.a("object");
    });
    it("should return the correct JSON object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.toJSON()).to.deep.equal({
        hoist: TEST_DATA.ROLE_ADMIN.hoist,
        managed: TEST_DATA.ROLE_ADMIN.managed,
        mentionable: TEST_DATA.ROLE_ADMIN.mentionable,
        icon: TEST_DATA.ROLE_ADMIN.icon,
        id: TEST_DATA.ROLE_ID,
        name: TEST_DATA.ROLE_ADMIN.name,
        color: TEST_DATA.ROLE_ADMIN.color,
        position: TEST_DATA.ROLE_ADMIN.position,
        permissions: String(TEST_DATA.ROLE_ADMIN.permissions),
        tags: {
          bot_id: "123456789012345678",
          premium_subscriber: null,
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      expect(role.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal({
        _attributes: 7,
        icon: TEST_DATA.ROLE_ADMIN.icon,
        id: TEST_DATA.ROLE_ID,
        name: TEST_DATA.ROLE_ADMIN.name,
        color: TEST_DATA.ROLE_ADMIN.color,
        position: TEST_DATA.ROLE_ADMIN.position,
        permissions: String(TEST_DATA.ROLE_ADMIN.permissions),
        tags: {
          bot_id: "123456789012345678",
          premium_subscriber: null,
        },
      });
      expect(role.toJSON(JsonTypes.STORAGE_FORMAT)).to.deep.equal({
        _attributes: 7,
        icon: TEST_DATA.ROLE_ADMIN.icon,
        id: TEST_DATA.ROLE_ID,
        name: TEST_DATA.ROLE_ADMIN.name,
        color: TEST_DATA.ROLE_ADMIN.color,
        position: TEST_DATA.ROLE_ADMIN.position,
        permissions: String(TEST_DATA.ROLE_ADMIN.permissions),
        tags: {
          bot_id: "123456789012345678",
          premium_subscriber: null,
        },
      });
      expect(role.toJSON(JsonTypes.DISCORD_FORMAT)).to.deep.equal({
        hoist: TEST_DATA.ROLE_ADMIN.hoist,
        managed: TEST_DATA.ROLE_ADMIN.managed,
        mentionable: TEST_DATA.ROLE_ADMIN.mentionable,
        icon: TEST_DATA.ROLE_ADMIN.icon,
        id: TEST_DATA.ROLE_ID,
        name: TEST_DATA.ROLE_ADMIN.name,
        color: TEST_DATA.ROLE_ADMIN.color,
        position: TEST_DATA.ROLE_ADMIN.position,
        permissions: String(TEST_DATA.ROLE_ADMIN.permissions),
        tags: {
          bot_id: "123456789012345678",
          premium_subscriber: null,
        },
      });
    });
  });

  context("check bundling", function () {
    it("should return the correct bundle", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const rebundled = new Role(client, role.toJSON(), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(role.id);
      expect(rebundled.name).to.equal(role.name);
      expect(rebundled.color).to.equal(role.color);
      expect(rebundled.position).to.equal(role.position);
      expect(rebundled.permissions).to.equal(role.permissions);
      expect(rebundled.tags).to.deep.equal(role.tags);
      expect(rebundled.hoist).to.equal(role.hoist);
      expect(rebundled.managed).to.equal(role.managed);
      expect(rebundled.mentionable).to.equal(role.mentionable);
      expect(rebundled.mention).to.equal(role.mention);
      expect(rebundled.displayIconURL).to.equal(role.displayIconURL);
      expect(rebundled.guild.id).to.equal(role.guild.id);
      expect(rebundled.guildId).to.equal(role.guildId);
      expect(rebundled._originalIconHash).to.equal(role._originalIconHash);
    });
    it("should return the correct bundle with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const rebundled = new Role(client, role.toJSON(JsonTypes.CACHE_FORMAT), {
        guildId: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(role.id);
      expect(rebundled.name).to.equal(role.name);
      expect(rebundled.color).to.equal(role.color);
      expect(rebundled.position).to.equal(role.position);
      expect(rebundled.permissions).to.equal(role.permissions);
      expect(rebundled.tags).to.deep.equal(role.tags);
      expect(rebundled.hoist).to.equal(role.hoist);
      expect(rebundled.managed).to.equal(role.managed);
      expect(rebundled.mentionable).to.equal(role.mentionable);
      expect(rebundled.mention).to.equal(role.mention);
      expect(rebundled.displayIconURL).to.equal(role.displayIconURL);
      expect(rebundled.guild.id).to.equal(role.guild.id);
      expect(rebundled.guildId).to.equal(role.guildId);
      expect(rebundled._originalIconHash).to.equal(role._originalIconHash);
    });
    it("should return the correct bundle with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const rebundled = new Role(
        client,
        role.toJSON(JsonTypes.STORAGE_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(role.id);
      expect(rebundled.name).to.equal(role.name);
      expect(rebundled.color).to.equal(role.color);
      expect(rebundled.position).to.equal(role.position);
      expect(rebundled.permissions).to.equal(role.permissions);
      expect(rebundled.tags).to.deep.equal(role.tags);
      expect(rebundled.hoist).to.equal(role.hoist);
      expect(rebundled.managed).to.equal(role.managed);
      expect(rebundled.mentionable).to.equal(role.mentionable);
      expect(rebundled.mention).to.equal(role.mention);
      expect(rebundled.displayIconURL).to.equal(role.displayIconURL);
      expect(rebundled.guild.id).to.equal(role.guild.id);
      expect(rebundled.guildId).to.equal(role.guildId);
      expect(rebundled._originalIconHash).to.equal(role._originalIconHash);
    });
    it("should return the correct bundle with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const role = TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      const rebundled = new Role(
        client,
        role.toJSON(JsonTypes.DISCORD_FORMAT),
        {
          guildId: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.id).to.equal(role.id);
      expect(rebundled.name).to.equal(role.name);
      expect(rebundled.color).to.equal(role.color);
      expect(rebundled.position).to.equal(role.position);
      expect(rebundled.permissions).to.equal(role.permissions);
      expect(rebundled.tags).to.deep.equal(role.tags);
      expect(rebundled.hoist).to.equal(role.hoist);
      expect(rebundled.managed).to.equal(role.managed);
      expect(rebundled.mentionable).to.equal(role.mentionable);
      expect(rebundled.mention).to.equal(role.mention);
      expect(rebundled.displayIconURL).to.equal(role.displayIconURL);
      expect(rebundled.guild.id).to.equal(role.guild.id);
      expect(rebundled.guildId).to.equal(role.guildId);
      expect(rebundled._originalIconHash).to.equal(role._originalIconHash);
    });
  });
});
