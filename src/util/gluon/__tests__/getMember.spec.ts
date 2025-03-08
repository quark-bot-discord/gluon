import { expect } from "chai";
import sinon from "sinon";
import getMember from "../getMember.js";
import type {
  Client as ClientType,
  Member as MemberType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import { Snowflake } from "#typings/discord.js";
import { TEST_CLIENTS, TEST_GUILDS, TEST_MEMBERS } from "#src/testData.js";

describe("getMember", function () {
  let client: ClientType;
  let guildId: Snowflake;
  let memberId: Snowflake;
  let guild: GuildType;
  let member: MemberType;

  beforeEach(function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    member = TEST_MEMBERS.GENERIC_MEMBER(client);
    guildId = guild.id;
    memberId = member.id;
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
    sinon.replace(client.guilds, "get", sinon.fake.returns(null));
    const result = getMember(client, guildId, memberId);
    return expect(result).to.be.null;
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
