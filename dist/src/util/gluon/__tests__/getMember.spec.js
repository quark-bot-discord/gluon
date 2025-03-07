import { expect } from "chai";
import sinon from "sinon";
import getMember from "../getMember.js";
describe("getMember", function () {
  let client;
  let guildId;
  let memberId;
  let guild;
  let member;
  beforeEach(function () {
    member = { id: "memberId" };
    guild = {
      members: {
        get: sinon.stub().returns(member),
      },
    };
    client = {
      guilds: {
        get: sinon.stub().returns(guild),
      },
    };
    guildId = "guildId";
    memberId = "memberId";
  });
  it("should throw a TypeError if client is not provided", function () {
    expect(() => getMember(null, guildId, memberId)).to.throw(
      TypeError,
      "GLUON: Client must be a Client instance.",
    );
  });
  it("should throw a TypeError if guildId is not a string", function () {
    expect(() => getMember(client, 123, memberId)).to.throw(
      TypeError,
      "GLUON: Guild ID must be a string.",
    );
  });
  it("should throw a TypeError if memberId is not a string", function () {
    expect(() => getMember(client, guildId, 123)).to.throw(
      TypeError,
      "GLUON: Member ID must be a string.",
    );
  });
  it("should return null if guild is not found", function () {
    client.guilds.get.returns(null);
    const result = getMember(client, guildId, memberId);
    expect(result).to.be.null;
  });
  it("should return the member if found", function () {
    const result = getMember(client, guildId, memberId);
    expect(result).to.equal(member);
  });
  it("should return null if member is not found", function () {
    guild.members.get.returns(null);
    const result = getMember(client, guildId, memberId);
    expect(result).to.be.null;
  });
});
//# sourceMappingURL=getMember.spec.js.map
