import { expect } from "chai";
import { spy } from "sinon";
import ChannelMessageManager from "../../src/managers/ChannelMessageManager.js";
import {
  TEST_CLIENTS,
  TEST_GUILDS,
  TEST_CHANNELS,
  TEST_ROLES,
  TEST_DATA,
  TEST_MEMBERS,
} from "../../src/testData.js";
import { Message } from "../../src/structures.js";

describe("ChannelMessageManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ChannelMessageManager).to.be.a("function");
    });
  });

  context("check properties", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      expect(channelMessageManager).to.have.property("guild");
      expect(channelMessageManager).to.have.property("fetch");
      expect(channelMessageManager).to.have.property("fetchPinned");
      expect(channelMessageManager).to.have.property("set");
      expect(channelMessageManager).to.have.property("guild");
      expect(ChannelMessageManager).to.have.property("getCacheManager");
      expect(ChannelMessageManager).to.have.property("fetchMessage");
      expect(ChannelMessageManager).to.have.property("getMessage");
      expect(ChannelMessageManager).to.have.property("fetchMessages");
      expect(ChannelMessageManager).to.have.property("purgeChannelMessages");
    });
  });

  context("check guild", function () {
    it("should return the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      expect(channelMessageManager.guild).to.deep.equal(guild);
    });
  });

  context("check set", function () {
    it("should set the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channelId: channel.id,
        guildId: guild.id,
      });
      channelMessageManager.set(TEST_DATA.MESSAGE_ID, message);
      expect(channelMessageManager.get(TEST_DATA.MESSAGE_ID)).to.deep.equal(
        message,
      );
    });
    it("should throw an error when the message is not a Message instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      expect(() =>
        channelMessageManager.set(TEST_DATA.MESSAGE_ID, {}),
      ).to.throw(TypeError, "GLUON: Message must be a Message instance.");
    });
  });

  context("check fetch", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      expect(channelMessageManager.fetch).to.be.a("function");
    });
    it("should return the correct value", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      const messages = await channelMessageManager.fetch(TEST_DATA.MESSAGE_ID);
      expect(messages).to.be.an.instanceOf(Message);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      const request = spy(client.request, "makeRequest");
      await channelMessageManager.fetch(TEST_DATA.MESSAGE_ID);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessage", [
        TEST_DATA.TEXT_CHANNEL.id,
        TEST_DATA.MESSAGE_ID,
      ]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
  });
  it("should return the correct value when multiple messages are fetched", async function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    TEST_ROLES.GENERIC_ADMIN_ROLE(client);
    TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
    TEST_MEMBERS.CLIENT_MEMBER(client);
    const channelMessageManager = new ChannelMessageManager(
      client,
      guild,
      channel,
    );
    const messages = await channelMessageManager.fetch({});
    expect(messages).to.be.an("array");
    expect(messages[0]).to.be.an.instanceOf(Message);
  });
  it("should call makeRequest with the correct arguments when multiple messages are fetched", async function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
    TEST_ROLES.GENERIC_ADMIN_ROLE(client);
    TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
    TEST_MEMBERS.CLIENT_MEMBER(client);
    const channelMessageManager = new ChannelMessageManager(
      client,
      guild,
      channel,
    );
    const request = spy(client.request, "makeRequest");
    await channelMessageManager.fetch({ limit: 50 });
    expect(request).to.be.calledOnce;
    expect(request).to.be.calledOnceWith("getChannelMessages", [
      TEST_DATA.TEXT_CHANNEL.id,
    ]);
    expect(request.firstCall.args[2]).to.deep.equal({ limit: 50 });
  });

  context("check fetchPinned", function () {
    it("should be a function", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      expect(channelMessageManager.fetchPinned).to.be.a("function");
    });
    it("should return the correct value", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      const messages = await channelMessageManager.fetchPinned();
      expect(messages).to.be.an("array");
      expect(messages[0]).to.be.an.instanceOf(Message);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const channelMessageManager = new ChannelMessageManager(
        client,
        guild,
        channel,
      );
      const request = spy(client.request, "makeRequest");
      await channelMessageManager.fetchPinned();
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelPins", [
        TEST_DATA.TEXT_CHANNEL.id,
      ]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
  });

  context("check getCacheManager", function () {
    it("should return the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const cacheManager = ChannelMessageManager.getCacheManager(
        client,
        guild.id,
        channel.id,
      );
      expect(cacheManager).to.be.an("object");
      expect(cacheManager).to.be.an.instanceOf(ChannelMessageManager);
    });
    it("should throw an error when the client is not a Client instance", function () {
      expect(() => ChannelMessageManager.getCacheManager()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", function () {
      expect(() =>
        ChannelMessageManager.getCacheManager(
          TEST_CLIENTS.ALL_CACHES_ENABLED(),
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
    it("should throw an error when the channelId is not a string", function () {
      expect(() =>
        ChannelMessageManager.getCacheManager(
          TEST_CLIENTS.ALL_CACHES_ENABLED(),
          TEST_DATA.GUILD_ID,
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Channel ID must be a string.");
    });
  });

  context("check getMessage", function () {
    it("should return the correct value", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      channel.messages.set(
        TEST_DATA.MESSAGE_ID,
        new Message(client, TEST_DATA.MESSAGE, {
          channelId: channel.id,
          guildId: guild.id,
        }),
      );
      const message = ChannelMessageManager.getMessage(
        client,
        guild.id,
        channel.id,
        TEST_DATA.MESSAGE_ID,
      );
      expect(message).to.be.an.instanceOf(Message);
      expect(message.id).to.equal(TEST_DATA.MESSAGE_ID);
    });
    it("should throw an error when the client is not a Client instance", function () {
      expect(() => ChannelMessageManager.getMessage()).to.throw(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", function () {
      expect(() =>
        ChannelMessageManager.getMessage(
          TEST_CLIENTS.ALL_CACHES_ENABLED(),
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Guild ID must be a string.");
    });
    it("should throw an error when the channelId is not a string", function () {
      expect(() =>
        ChannelMessageManager.getMessage(
          TEST_CLIENTS.ALL_CACHES_ENABLED(),
          TEST_DATA.GUILD_ID,
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Channel ID must be a string.");
    });
    it("should throw an error when the messageId is not a string", function () {
      expect(() =>
        ChannelMessageManager.getMessage(
          TEST_CLIENTS.ALL_CACHES_ENABLED(),
          TEST_DATA.GUILD_ID,
          TEST_DATA.CHANNEL_ID,
          123456,
        ),
      ).to.throw(TypeError, "GLUON: Message ID must be a string.");
    });
  });

  context("check fetchMessage", function () {
    it("should return the correct value", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const message = ChannelMessageManager.fetchMessage(
        client,
        guild.id,
        channel.id,
        TEST_DATA.MESSAGE_ID,
      );
      await expect(message).to.eventually.be.an.instanceOf(Message);
      await expect(message).to.eventually.have.property(
        "id",
        TEST_DATA.MESSAGE_ID,
      );
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessage(
        client,
        guild.id,
        channel.id,
        TEST_DATA.MESSAGE_ID,
      );
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessage", [
        channel.id,
        TEST_DATA.MESSAGE_ID,
      ]);
    });
    it("should throw an error when the client is not a Client instance", function () {
      const fetchMessage = ChannelMessageManager.fetchMessage();
      expect(fetchMessage).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", function () {
      const fetchMessage = ChannelMessageManager.fetchMessage(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        123456,
        TEST_DATA.CHANNEL_ID,
        TEST_DATA.MESSAGE_ID,
      );
      expect(fetchMessage).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID must be a string.",
      );
    });
    it("should throw an error when the channelId is not a string", function () {
      const fetchMessage = ChannelMessageManager.fetchMessage(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        123456,
        TEST_DATA.MESSAGE_ID,
      );
      expect(fetchMessage).to.be.rejectedWith(
        TypeError,
        "GLUON: Channel ID must be a string.",
      );
    });
    it("should throw an error when the messageId is not a string", function () {
      const fetchMessage = ChannelMessageManager.fetchMessage(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        123456,
      );
      expect(fetchMessage).to.be.rejectedWith(
        TypeError,
        "GLUON: Message ID must be a string.",
      );
    });
  });

  context("check fetchMessages", function () {
    it("should return the correct value", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const messages = await ChannelMessageManager.fetchMessages(
        client,
        guild.id,
        channel.id,
      );
      expect(messages).to.be.an("array");
      expect(messages[0]).to.be.an.instanceOf(Message);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id]);
    });
    it("should throw an error when the client is not a Client instance", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages();
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        123456,
        TEST_DATA.CHANNEL_ID,
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID must be a string.",
      );
    });
    it("should throw an error when the channelId is not a string", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        123456,
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Channel ID must be a string.",
      );
    });
    it("should throw an error when the limit is not a number", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: null },
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Limit must be a number.",
      );
    });
    it("should throw an error when the limit is less than 1", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: -1 },
      );
      expect(fetchMessages).to.be.rejectedWith(
        RangeError,
        "GLUON: Limit must be at least 1.",
      );
    });
    it("should throw an error when the limit is greater than 100", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        101,
      );
      expect(fetchMessages).to.be.rejectedWith(
        RangeError,
        "GLUON: Limit must be at most 100.",
      );
    });
    it("should throw an error when the before is not a string", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: 50, before: null },
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Before must be a string.",
      );
    });
    it("should throw an error when the after is not a string", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: 50, after: null },
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: After must be a string.",
      );
    });
    it("should throw an error when the around is not a string", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: 50, around: null },
      );
      expect(fetchMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Around must be a string.",
      );
    });
    it("should throw an error if before, after, and around are all provided", function () {
      const fetchMessages = ChannelMessageManager.fetchMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        TEST_DATA.CHANNEL_ID,
        { limit: 50, before: "123456", after: "123456", around: "123456" },
      );
      expect(fetchMessages).to.be.rejectedWith(
        Error,
        "GLUON: Only one of before, after, or around may be provided.",
      );
    });
    it("should make a request with the correct arguments when before is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id, {
        limit: 50,
        before: "123456",
      });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id], {
        limit: 50,
        before: "123456",
      });
    });
    it("should make a request with the correct arguments when after is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id, {
        limit: 50,
        after: "123456",
      });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id], {
        limit: 50,
        after: "123456",
      });
    });
    it("should make a request with the correct arguments when around is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id, {
        limit: 50,
        around: "123456",
      });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id], {
        limit: 50,
        around: "123456",
      });
    });
    it("should make a request with the correct arguments when limit is provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id, {
        limit: 50,
      });
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id], {
        limit: 50,
      });
    });
    it("should make a request with the correct arguments when limit is not provided", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      TEST_ROLES.GENERIC_ADMIN_ROLE(client);
      TEST_DATA.CLIENT_MEMBER.roles = [TEST_DATA.ROLE_ADMIN.id];
      TEST_MEMBERS.CLIENT_MEMBER(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.fetchMessages(client, guild.id, channel.id);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getChannelMessages", [channel.id]);
    });
  });

  context("check purgeChannelMessages", function () {
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const channel = TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const request = spy(client.request, "makeRequest");
      await ChannelMessageManager.purgeChannelMessages(client, channel.id, [
        TEST_DATA.MESSAGE_ID,
      ]);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith(
        "postBulkDeleteMessages",
        [channel.id],
        { messages: [TEST_DATA.MESSAGE_ID] },
      );
    });
    it("should throw an error when the client is not a Client instance", function () {
      const purgeChannelMessages = ChannelMessageManager.purgeChannelMessages();
      expect(purgeChannelMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Client must be a Client instance.",
      );
    });
    it("should throw an error when the guildId is not a string", function () {
      const purgeChannelMessages = ChannelMessageManager.purgeChannelMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        123456,
        TEST_DATA.CHANNEL_ID,
      );
      expect(purgeChannelMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Guild ID must be a string.",
      );
    });
    it("should throw an error when the channelId is not a string", function () {
      const purgeChannelMessages = ChannelMessageManager.purgeChannelMessages(
        TEST_CLIENTS.ALL_CACHES_ENABLED(),
        TEST_DATA.GUILD_ID,
        123456,
      );
      expect(purgeChannelMessages).to.be.rejectedWith(
        TypeError,
        "GLUON: Channel ID must be a string.",
      );
    });
  });
});