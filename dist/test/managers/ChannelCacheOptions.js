import { expect } from "chai";
import ChannelCacheOptions from "../../src/managers/ChannelCacheOptions.js";
import { GLUON_CHANNEL_CACHING_OPTIONS } from "../../src/constants.js";
describe("ChannelCacheOptions", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(ChannelCacheOptions).to.be.a("function");
    });
  });
  context("check properties", function () {
    it("should have the correct structure", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      expect(channelCacheOptions).to.have.property("attributeCaching");
      expect(channelCacheOptions).to.have.property("referenceCaching");
      expect(channelCacheOptions).to.have.property("stickerCaching");
      expect(channelCacheOptions).to.have.property("webhookCaching");
      expect(channelCacheOptions).to.have.property("messageCaching");
      expect(channelCacheOptions).to.have.property("fileCaching");
      expect(channelCacheOptions).to.have.property("contentCaching");
      expect(channelCacheOptions).to.have.property("pollCaching");
      expect(channelCacheOptions).to.have.property("reactionCaching");
      expect(channelCacheOptions).to.have.property("embedCaching");
      expect(channelCacheOptions).to.have.property("setAttributeCaching");
      expect(channelCacheOptions).to.have.property("setReferenceCaching");
      expect(channelCacheOptions).to.have.property("setStickerCaching");
      expect(channelCacheOptions).to.have.property("setWebhookCaching");
      expect(channelCacheOptions).to.have.property("setMessageCaching");
      expect(channelCacheOptions).to.have.property("setFileCaching");
      expect(channelCacheOptions).to.have.property("setContentCaching");
      expect(channelCacheOptions).to.have.property("setPollCaching");
      expect(channelCacheOptions).to.have.property("setReactionCaching");
      expect(channelCacheOptions).to.have.property("setEmbedCaching");
      expect(channelCacheOptions).to.have.property("setDisableAll");
      expect(channelCacheOptions).to.have.property("toString");
    });
  });
  context("check attributeCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES,
      );
      expect(channelCacheOptions.attributeCaching).to.be.true;
    });
  });
  context("check referenceCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.REFERENCE,
      );
      expect(channelCacheOptions.referenceCaching).to.be.true;
    });
  });
  context("check stickerCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.STICKER,
      );
      expect(channelCacheOptions.stickerCaching).to.be.true;
    });
  });
  context("check webhookCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.WEBHOOK,
      );
      expect(channelCacheOptions.webhookCaching).to.be.true;
    });
  });
  context("check messageCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
      );
      expect(channelCacheOptions.messageCaching).to.be.true;
    });
  });
  context("check fileCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.FILES,
      );
      expect(channelCacheOptions.fileCaching).to.be.true;
    });
  });
  context("check contentCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.CONTENT,
      );
      expect(channelCacheOptions.contentCaching).to.be.true;
    });
  });
  context("check pollCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.POLL,
      );
      expect(channelCacheOptions.pollCaching).to.be.true;
    });
  });
  context("check reactionCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.REACTIONS,
      );
      expect(channelCacheOptions.reactionCaching).to.be.true;
    });
  });
  context("check embedCaching", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS,
      );
      expect(channelCacheOptions.embedCaching).to.be.true;
    });
  });
  context("check setAttributeCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setAttributeCaching(true);
      expect(channelCacheOptions.attributeCaching).to.be.true;
    });
  });
  context("check setReferenceCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setReferenceCaching(true);
      expect(channelCacheOptions.referenceCaching).to.be.true;
    });
  });
  context("check setStickerCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setStickerCaching(true);
      expect(channelCacheOptions.stickerCaching).to.be.true;
    });
  });
  context("check setWebhookCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setWebhookCaching(true);
      expect(channelCacheOptions.webhookCaching).to.be.true;
    });
  });
  context("check setMessageCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setMessageCaching(true);
      expect(channelCacheOptions.messageCaching).to.be.true;
    });
  });
  context("check setFileCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setFileCaching(true);
      expect(channelCacheOptions.fileCaching).to.be.true;
    });
  });
  context("check setContentCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setContentCaching(true);
      expect(channelCacheOptions.contentCaching).to.be.true;
    });
  });
  context("check setPollCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setPollCaching(true);
      expect(channelCacheOptions.pollCaching).to.be.true;
    });
  });
  context("check setReactionCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setReactionCaching(true);
      expect(channelCacheOptions.reactionCaching).to.be.true;
    });
  });
  context("check setEmbedCaching", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions();
      channelCacheOptions.setEmbedCaching(true);
      expect(channelCacheOptions.embedCaching).to.be.true;
    });
  });
  context("check setDisableAll", function () {
    it("should set the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.POLL |
          GLUON_CHANNEL_CACHING_OPTIONS.EMBEDS |
          GLUON_CHANNEL_CACHING_OPTIONS.ATTRIBUTES,
      );
      channelCacheOptions.setDisableAll();
      expect(channelCacheOptions.messageCaching).to.be.false;
      expect(channelCacheOptions.fileCaching).to.be.false;
      expect(channelCacheOptions.contentCaching).to.be.false;
      expect(channelCacheOptions.pollCaching).to.be.false;
      expect(channelCacheOptions.reactionCaching).to.be.false;
      expect(channelCacheOptions.embedCaching).to.be.false;
      expect(channelCacheOptions.attributeCaching).to.be.false;
      expect(channelCacheOptions.referenceCaching).to.be.false;
      expect(channelCacheOptions.webhookCaching).to.be.false;
      expect(channelCacheOptions.stickerCaching).to.be.false;
    });
  });
  context("check toString", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.FILES,
      );
      expect(channelCacheOptions.toString()).to.equal(
        "ChannelCacheOptions { MESSAGES: false, FILES: true, CONTENT: false, POLL: false, REACTIONS: false, EMBEDS: false, ATTRIBUTES: false, REFERENCE: false, WEBHOOK: false, STICKER: false }",
      );
    });
  });
  context("check toJSON", function () {
    it("should return the correct value", function () {
      const channelCacheOptions = new ChannelCacheOptions(
        GLUON_CHANNEL_CACHING_OPTIONS.FILES |
          GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
      );
      expect(channelCacheOptions.toJSON()).to.deep.equal(
        GLUON_CHANNEL_CACHING_OPTIONS.FILES |
          GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES,
      );
    });
  });
});
//# sourceMappingURL=ChannelCacheOptions.js.map
