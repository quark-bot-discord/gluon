import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import ScheduledEvent from "../../src/structures/ScheduledEvent.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("ScheduledEvent", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ScheduledEvent).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent).to.have.property("id");
      expect(scheduledEvent).to.have.property("guildId");
      expect(scheduledEvent).to.have.property("scheduledStartTime");
      expect(scheduledEvent).to.have.property("scheduledEndTime");
      expect(scheduledEvent).to.have.property("userCount");
      expect(scheduledEvent).to.have.property("location");
      expect(scheduledEvent).to.have.property("toString");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.id).to.equal(TEST_DATA.SCHEDULED_EVENT.id);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.guild).to.be.an.instanceOf(Guild);
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.name).to.equal(TEST_DATA.SCHEDULED_EVENT.name);
    });
  });

  context("check creatorId", function () {
    it("should have the correct creatorId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.creatorId).to.equal(
        TEST_DATA.SCHEDULED_EVENT.creator_id,
      );
    });
  });

  context("check creator", function () {
    it("should have the correct creator", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.creator).to.be.an.instanceOf(User);
      expect(scheduledEvent.creator.id).to.be.equal(
        TEST_DATA.SCHEDULED_EVENT.creator.id,
      );
    });
  });

  context("check displayImageURL", function () {
    it("should have the correct displayImageURL", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.displayImageURL).to.equal(
        `https://cdn.discordapp.com/guild-events/123409989012345678/${TEST_DATA.SCHEDULED_EVENT.image}.png`,
      );
    });
  });

  context("check description", function () {
    it("should have the correct description", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.description).to.equal(
        TEST_DATA.SCHEDULED_EVENT.description,
      );
    });
  });

  context("check entityType", function () {
    it("should have the correct entityType", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.entityType).to.equal("VOICE");
    });
    it("should have the correct entityType", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT_EXTERNAL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.entityType).to.equal("EXTERNAL");
    });
  });

  context("check status", function () {
    it("should have the correct status", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.status).to.equal("SCHEDULED");
    });
  });

  context("check scheduledStartTime", function () {
    it("should have the correct scheduledStartTime", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.scheduledStartTime).to.equal(
        (new Date(TEST_DATA.SCHEDULED_EVENT.scheduled_start_time).getTime() /
          1000) |
          0,
      );
    });
  });

  context("check scheduledEndTime", function () {
    it("should have the correct scheduledEndTime", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.scheduledEndTime).to.equal(
        (new Date(TEST_DATA.SCHEDULED_EVENT.scheduled_end_time) / 1000) | 0,
      );
    });
  });

  context("check userCount", function () {
    it("should have the correct userCount", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.userCount).to.equal(
        TEST_DATA.SCHEDULED_EVENT.user_count,
      );
    });
  });

  context("check location", function () {
    it("should have the correct location", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT_EXTERNAL,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.location).to.equal(
        TEST_DATA.SCHEDULED_EVENT_EXTERNAL.entity_metadata.location,
      );
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.toString()).to.equal(
        `<ScheduledEvent: ${TEST_DATA.SCHEDULED_EVENT.id}>`,
      );
    });
  });

  context("check toJSON", function () {
    it("should return an object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.toJSON()).to.be.a("object");
    });
    it("should return the correct object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const scheduledEvent = new ScheduledEvent(
        client,
        TEST_DATA.SCHEDULED_EVENT,
        { guild_id: TEST_DATA.GUILD_ID },
      );
      expect(scheduledEvent.toJSON()).to.deep.equal({
        id: TEST_DATA.SCHEDULED_EVENT.id,
        creator: {
          id: TEST_DATA.SCHEDULED_EVENT.creator.id,
          username: TEST_DATA.SCHEDULED_EVENT.creator.username,
          discriminator: TEST_DATA.SCHEDULED_EVENT.creator.discriminator,
          avatar: TEST_DATA.SCHEDULED_EVENT.creator.avatar,
          bot: TEST_DATA.SCHEDULED_EVENT.creator.bot,
          global_name: TEST_DATA.SCHEDULED_EVENT.creator.global_name,
        },
        creator_id: TEST_DATA.SCHEDULED_EVENT.creator_id,
        description: TEST_DATA.SCHEDULED_EVENT.description,
        entity_type: 2,
        guild_id: TEST_DATA.GUILD_ID,
        image: TEST_DATA.SCHEDULED_EVENT.image,
        user_count: TEST_DATA.SCHEDULED_EVENT.user_count,
        status: 1,
        scheduled_start_time:
          ((new Date(TEST_DATA.SCHEDULED_EVENT.scheduled_start_time).getTime() /
            1000) |
            0) *
          1000,
        scheduled_end_time:
          ((new Date(TEST_DATA.SCHEDULED_EVENT.scheduled_end_time).getTime() /
            1000) |
            0) *
          1000,
        name: TEST_DATA.SCHEDULED_EVENT.name,
        entity_metadata: {
          location: TEST_DATA.SCHEDULED_EVENT.entity_metadata.location,
        },
      });
    });
  });
});
