let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../../src/constants");
const GuildManager = require("../../../src/managers/GuildManager");
const decryptMessage = require("../../../src/util/gluon/decryptMessage");

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
          "DWpQEUQcZNjJ/6gpRJCqN1vDvgDN10ySmHCO7rtZTik9rcYRQCu4/DxiWqbyLyORhBbk/KvQOZ5jAck5y4LTt8GH5BZmErqAzj6k0EWTkmZ4TuipCZGCB6tv8XMaQs49aKfZQJ1qHE5lx5dK8gRQwV8njOx9xneZ16FUX/8t1CAl54xbOna1dph5jA9JT/Cf1MJ1GX676LqOzA+cQyp7Zw==",
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
        "DWpQEUQcZNjJ/6gpRJCqN1vDvgDN10ySmHCO7rtZTik9rcYRQCu4/DxiWqbyLyORhBbk/KvQOZ5jAck5y4LTt8GH5BZmErqAzj6k0EWTkmZ4TuipCZGCB6tv8XMaQs49aKfZQJ1qHE5lx5dK8gRQwV8njOx9xneZ16FUX/8t1CAl54xbOna1dph5jA9JT/Cf1MJ1GX676LqOzA+cQyp7Zw==",
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
        "DWpQEUQcZNjJ/6gpRJCqN1vDvgDN10ySmHCO7rtZTik9rcYRQCu4/DxiWqbyLyORhBbk/KvQOZ5jAck5y4LTt8GH5BZmErqAzj6k0EWTkmZ4TuipCZGCB6tv8XMaQs49aKfZQJ1qHE5lx5dK8gRQwV8njOx9xneZ16FUX/8t1CAl54xbOna1dph5jA9JT/Cf1MJ1GX676LqOzA+cQyp7Zw==",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message.id).to.equal(BigInt(TEST_DATA.MESSAGE_ID));
    });
    it("should return a message object with the correct channel id", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = decryptMessage(
        client,
        "DWpQEUQcZNjJ/6gpRJCqN1vDvgDN10ySmHCO7rtZTik9rcYRQCu4/DxiWqbyLyORhBbk/KvQOZ5jAck5y4LTt8GH5BZmErqAzj6k0EWTkmZ4TuipCZGCB6tv8XMaQs49aKfZQJ1qHE5lx5dK8gRQwV8njOx9xneZ16FUX/8t1CAl54xbOna1dph5jA9JT/Cf1MJ1GX676LqOzA+cQyp7Zw==",
        TEST_DATA.MESSAGE_ID,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.GUILD_ID,
      );
      expect(message._channel_id).to.equal(BigInt(TEST_DATA.CHANNEL_ID));
    });
  });
});
