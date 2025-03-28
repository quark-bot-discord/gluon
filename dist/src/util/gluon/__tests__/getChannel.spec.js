import { expect } from "chai";
import sinon from "sinon";
import { TEST_CHANNELS, TEST_CLIENTS, TEST_GUILDS } from "#src/testData.js";
import getChannel from "../getChannel.js";
describe("getChannel", function () {
  let client;
  let guildId;
  let channelId;
  let guild;
  let channel;
  beforeEach(function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    guildId = guild.id;
    channelId = channel.id;
  });
  it("should throw an error if guild is not found", function () {
    sinon.replace(client.guilds, "get", sinon.fake.returns(null));
    expect(() => getChannel(client, guildId, channelId)).to.throw(
      "GLUON: Guild not found in cache.",
    );
  });
  it("should return the channel if found", function () {
    const result = getChannel(client, guildId, channelId);
    expect(result).to.equal(channel);
  });
  it("should return null if channel is not found", function () {
    sinon.replace(guild.channels, "get", sinon.fake.returns(null));
    const result = getChannel(client, guildId, channelId);
    return expect(result).to.be.null;
  });
});
//# sourceMappingURL=getChannel.spec.js.map
