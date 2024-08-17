import { expect } from "chai";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import { TO_JSON_TYPES_ENUM } from "../../src/constants.js";
import { Poll, MessagePollManager, Guild } from "../../src/structures.js";

describe("Poll", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Poll).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll).to.have.property("guildId");
      expect(poll).to.have.property("guild");
      expect(poll).to.have.property("question");
      expect(poll).to.have.property("answers");
      expect(poll).to.have.property("expiry");
      expect(poll).to.have.property("allowMultiselect");
      expect(poll).to.have.property("layoutType");
      expect(poll).to.have.property("rawLayoutType");
      expect(poll).to.have.property("_results");
      expect(poll).to.have.property("toString");
      expect(poll).to.have.property("toJSON");
    });
  });

  context("check question", function () {
    it("should have the correct question", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.question).to.equal(TEST_DATA.POLL.question);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.guild.id).to.equal(TEST_DATA.GUILD_ID);
      expect(poll.guild).to.be.an.instanceOf(Guild);
    });
  });

  context("check answers", function () {
    it("should have the correct answers", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.answers).to.deep.equal([
        {
          answer: `<:${TEST_DATA.POLL.answers[0].poll_media.emoji.name}:${TEST_DATA.POLL.answers[0].poll_media.emoji.id}> ${TEST_DATA.POLL.answers[0].poll_media.text}`,
          answerId: TEST_DATA.POLL.answers[0].answer_id,
        },
      ]);
    });
  });

  context("check expiry", function () {
    it("should have the correct expiry", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.expiry).to.equal(
        (new Date(TEST_DATA.POLL.expiry).getTime() / 1000) | 0,
      );
    });
  });

  context("check allowMultiselect", function () {
    it("should have the correct allowMultiselect", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.allowMultiselect).to.equal(TEST_DATA.POLL.allow_multiselect);
    });
  });

  context("check layoutType", function () {
    it("should have the correct layoutType", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.layoutType).to.equal("DEFAULT");
    });
  });

  context("check rawLayoutType", function () {
    it("should have the correct rawLayoutType", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.rawLayoutType).to.equal(TEST_DATA.POLL.layout_type);
    });
  });

  context("check results", function () {
    it("should have the correct results", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll._results).to.be.an.instanceOf(MessagePollManager);
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(poll.toString()).to.be.a("string");
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      expect(poll.toJSON()).to.deep.equal({
        question: TEST_DATA.POLL.question,
        answers: [
          {
            answer_id: TEST_DATA.POLL.answers[0].answer_id,
            poll_media: {
              emoji: {
                id: TEST_DATA.POLL.answers[0].poll_media.emoji.id,
                name: TEST_DATA.POLL.answers[0].poll_media.emoji.name,
              },
              text: TEST_DATA.POLL.answers[0].poll_media.text,
            },
          },
        ],
        expiry: new Date(
          ((new Date(TEST_DATA.POLL.expiry).getTime() / 1000) | 0) * 1000,
        ).toISOString(),
        allow_multiselect: TEST_DATA.POLL.allow_multiselect,
        layout_type: TEST_DATA.POLL.layout_type,
        results: {
          answer_counts: [
            {
              count: 1,
              id: 1,
              me_voted: true,
            },
          ],
        },
      });
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      expect(poll.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT)).to.deep.equal({
        question: TEST_DATA.POLL.question,
        answers: [
          {
            answer_id: TEST_DATA.POLL.answers[0].answer_id,
            poll_media: {
              emoji: {
                id: TEST_DATA.POLL.answers[0].poll_media.emoji.id,
                name: TEST_DATA.POLL.answers[0].poll_media.emoji.name,
              },
              text: TEST_DATA.POLL.answers[0].poll_media.text,
            },
          },
        ],
        expiry: new Date(TEST_DATA.POLL.expiry).getTime(),
        allow_multiselect: TEST_DATA.POLL.allow_multiselect,
        layout_type: TEST_DATA.POLL.layout_type,
        _results: {
          1: [TEST_DATA.CLIENT_USER.id],
        },
      });
      expect(poll.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT)).to.deep.equal({
        question: TEST_DATA.POLL.question,
        answers: [
          {
            answer_id: TEST_DATA.POLL.answers[0].answer_id,
            poll_media: {
              emoji: {
                id: TEST_DATA.POLL.answers[0].poll_media.emoji.id,
                name: TEST_DATA.POLL.answers[0].poll_media.emoji.name,
              },
              text: TEST_DATA.POLL.answers[0].poll_media.text,
            },
          },
        ],
        expiry: new Date(TEST_DATA.POLL.expiry).getTime(),
        allow_multiselect: TEST_DATA.POLL.allow_multiselect,
        layout_type: TEST_DATA.POLL.layout_type,
        _results: {
          1: [TEST_DATA.CLIENT_USER.id],
        },
      });
      expect(poll.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT)).to.deep.equal({
        question: TEST_DATA.POLL.question,
        answers: [
          {
            answer_id: TEST_DATA.POLL.answers[0].answer_id,
            poll_media: {
              emoji: {
                id: TEST_DATA.POLL.answers[0].poll_media.emoji.id,
                name: TEST_DATA.POLL.answers[0].poll_media.emoji.name,
              },
              text: TEST_DATA.POLL.answers[0].poll_media.text,
            },
          },
        ],
        expiry: new Date(
          ((new Date(TEST_DATA.POLL.expiry).getTime() / 1000) | 0) * 1000,
        ).toISOString(),
        allow_multiselect: TEST_DATA.POLL.allow_multiselect,
        layout_type: TEST_DATA.POLL.layout_type,
        results: {
          answer_counts: [
            {
              count: 1,
              id: 1,
              me_voted: true,
            },
          ],
        },
      });
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      const rebundled = new Poll(client, poll.toJSON(), {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.rawLayoutType).to.equal(poll.rawLayoutType);
      expect(rebundled.layoutType).to.equal(poll.layoutType);
      expect(rebundled.allowMultiselect).to.equal(poll.allowMultiselect);
      expect(rebundled.expiry).to.equal(poll.expiry);
      expect(rebundled.answers).to.deep.equal(poll.answers);
      expect(rebundled.question).to.equal(poll.question);
      expect(rebundled.guildId).to.equal(poll.guildId);
      expect(rebundled._results).to.be.an.instanceOf(MessagePollManager);
    });
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      const rebundled = new Poll(
        client,
        poll.toJSON(TO_JSON_TYPES_ENUM.CACHE_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.rawLayoutType).to.equal(poll.rawLayoutType);
      expect(rebundled.layoutType).to.equal(poll.layoutType);
      expect(rebundled.allowMultiselect).to.equal(poll.allowMultiselect);
      expect(rebundled.expiry).to.equal(poll.expiry);
      expect(rebundled.answers).to.deep.equal(poll.answers);
      expect(rebundled.question).to.equal(poll.question);
      expect(rebundled.guildId).to.equal(poll.guildId);
      expect(rebundled._results).to.be.an.instanceOf(MessagePollManager);
      expect(rebundled._results).to.deep.equal(poll._results);
    });
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      const rebundled = new Poll(
        client,
        poll.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.rawLayoutType).to.equal(poll.rawLayoutType);
      expect(rebundled.layoutType).to.equal(poll.layoutType);
      expect(rebundled.allowMultiselect).to.equal(poll.allowMultiselect);
      expect(rebundled.expiry).to.equal(poll.expiry);
      expect(rebundled.answers).to.deep.equal(poll.answers);
      expect(rebundled.question).to.equal(poll.question);
      expect(rebundled.guildId).to.equal(poll.guildId);
      expect(rebundled._results).to.be.an.instanceOf(MessagePollManager);
      expect(rebundled._results).to.deep.equal(poll._results);
    });
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      poll._results._addVote(
        TEST_DATA.CLIENT_USER.id,
        TEST_DATA.POLL.answers[0].answer_id,
      );
      const rebundled = new Poll(
        client,
        poll.toJSON(TO_JSON_TYPES_ENUM.DISCORD_FORMAT),
        {
          guild_id: TEST_DATA.GUILD_ID,
        },
      );
      expect(rebundled.rawLayoutType).to.equal(poll.rawLayoutType);
      expect(rebundled.layoutType).to.equal(poll.layoutType);
      expect(rebundled.allowMultiselect).to.equal(poll.allowMultiselect);
      expect(rebundled.expiry).to.equal(poll.expiry);
      expect(rebundled.answers).to.deep.equal(poll.answers);
      expect(rebundled.question).to.equal(poll.question);
      expect(rebundled.guildId).to.equal(poll.guildId);
      expect(rebundled._results).to.be.an.instanceOf(MessagePollManager);
      expect(rebundled._results).to.deep.equal(poll._results);
    });
  });
});
