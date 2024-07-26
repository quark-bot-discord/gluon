import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import decryptMessage from "../../../src/util/gluon/decryptMessage.js";

describe("DecryptMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(decryptMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no client is provided", function () {
      expect(() =>
        decryptMessage(
          undefined,
          "test",
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.throw(TypeError, "GLUON: Client must be provided.");
    });
    it("should throw an error if no text is provided", function () {
      expect(() =>
        decryptMessage(
          {},
          undefined,
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.throw(TypeError, "GLUON: Encrypted message must be provided.");
    });
  });

  context("check valid output", function () {
    it("should return an object", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      expect(
        decryptMessage(
          client,
          "hr4VDg0Ae6dXBv91O69ASuO35+6blxocHvxw4jeEloMYFfA56D38UGaK5hofrdfZHkr6y9LAq2ODqACKrtu7A87CHrmhId6u/IWJIZwiitsG/ZN56AkmrTi4agHr6PP+O3Km/+Bf/VPSFJisdAwk2rqPe3ZpU+dGgCwMwRaHu/hLJe0ZJHUYVtUtnifDYlQecNSrQqYJ5cuB6/ywT1ndAg==",
          TEST_DATA.MESSAGE_ID,
          TEST_DATA.CHANNEL_ID,
          TEST_DATA.GUILD_ID,
        ),
      ).to.be.an("object");
    });
    it("should return a message object with the correct content", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "hr4VDg0Ae6dXBv91O69ASuO35+6blxocHvxw4jeEloMYFfA56D38UGaK5hofrdfZHkr6y9LAq2ODqACKrtu7A87CHrmhId6u/IWJIZwiitsG/ZN56AkmrTi4agHr6PP+O3Km/+Bf/VPSFJisdAwk2rqPe3ZpU+dGgCwMwRaHu/hLJe0ZJHUYVtUtnifDYlQecNSrQqYJ5cuB6/ywT1ndAg==",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.content).to.equal(TEST_DATA.MESSAGE.content);
    });
    it("should return a message object with the correct id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "hr4VDg0Ae6dXBv91O69ASuO35+6blxocHvxw4jeEloMYFfA56D38UGaK5hofrdfZHkr6y9LAq2ODqACKrtu7A87CHrmhId6u/IWJIZwiitsG/ZN56AkmrTi4agHr6PP+O3Km/+Bf/VPSFJisdAwk2rqPe3ZpU+dGgCwMwRaHu/hLJe0ZJHUYVtUtnifDYlQecNSrQqYJ5cuB6/ywT1ndAg==",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.id).to.equal(TEST_DATA.MESSAGE_ID);
    });
    it("should return a message object with the correct channel id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "hr4VDg0Ae6dXBv91O69ASuO35+6blxocHvxw4jeEloMYFfA56D38UGaK5hofrdfZHkr6y9LAq2ODqACKrtu7A87CHrmhId6u/IWJIZwiitsG/ZN56AkmrTi4agHr6PP+O3Km/+Bf/VPSFJisdAwk2rqPe3ZpU+dGgCwMwRaHu/hLJe0ZJHUYVtUtnifDYlQecNSrQqYJ5cuB6/ywT1ndAg==",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.channelId).to.equal(TEST_DATA.CHANNEL_ID);
    });
  });
});
