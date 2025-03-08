import { expect } from "chai";
import sinon from "sinon";
import getMember from "../getMember.js";
import { TEST_CLIENTS, TEST_GUILDS, TEST_MEMBERS } from "#src/testData.js";
describe("getMember", function () {
  let client;
  let guildId;
  let memberId;
  let guild;
  let member;
  beforeEach(function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    member = TEST_MEMBERS.GENERIC_MEMBER(client);
    guildId = guild.id;
    memberId = member.id;
  });
  it("should throw an error if guild is not found", function () {
    sinon.replace(client.guilds, "get", sinon.fake.returns(null));
    expect(() => getMember(client, guildId, memberId)).to.throw(
      "GLUON: Guild not found in cache.",
    );
  });
  it("should return the member if found", function () {
    const result = getMember(client, guildId, memberId);
    expect(result).to.equal(member);
  });
  it("should return null if member is not found", function () {
    sinon.replace(guild.members, "get", sinon.fake.returns(null));
    const result = getMember(client, guildId, memberId);
    return expect(result).to.be.null;
  });
});
//# sourceMappingURL=getMember.spec.js.map
