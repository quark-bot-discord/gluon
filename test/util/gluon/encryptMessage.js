import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import Message from "../../../src/structures/Message.js";
import encryptMessage from "../../../src/util/gluon/encryptMessage.js";

describe("EncryptMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no message is provided", function () {
      expect(() => encryptMessage()).to.throw(
        TypeError,
        "GLUON: Message must be provided.",
      );
    });
    it("should throw an error if message has no id", function () {
      expect(() =>
        encryptMessage({
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no channel id", function () {
      expect(() =>
        encryptMessage({
          id: TEST_DATA.MESSAGE_ID,
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no guild id", function () {
      expect(() =>
        encryptMessage({
          id: BigInt(TEST_DATA.MESSAGE_ID),
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.MESSAGE.channel_id,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.be.a("string");
    });
    it("should return an encrypted string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.MESSAGE.channel_id,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.equal(
        "hr4VDg0Ae6dXBv91O69ASuO35+6blxocHvxw4jeEloMYFfA56D38UGaK5hofrdfZHkr6y9LAq2ODqACKrtu7A87CHrmhId6u/IWJIZwiitsG/ZN56AkmrTi4agHr6PP+O3Km/+Bf/VPSFJisdAwk2rqPe3ZpU+dGgCwMwRaHu/hLJe0ZJHUYVtUtnifDYlQecNSrQqYJ5cuB6/ywT1ndAg==",
      );
    });
  });
});
