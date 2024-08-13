import { expect } from "chai";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import Reaction from "../../src/structures/Reaction.js";
import Guild from "../../src/structures/Guild.js";
import Member from "../../src/structures/Member.js";
import Emoji from "../../src/structures/Emoji.js";

describe("Reaction", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Reaction).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction).to.have.property("count");
      expect(reaction).to.have.property("reacted");
      expect(reaction).to.have.property("reactedIds");
      expect(reaction).to.have.property("guildId");
      expect(reaction).to.have.property("guild");
      expect(reaction).to.have.property("emoji");
      expect(reaction).to.have.property("initialReactor");
      expect(reaction).to.have.property("_addReactor");
      expect(reaction).to.have.property("_removeReactor");
      expect(reaction).to.have.property("toString");
      expect(reaction).to.have.property("toJSON");
    });
  });

  context("check count", function () {
    it("should have the correct count", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor("123456");
      reaction._addReactor("654321");
      expect(reaction.count).to.equal(2);
    });
  });

  context("check reacted", function () {
    it("should have the correct reacted", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.reacted.length).to.equal(1);
      expect(reaction.reacted[0]).to.be.an.instanceOf(Member);
      expect(reaction.reacted[0].id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check reactedIds", function () {
    it("should have the correct reactedIds", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.reactedIds.length).to.equal(1);
      expect(reaction.reactedIds[0]).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.guild).to.be.an.instanceOf(Guild);
      expect(reaction.guild.id).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check emoji", function () {
    it("should have the correct emoji", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.emoji).to.be.an.instanceOf(Emoji);
    });
  });

  context("check initialReactor", function () {
    it("should have the correct initialReactor", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.initialReactor).to.be.a("string");
      expect(reaction.initialReactor).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check addReactor", function () {
    it("should add a reactor to the reaction", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.reacted.length).to.equal(1);
      expect(reaction.reactedIds.length).to.equal(1);
      expect(reaction.reacted[0]).to.be.an.instanceOf(Member);
      expect(reaction.reacted[0].id).to.equal(TEST_DATA.MEMBER_ID);
    });
  });

  context("check removeReactor", function () {
    it("should remove a reactor from the reaction", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      new Member(client, TEST_DATA.MEMBER, {
        user_id: TEST_DATA.MEMBER_ID,
        guild_id: TEST_DATA.GUILD_ID,
      });
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.reacted.length).to.equal(1);
      expect(reaction.reactedIds.length).to.equal(1);
      reaction._removeReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.reacted.length).to.equal(0);
      expect(reaction.reactedIds.length).to.equal(0);
    });
  });

  context("check toString", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.toString).to.be.a("function");
    });
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.toString()).to.equal(
        `<Reaction: <Emoji: ${TEST_DATA.REACTION.emoji.name}>>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(reaction.toJSON).to.be.a("function");
    });
    it("should return the correct JSON object", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.toJSON()).to.deep.equal({
        count: 1,
        emoji: {
          animated: false,
          available: true,
          id: null,
          name: TEST_DATA.REACTION.emoji.name,
          require_colons: true,
          managed: false,
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const reaction = new Reaction(client, TEST_DATA.REACTION, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      reaction._addReactor(TEST_DATA.MEMBER_ID);
      expect(reaction.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT)).to.deep.equal({
        _reacted: [TEST_DATA.MEMBER_ID],
        emoji: {
          _attributes: 9,
          id: null,
          name: TEST_DATA.REACTION.emoji.name,
        },
        initial_reactor: TEST_DATA.MEMBER_ID,
      });
      expect(reaction.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT)).to.deep.equal({
        _reacted: [TEST_DATA.MEMBER_ID],
        emoji: {
          _attributes: 9,
          id: null,
          name: TEST_DATA.REACTION.emoji.name,
        },
        initial_reactor: TEST_DATA.MEMBER_ID,
      });
      expect(reaction.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT)).to.deep.equal({
        count: 1,
        emoji: {
          animated: false,
          available: true,
          id: null,
          name: TEST_DATA.REACTION.emoji.name,
          require_colons: true,
          managed: false,
        },
      });
    });
  });

  context("check bundling", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    new Member(client, TEST_DATA.MEMBER, {
      user_id: TEST_DATA.MEMBER_ID,
      guild_id: TEST_DATA.GUILD_ID,
    });
    const reaction = new Reaction(client, TEST_DATA.REACTION, {
      guild_id: TEST_DATA.GUILD_ID,
    });
    reaction._addReactor(TEST_DATA.MEMBER_ID);
    const rebundled = new Reaction(client, reaction.toJSON(), {
      guild_id: TEST_DATA.GUILD_ID,
    });
    expect(reaction.count).to.equal(rebundled.count);
    expect(reaction.guildId).to.equal(rebundled.guildId);
    expect(reaction.guild).to.deep.equal(rebundled.guild);
    expect(reaction.guild.id).to.deep.equal(rebundled.guild.id);
    expect(reaction.emoji).to.deep.equal(rebundled.emoji);
    expect(reaction.emoji.name).to.equal(rebundled.emoji.name);
  });
  it("should bundle correctly with a custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    new Member(client, TEST_DATA.MEMBER, {
      user_id: TEST_DATA.MEMBER_ID,
      guild_id: TEST_DATA.GUILD_ID,
    });
    const reaction = new Reaction(client, TEST_DATA.REACTION, {
      guild_id: TEST_DATA.GUILD_ID,
    });
    reaction._addReactor(TEST_DATA.MEMBER_ID);
    const rebundled = new Reaction(
      client,
      reaction.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
      {
        guild_id: TEST_DATA.GUILD_ID,
      },
    );
    expect(reaction.count).to.equal(rebundled.count);
    expect(reaction.reacted).to.deep.equal(rebundled.reacted);
    expect(reaction.reactedIds).to.deep.equal(rebundled.reactedIds);
    expect(reaction.guildId).to.equal(rebundled.guildId);
    expect(reaction.guild).to.deep.equal(rebundled.guild);
    expect(reaction.guild.id).to.deep.equal(rebundled.guild.id);
    expect(reaction.emoji).to.deep.equal(rebundled.emoji);
    expect(reaction.emoji.name).to.equal(rebundled.emoji.name);
  });
  it("should bundle correctly with a custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    new Member(client, TEST_DATA.MEMBER, {
      user_id: TEST_DATA.MEMBER_ID,
      guild_id: TEST_DATA.GUILD_ID,
    });
    const reaction = new Reaction(client, TEST_DATA.REACTION, {
      guild_id: TEST_DATA.GUILD_ID,
    });
    reaction._addReactor(TEST_DATA.MEMBER_ID);
    const rebundled = new Reaction(
      client,
      reaction.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
      {
        guild_id: TEST_DATA.GUILD_ID,
      },
    );
    expect(reaction.count).to.equal(rebundled.count);
    expect(reaction.reacted).to.deep.equal(rebundled.reacted);
    expect(reaction.reactedIds).to.deep.equal(rebundled.reactedIds);
    expect(reaction.guildId).to.equal(rebundled.guildId);
    expect(reaction.guild).to.deep.equal(rebundled.guild);
    expect(reaction.guild.id).to.deep.equal(rebundled.guild.id);
    expect(reaction.emoji).to.deep.equal(rebundled.emoji);
    expect(reaction.emoji.name).to.equal(rebundled.emoji.name);
  });
  it("should bundle correctly with a custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    TEST_GUILDS.ALL_CACHES_ENABLED(client);
    new Member(client, TEST_DATA.MEMBER, {
      user_id: TEST_DATA.MEMBER_ID,
      guild_id: TEST_DATA.GUILD_ID,
    });
    const reaction = new Reaction(client, TEST_DATA.REACTION, {
      guild_id: TEST_DATA.GUILD_ID,
    });
    reaction._addReactor(TEST_DATA.MEMBER_ID);
    const rebundled = new Reaction(
      client,
      reaction.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
      {
        guild_id: TEST_DATA.GUILD_ID,
      },
    );
    expect(reaction.count).to.equal(rebundled.count);
    expect(reaction.guildId).to.equal(rebundled.guildId);
    expect(reaction.guild).to.deep.equal(rebundled.guild);
    expect(reaction.guild.id).to.deep.equal(rebundled.guild.id);
    expect(reaction.emoji).to.deep.equal(rebundled.emoji);
    expect(reaction.emoji.name).to.equal(rebundled.emoji.name);
  });
});
