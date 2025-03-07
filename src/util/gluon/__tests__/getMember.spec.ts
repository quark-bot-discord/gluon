import { expect } from "chai";
import sinon from "sinon";
import getMember from "../getMember.js";
import type {
  Client as ClientType,
  Member as MemberType,
} from "#typings/index.d.ts";
import { Snowflake } from "#typings/discord.js";

describe("getMember", function () {
  let client: ClientType;
  let guildId: Snowflake;
  let memberId: Snowflake;
  let guild: any;
  let member: MemberType;

  beforeEach(function () {
    member = { id: "memberId" } as MemberType;
    guild = {
      members: {
        get: sinon.stub().returns(member),
      },
    };
    client = {
      guilds: {
        get: sinon.stub().returns(guild),
      },
    } as unknown as ClientType;
    guildId = "guildId" as Snowflake;
    memberId = "memberId" as Snowflake;
  });

  it("should throw a TypeError if client is not provided", function () {
    expect(() => getMember(null as any, guildId, memberId)).to.throw(
      TypeError,
      "GLUON: Client must be a Client instance.",
    );
  });

  it("should throw a TypeError if guildId is not a string", function () {
    expect(() => getMember(client, 123 as any, memberId)).to.throw(
      TypeError,
      "GLUON: Guild ID must be a string.",
    );
  });

  it("should throw a TypeError if memberId is not a string", function () {
    expect(() => getMember(client, guildId, 123 as any)).to.throw(
      TypeError,
      "GLUON: Member ID must be a string.",
    );
  });

  it("should return null if guild is not found", function () {
    (client.guilds.get as sinon.SinonStub).returns(null);
    const result = getMember(client, guildId, memberId);
    expect(result).to.be.null;
  });

  it("should return the member if found", function () {
    const result = getMember(client, guildId, memberId);
    expect(result).to.equal(member);
  });

  it("should return null if member is not found", function () {
    (guild.members.get as sinon.SinonStub).returns(null);
    const result = getMember(client, guildId, memberId);
    expect(result).to.be.null;
  });
});
