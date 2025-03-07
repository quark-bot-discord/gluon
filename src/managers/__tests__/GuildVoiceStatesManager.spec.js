import { expect } from "chai";
import GuildVoiceStatesManager from "../GuildVoiceStatesManager.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../testData.js";
import { VoiceState } from "../../structures.js";

describe("GuildVoiceStatesManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GuildVoiceStatesManager).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should create a new instance of GuildVoiceStatesManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const voiceStatesManager = new GuildVoiceStatesManager(client);
      expect(voiceStatesManager).to.be.an.instanceOf(GuildVoiceStatesManager);
      expect(voiceStatesManager).to.have.property("set");
    });
  });

  context("check set method", function () {
    it("should set a voice state", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const voiceStatesManager = new GuildVoiceStatesManager(client);
      const voiceState = new VoiceState(client, TEST_DATA.VOICE_STATE, {
        guildId: TEST_DATA.GUILD_ID,
      });
      voiceStatesManager.set(TEST_DATA.MEMBER_ID, voiceState);
      const fetchedVoiceState = voiceStatesManager.get(TEST_DATA.MEMBER_ID);
      expect(fetchedVoiceState).to.be.an.instanceOf(VoiceState);
    });
    it("should throw an error when the voice state is not a VoiceState instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const voiceStatesManager = new GuildVoiceStatesManager(client);
      expect(() => {
        voiceStatesManager.set("123456", {});
      }).to.throw(
        TypeError,
        "GLUON: VoiceState must be a VoiceState instance.",
      );
    });
  });
});
