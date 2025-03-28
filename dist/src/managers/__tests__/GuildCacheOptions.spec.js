import { expect } from "chai";
import GuildCacheOptions from "../GuildCacheOptions.js";
import { GluonGuildCachingOptions } from "#typings/enums.js";
describe("GuildCacheOptions", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildCacheOptions).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of GuildCacheOptions with the correct options", function () {
      const cacheOptions = new GuildCacheOptions();
      expect(cacheOptions).to.be.an.instanceOf(GuildCacheOptions);
      expect(cacheOptions).to.have.property("setMessageCaching");
      expect(cacheOptions).to.have.property("setFileCaching");
      expect(cacheOptions).to.have.property("setMemberCaching");
      expect(cacheOptions).to.have.property("setChannelCaching");
      expect(cacheOptions).to.have.property("setRoleCaching");
      expect(cacheOptions).to.have.property("setVoiceStateCaching");
      expect(cacheOptions).to.have.property("setThreadCaching");
      expect(cacheOptions).to.have.property("setEmojiCaching");
      expect(cacheOptions).to.have.property("setInviteCaching");
      expect(cacheOptions).to.have.property("setScheduledEventCaching");
      expect(cacheOptions).to.have.property("messageCaching");
      expect(cacheOptions).to.have.property("fileCaching");
      expect(cacheOptions).to.have.property("memberCaching");
      expect(cacheOptions).to.have.property("channelCaching");
      expect(cacheOptions).to.have.property("roleCaching");
      expect(cacheOptions).to.have.property("voiceStateCaching");
      expect(cacheOptions).to.have.property("threadCaching");
      expect(cacheOptions).to.have.property("emojiCaching");
      expect(cacheOptions).to.have.property("inviteCaching");
      expect(cacheOptions).to.have.property("scheduledEventCaching");
      expect(cacheOptions).to.have.property("toString");
      expect(cacheOptions).to.have.property("toJSON");
    });
    it("should have the correct values when added in the constructor", function () {
      const cacheOptions = new GuildCacheOptions(
        GluonGuildCachingOptions.Channels | GluonGuildCachingOptions.Roles,
      );
      expect(cacheOptions.channelCaching).to.be.true;
      expect(cacheOptions.roleCaching).to.be.true;
      expect(cacheOptions.messageCaching).to.be.false;
    });
  });
  context("check set methods", function () {
    it("should set the correct values", function () {
      const cacheOptions = new GuildCacheOptions();
      cacheOptions.setMessageCaching(true);
      cacheOptions.setFileCaching(true);
      cacheOptions.setMemberCaching(true);
      cacheOptions.setChannelCaching(true);
      cacheOptions.setRoleCaching(true);
      cacheOptions.setVoiceStateCaching(true);
      cacheOptions.setThreadCaching(true);
      cacheOptions.setEmojiCaching(true);
      cacheOptions.setInviteCaching(true);
      cacheOptions.setScheduledEventCaching(true);
      expect(cacheOptions.messageCaching).to.be.true;
      expect(cacheOptions.fileCaching).to.be.true;
      expect(cacheOptions.memberCaching).to.be.true;
      expect(cacheOptions.channelCaching).to.be.true;
      expect(cacheOptions.roleCaching).to.be.true;
      expect(cacheOptions.voiceStateCaching).to.be.true;
      expect(cacheOptions.threadCaching).to.be.true;
      expect(cacheOptions.emojiCaching).to.be.true;
      expect(cacheOptions.inviteCaching).to.be.true;
      expect(cacheOptions.scheduledEventCaching).to.be.true;
    });
  });
  context("check invalid input", function () {
    it("should throw a TypeError", function () {
      const cacheOptions = new GuildCacheOptions();
      expect(() => cacheOptions.setMessageCaching("true")).to.throw(
        TypeError,
        "GLUON: Message caching must be a boolean",
      );
      expect(() => cacheOptions.setFileCaching("true")).to.throw(
        TypeError,
        "GLUON: File caching must be a boolean",
      );
      expect(() => cacheOptions.setMemberCaching("true")).to.throw(
        TypeError,
        "GLUON: Member caching must be a boolean",
      );
      expect(() => cacheOptions.setChannelCaching("true")).to.throw(
        TypeError,
        "GLUON: Channel caching must be a boolean",
      );
      expect(() => cacheOptions.setRoleCaching("true")).to.throw(
        TypeError,
        "GLUON: Role caching must be a boolean",
      );
      expect(() => cacheOptions.setVoiceStateCaching("true")).to.throw(
        TypeError,
        "GLUON: Voice state caching must be a boolean",
      );
      expect(() => cacheOptions.setThreadCaching("true")).to.throw(
        TypeError,
        "GLUON: Thread caching must be a boolean",
      );
      expect(() => cacheOptions.setEmojiCaching("true")).to.throw(
        TypeError,
        "GLUON: Emoji caching must be a boolean",
      );
      expect(() => cacheOptions.setInviteCaching("true")).to.throw(
        TypeError,
        "GLUON: Invite caching must be a boolean",
      );
      expect(() => cacheOptions.setScheduledEventCaching("true")).to.throw(
        TypeError,
        "GLUON: Scheduled event caching must be a boolean",
      );
    });
  });
  context("check toString", function () {
    it("should return the correct string", function () {
      const cacheOptions = new GuildCacheOptions();
      cacheOptions.setMessageCaching(true);
      cacheOptions.setFileCaching(true);
      cacheOptions.setMemberCaching(true);
      cacheOptions.setChannelCaching(true);
      cacheOptions.setRoleCaching(true);
      cacheOptions.setVoiceStateCaching(true);
      cacheOptions.setThreadCaching(true);
      cacheOptions.setEmojiCaching(false);
      cacheOptions.setInviteCaching(true);
      cacheOptions.setScheduledEventCaching(true);
      cacheOptions.setAuditLogCaching(true);
      expect(cacheOptions.toString()).to.equal(
        "GuildCacheOptions { MESSAGES: true, FILES: true, VOICESTATES: true, ROLES: true, EMOJIS: false, INVITES: true, CHANNELS: true, MEMBERS: true, THREADS: true, SCHEDULEDEVENTS: true, AUDITLOGS: true }",
      );
    });
  });
  context("check toJSON", function () {
    it("should return the correct JSON object", function () {
      const cacheOptions = new GuildCacheOptions();
      cacheOptions.setMessageCaching(true);
      cacheOptions.setFileCaching(true);
      cacheOptions.setMemberCaching(true);
      cacheOptions.setChannelCaching(true);
      cacheOptions.setRoleCaching(true);
      cacheOptions.setVoiceStateCaching(true);
      cacheOptions.setThreadCaching(true);
      cacheOptions.setEmojiCaching(false);
      cacheOptions.setInviteCaching(true);
      cacheOptions.setScheduledEventCaching(true);
      expect(cacheOptions.toJSON()).to.equal(1007);
    });
  });
});
//# sourceMappingURL=GuildCacheOptions.spec.js.map
