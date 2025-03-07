import { expect } from "chai";
import { spy } from "sinon";
import GuildScheduledEventManager from "../GuildScheduledEventManager.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../testData.js";
import { ScheduledEvent } from "../../structures.js";

describe("GuildScheduledEventManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildScheduledEventManager).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should create a new instance of GuildScheduledEventManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      expect(guildScheduledEventManager).to.be.an.instanceOf(
        GuildScheduledEventManager,
      );
      expect(guildScheduledEventManager).to.have.property("list");
      expect(guildScheduledEventManager).to.have.property("fetch");
      expect(guildScheduledEventManager).to.have.property("set");
    });
  });

  context("check input of constructor", function () {
    it("should throw an error if client is not a Client instance", function () {
      expect(() => new GuildScheduledEventManager()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error if guild is not a Guild instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      expect(() => new GuildScheduledEventManager(client)).to.throw(
        TypeError,
        "GLUON: Guild must be a valid guild instance.",
      );
    });
  });

  context("check set method", function () {
    it("should throw an error if event is not a ScheduledEvent instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      expect(() => guildScheduledEventManager.set("1234", {})).to.throw(
        TypeError,
        "GLUON: Event must be a ScheduledEvent instance.",
      );
    });
  });

  context("check fetch method", function () {
    it("should throw an error if event_id is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      await expect(guildScheduledEventManager.fetch(123456)).to.be.rejectedWith(
        TypeError,
        "GLUON: Scheduled event ID must be a string.",
      );
    });
    it("should return the event from the cache", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const event = new ScheduledEvent(client, TEST_DATA.SCHEDULED_EVENT, {
        guildId: guild.id,
      });
      const fetchedEvent = await guildScheduledEventManager.fetch("1234");
      expect(fetchedEvent).to.deep.equal(event);
    });
    it("should return an event", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const event = await guildScheduledEventManager.fetch("1234");
      expect(event).to.be.an.instanceOf(ScheduledEvent);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const request = spy(client.request, "makeRequest");
      await guildScheduledEventManager.fetch("1234");
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledOnceWith("getGuildScheduledEvent", [
        guild.id,
        "1234",
      ]);
    });
    it("should fetch a scheduled event from the API", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const event = await guildScheduledEventManager.fetch("1234");
      expect(event).to.be.an.instanceOf(ScheduledEvent);
    });
  });

  context("check list method", function () {
    it("should return an array of ScheduledEvent instances", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const events = await guildScheduledEventManager.list();
      expect(events).to.be.an.instanceOf(Array);
      expect(events[0]).to.be.an.instanceOf(ScheduledEvent);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const guildScheduledEventManager = new GuildScheduledEventManager(
        client,
        guild,
      );
      const request = spy(client.request, "makeRequest");
      await guildScheduledEventManager.list();
      expect(request).to.have.been.calledOnce;
      expect(request).to.have.been.calledOnceWith(
        "getListGuildScheduledEvents",
        [guild.id],
      );
    });
  });
});
