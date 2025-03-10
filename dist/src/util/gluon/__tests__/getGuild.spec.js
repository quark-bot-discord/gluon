import { expect } from "chai";
import sinon from "sinon";
import getGuild from "../getGuild.js";
import { TEST_CLIENTS, TEST_GUILDS } from "#src/testData.js";
describe("getGuild", function () {
  let client;
  let guildId;
  let guild;
  beforeEach(function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    guildId = guild.id;
  });
  it("should return the guild when it exists", function () {
    sinon.replace(client.guilds, "get", sinon.fake.returns(guild));
    const result = getGuild(client, guildId);
    expect(result).to.equal(guild);
  });
  it("should return null when the guild does not exist", function () {
    sinon.replace(client.guilds, "get", sinon.fake.returns(null));
    const result = getGuild(client, guildId);
    return expect(result).to.be.null;
  });
});
//# sourceMappingURL=getGuild.spec.js.map
