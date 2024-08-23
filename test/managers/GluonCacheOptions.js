import { expect } from "chai";
import GluonCacheOptions from "../../src/managers/GluonCacheOptions.js";

describe("GluonCacheOptions", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GluonCacheOptions).to.be.a("function");
    });
  });

  context("check valid input", function () {
    it("should create a new instance of GluonCacheOptions with the correct options", function () {
      const cacheOptions = new GluonCacheOptions({
        userTTL: 30,
        messageTTL: 30,
        cacheMessages: true,
        cacheUsers: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheGuilds: true,
        cacheRoles: true,
        cacheVoiceStates: true,
        cacheEmojis: true,
        cacheInvites: true,
        cacheScheduledEvents: true,
      });
      expect(cacheOptions).to.be.an.instanceOf(GluonCacheOptions);
      expect(cacheOptions).to.have.property("userTTL");
      expect(cacheOptions).to.have.property("messageTTL");
      expect(cacheOptions).to.have.property("cacheMessages");
      expect(cacheOptions).to.have.property("cacheUsers");
      expect(cacheOptions).to.have.property("cacheMembers");
      expect(cacheOptions).to.have.property("cacheChannels");
      expect(cacheOptions).to.have.property("cacheGuilds");
      expect(cacheOptions).to.have.property("cacheRoles");
      expect(cacheOptions).to.have.property("cacheVoiceStates");
      expect(cacheOptions).to.have.property("cacheEmojis");
      expect(cacheOptions).to.have.property("cacheInvites");
      expect(cacheOptions).to.have.property("cacheScheduledEvents");
      expect(cacheOptions).to.have.property("setUserTTL");
      expect(cacheOptions).to.have.property("setMessageTTL");
      expect(cacheOptions).to.have.property("setCacheMessages");
      expect(cacheOptions).to.have.property("setCacheUsers");
      expect(cacheOptions).to.have.property("setCacheMembers");
      expect(cacheOptions).to.have.property("setCacheChannels");
      expect(cacheOptions).to.have.property("setCacheGuilds");
      expect(cacheOptions).to.have.property("setCacheRoles");
      expect(cacheOptions).to.have.property("setCacheVoiceStates");
      expect(cacheOptions).to.have.property("setCacheEmojis");
      expect(cacheOptions).to.have.property("setCacheInvites");
      expect(cacheOptions).to.have.property("setCacheScheduledEvents");
      expect(cacheOptions.userTTL).to.equal(30);
      expect(cacheOptions.messageTTL).to.equal(30);
      expect(cacheOptions.cacheMessages).to.be.true;
      expect(cacheOptions.cacheUsers).to.be.true;
      expect(cacheOptions.cacheMembers).to.be.true;
      expect(cacheOptions.cacheChannels).to.be.true;
      expect(cacheOptions.cacheGuilds).to.be.true;
      expect(cacheOptions.cacheRoles).to.be.true;
      expect(cacheOptions.cacheVoiceStates).to.be.true;
      expect(cacheOptions.cacheEmojis).to.be.true;
      expect(cacheOptions.cacheInvites).to.be.true;
      expect(cacheOptions.cacheScheduledEvents).to.be.true;
      expect(cacheOptions).to.have.property("toString");
    });
  });

  context("check setUserTTL", function () {
    it("should set the correct user TTL", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setUserTTL(30);
      expect(cacheOptions.userTTL).to.equal(30);
    });
  });

  context("check setMessageTTL", function () {
    it("should set the correct message TTL", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setMessageTTL(30);
      expect(cacheOptions.messageTTL).to.equal(30);
    });
  });

  context("check setCacheMessages", function () {
    it("should set the correct cache messages option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheMessages(true);
      expect(cacheOptions.cacheMessages).to.be.true;
    });
  });

  context("check setCacheUsers", function () {
    it("should set the correct cache users option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheUsers(true);
      expect(cacheOptions.cacheUsers).to.be.true;
    });
  });

  context("check setCacheMembers", function () {
    it("should set the correct cache members option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheMembers(true);
      expect(cacheOptions.cacheMembers).to.be.true;
    });
  });

  context("check setCacheChannels", function () {
    it("should set the correct cache channels option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheChannels(true);
      expect(cacheOptions.cacheChannels).to.be.true;
    });
  });

  context("check setCacheGuilds", function () {
    it("should set the correct cache guilds option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheGuilds(true);
      expect(cacheOptions.cacheGuilds).to.be.true;
    });
  });

  context("check setCacheRoles", function () {
    it("should set the correct cache roles option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheRoles(true);
      expect(cacheOptions.cacheRoles).to.be.true;
    });
  });

  context("check setCacheVoiceStates", function () {
    it("should set the correct cache voice states option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheVoiceStates(true);
      expect(cacheOptions.cacheVoiceStates).to.be.true;
    });
  });

  context("check setCacheEmojis", function () {
    it("should set the correct cache emojis option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheEmojis(true);
      expect(cacheOptions.cacheEmojis).to.be.true;
    });
  });

  context("check setCacheInvites", function () {
    it("should set the correct cache invites option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheInvites(true);
      expect(cacheOptions.cacheInvites).to.be.true;
    });
  });

  context("check setCacheScheduledEvents", function () {
    it("should set the correct cache scheduled events option", function () {
      const cacheOptions = new GluonCacheOptions();
      cacheOptions.setCacheScheduledEvents(true);
      expect(cacheOptions.cacheScheduledEvents).to.be.true;
    });
  });

  context("check invalid input", function () {
    it("should throw a TypeError", function () {
      const cacheOptions = new GluonCacheOptions();
      expect(() => cacheOptions.setUserTTL("30")).to.throw(
        TypeError,
        "GLUON: User TTL must be a number",
      );
      expect(() => cacheOptions.setMessageTTL("30")).to.throw(
        TypeError,
        "GLUON: Message TTL must be a number",
      );
      expect(() => cacheOptions.setCacheMessages("true")).to.throw(
        TypeError,
        "GLUON: Cache messages must be a boolean",
      );
      expect(() => cacheOptions.setCacheUsers("true")).to.throw(
        TypeError,
        "GLUON: Cache users must be a boolean",
      );
      expect(() => cacheOptions.setCacheMembers("true")).to.throw(
        TypeError,
        "GLUON: Cache members must be a boolean",
      );
      expect(() => cacheOptions.setCacheChannels("true")).to.throw(
        TypeError,
        "GLUON: Cache channels must be a boolean",
      );
      expect(() => cacheOptions.setCacheGuilds("true")).to.throw(
        TypeError,
        "GLUON: Cache guilds must be a boolean",
      );
      expect(() => cacheOptions.setCacheRoles("true")).to.throw(
        TypeError,
        "GLUON: Cache roles must be a boolean",
      );
      expect(() => cacheOptions.setCacheVoiceStates("true")).to.throw(
        TypeError,
        "GLUON: Cache voice states must be a boolean",
      );
      expect(() => cacheOptions.setCacheEmojis("true")).to.throw(
        TypeError,
        "GLUON: Cache emojis must be a boolean",
      );
      expect(() => cacheOptions.setCacheInvites("true")).to.throw(
        TypeError,
        "GLUON: Cache invites must be a boolean",
      );
      expect(() => cacheOptions.setCacheScheduledEvents("true")).to.throw(
        TypeError,
        "GLUON: Cache scheduled events must be a boolean",
      );
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const cacheOptions = new GluonCacheOptions({
        userTTL: 30,
        messageTTL: 30,
        cacheMessages: true,
        cacheUsers: true,
        cacheMembers: true,
        cacheChannels: true,
        cacheGuilds: true,
        cacheRoles: true,
        cacheVoiceStates: true,
        cacheEmojis: true,
        cacheInvites: true,
        cacheScheduledEvents: true,
      });
      const cacheOptionsString = cacheOptions.toString();
      expect(cacheOptionsString).to.equal(
        "GluonCacheOptions { GUILDS: true, USERS: true, CHANNELS: true, MESSAGES: true, ROLES: true, EMOJIS: true, INVITES: true, VOICE_STATES: true, MEMBERS: true, SCHEDULED_EVENTS: true, USER_TTL: 30, MESSAGE_TTL: 30 }",
      );
    });
  });
});
