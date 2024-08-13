import { expect } from "chai";
import CategoryChannel from "../../src/structures/CategoryChannel.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";

describe("CategoryChannel", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(CategoryChannel).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel).to.have.property("id");
      expect(categoryChannel).to.have.property("name");
      expect(categoryChannel).to.have.property("type");
      expect(categoryChannel).to.have.property("nsfw");
      expect(categoryChannel).to.have.property("mention");
      expect(categoryChannel).to.have.property("toString");
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.name).to.equal(TEST_DATA.CATEGORY_CHANNEL.name);
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.type).to.equal(TEST_DATA.CATEGORY_CHANNEL.type);
    });
  });

  context("check nsfw", function () {
    it("should have the correct nsfw", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.nsfw).to.equal(TEST_DATA.CATEGORY_CHANNEL.nsfw);
    });
  });

  context("check mention", function () {
    it("should have the correct mention", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.mention).to.equal(
        `<#${TEST_DATA.CATEGORY_CHANNEL.id}>`,
      );
    });
  });

  context("check permissionOverwrites", function () {
    it("should have the correct permissionOverwrites", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.permissionOverwrites[0].toJSON()).to.deep.equal({
        id: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].id,
        type: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].type,
        allow: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].allow,
        deny: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].deny,
      });
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.toString()).to.equal(
        `<CategoryChannel: ${TEST_DATA.CATEGORY_CHANNEL.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const categoryChannel = new CategoryChannel(
        client,
        TEST_DATA.CATEGORY_CHANNEL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(categoryChannel.toJSON()).to.deep.equal({
        id: TEST_DATA.CATEGORY_CHANNEL.id,
        name: TEST_DATA.CATEGORY_CHANNEL.name,
        type: TEST_DATA.CATEGORY_CHANNEL.type,
        nsfw: TEST_DATA.CATEGORY_CHANNEL.nsfw,
        guild_id: TEST_DATA.GUILD_ID,
        permission_overwrites: [
          {
            allow: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].allow,
            deny: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].deny,
            id: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].id,
            type: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].type,
          },
        ],
        parent_id: TEST_DATA.CATEGORY_CHANNEL.parent_id,
      });
    });
  });
  it("should return a valid JSON with a custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    const categoryChannel = new CategoryChannel(
      client,
      TEST_DATA.CATEGORY_CHANNEL,
      { guild_id: TEST_DATA.GUILD_ID },
    );
    expect(
      categoryChannel.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
    ).to.deep.equal({
      id: TEST_DATA.CATEGORY_CHANNEL.id,
      name: TEST_DATA.CATEGORY_CHANNEL.name,
      type: TEST_DATA.CATEGORY_CHANNEL.type,
      nsfw: TEST_DATA.CATEGORY_CHANNEL.nsfw,
      guild_id: TEST_DATA.GUILD_ID,
      permission_overwrites: [
        {
          allow: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].allow,
          deny: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].deny,
          id: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].id,
          type: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].type,
        },
      ],
      parent_id: TEST_DATA.CATEGORY_CHANNEL.parent_id,
    });
    expect(
      categoryChannel.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
    ).to.deep.equal({
      id: TEST_DATA.CATEGORY_CHANNEL.id,
      name: TEST_DATA.CATEGORY_CHANNEL.name,
      type: TEST_DATA.CATEGORY_CHANNEL.type,
      nsfw: TEST_DATA.CATEGORY_CHANNEL.nsfw,
      guild_id: TEST_DATA.GUILD_ID,
      permission_overwrites: [
        {
          allow: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].allow,
          deny: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].deny,
          id: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].id,
          type: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].type,
        },
      ],
      parent_id: TEST_DATA.CATEGORY_CHANNEL.parent_id,
    });
    expect(
      categoryChannel.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
    ).to.deep.equal({
      id: TEST_DATA.CATEGORY_CHANNEL.id,
      name: TEST_DATA.CATEGORY_CHANNEL.name,
      type: TEST_DATA.CATEGORY_CHANNEL.type,
      nsfw: TEST_DATA.CATEGORY_CHANNEL.nsfw,
      guild_id: TEST_DATA.GUILD_ID,
      permission_overwrites: [
        {
          allow: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].allow,
          deny: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].deny,
          id: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].id,
          type: TEST_DATA.CATEGORY_CHANNEL.permission_overwrites[0].type,
        },
      ],
      parent_id: TEST_DATA.CATEGORY_CHANNEL.parent_id,
    });
  });
});
