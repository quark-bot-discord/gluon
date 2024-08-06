import { expect } from "chai";
import Poll from "../../src/structures/Poll.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import { TEST_DATA } from "../../src/constants.js";
import MessagePollManager from "../../src/managers/MessagePollManager.js";

describe("Poll", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Poll).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      const poll = new Poll(client, TEST_DATA.POLL, {
        guild_id: TEST_DATA.GUILD_ID,
      });
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

    context("check question", function () {
      it("should have the correct question", function () {
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll.question).to.equal(TEST_DATA.POLL.question);
      });
    });

    context("check answers", function () {
      it("should have the correct answers", function () {
        const client = {};
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
        const client = {};
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
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll.allowMultiselect).to.equal(
          TEST_DATA.POLL.allow_multiselect,
        );
      });
    });

    context("check layoutType", function () {
      it("should have the correct layoutType", function () {
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll.layoutType).to.equal("DEFAULT");
      });
    });

    context("check rawLayoutType", function () {
      it("should have the correct rawLayoutType", function () {
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll.rawLayoutType).to.equal(TEST_DATA.POLL.layout_type);
      });
    });

    context("check results", function () {
      it("should have the correct results", function () {
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll._results).to.be.an.instanceOf(MessagePollManager);
      });
    });

    context("check toString", function () {
      it("should return a string", function () {
        const client = {};
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        expect(poll.toString()).to.be.a("string");
      });
    });

    context("check toJSON", function () {
      it("should return the correct JSON", function () {
        const client = { user: { id: TEST_DATA.USER.id } };
        const poll = new Poll(client, TEST_DATA.POLL, {
          guild_id: TEST_DATA.GUILD_ID,
        });
        poll._results._addVote(
          TEST_DATA.USER.id,
          TEST_DATA.POLL.answers[0].answer_id,
        );
        expect(poll.toJSON()).to.deep.equal({
          question: TEST_DATA.POLL.question,
          answers: [
            {
              answer: `<:${TEST_DATA.POLL.answers[0].poll_media.emoji.name}:${TEST_DATA.POLL.answers[0].poll_media.emoji.id}> ${TEST_DATA.POLL.answers[0].poll_media.text}`,
              answerId: TEST_DATA.POLL.answers[0].answer_id,
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
  });
});
