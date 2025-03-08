import { expect } from "chai";
import { cacheChannel } from "../cacheChannel.js";
import CategoryChannel from "../../../structures/CategoryChannel.js";
import TextChannel from "../../../structures/TextChannel.js";
import Thread from "../../../structures/Thread.js";
import VoiceChannel from "../../../structures/VoiceChannel.js";
import { ChannelType } from "#typings/discord.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "#src/testData.js";
import Sinon from "sinon";
describe("cacheChannel", function () {
  let client;
  let guild;
  let guildId;
  beforeEach(function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    guild = TEST_GUILDS.ALL_CACHES_ENABLED(client);
    guildId = guild.id;
  });
  it("should return a VoiceChannel instance for GuildVoice and GuildStageVoice types", function () {
    const voiceChannelData = { ...TEST_DATA.VOICE_CHANNEL };
    const stageVoiceChannelData = { ...TEST_DATA.VOICE_CHANNEL };
    Sinon.replace(stageVoiceChannelData, "type", ChannelType.GuildStageVoice);
    const voiceChannel = cacheChannel(client, voiceChannelData, guildId);
    const stageVoiceChannel = cacheChannel(
      client,
      stageVoiceChannelData,
      guildId,
    );
    expect(voiceChannel).to.be.instanceOf(VoiceChannel);
    expect(stageVoiceChannel).to.be.instanceOf(VoiceChannel);
  });
  it("should return a Thread instance for AnnouncementThread, PublicThread, and PrivateThread types", function () {
    const announcementThreadData = { ...TEST_DATA.THREAD };
    Sinon.replace(
      announcementThreadData,
      "type",
      ChannelType.AnnouncementThread,
    );
    const publicThreadData = { ...TEST_DATA.THREAD };
    Sinon.replace(publicThreadData, "type", ChannelType.PublicThread);
    const privateThreadData = { ...TEST_DATA.THREAD };
    Sinon.replace(privateThreadData, "type", ChannelType.PrivateThread);
    const announcementThread = cacheChannel(
      client,
      announcementThreadData,
      guildId,
    );
    const publicThread = cacheChannel(client, publicThreadData, guildId);
    const privateThread = cacheChannel(client, privateThreadData, guildId);
    expect(announcementThread).to.be.instanceOf(Thread);
    expect(publicThread).to.be.instanceOf(Thread);
    expect(privateThread).to.be.instanceOf(Thread);
  });
  it("should return a CategoryChannel instance for GuildCategory type", function () {
    const categoryChannelData = { ...TEST_DATA.CATEGORY_CHANNEL };
    const categoryChannel = cacheChannel(client, categoryChannelData, guildId);
    expect(categoryChannel).to.be.instanceOf(CategoryChannel);
  });
  it("should return a TextChannel instance for all other types", function () {
    const textChannelData = { ...TEST_DATA.TEXT_CHANNEL };
    const textChannel = cacheChannel(client, textChannelData, guildId);
    expect(textChannel).to.be.instanceOf(TextChannel);
  });
});
//# sourceMappingURL=cacheChannel.spec.js.map
