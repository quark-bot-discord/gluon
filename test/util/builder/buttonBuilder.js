let expect;
before(async () => {
  expect = (await import("chai")).expect;
});
const { COMPONENT_TYPES } = require("../../../src/constants");
const Button = require("../../../src/util/builder/buttonBuilder");

describe("ButtonBuilder", () => {
  context("check import", function () {
    it("should be an object", function () {
      const button = new Button();
      expect(button).to.be.an("object");
    });
  });

  context("check setLabel", function () {
    it("should have method setLabel", function () {
      const button = new Button();
      expect(button).to.respondTo("setLabel");
    });
    it("should set the label of the button", function () {
      const button = new Button();
      button.setLabel("test");
      expect(button.label).to.equal("test");
    });
    it("should throw an error if no label is provided", function () {
      const button = new Button();
      expect(() => button.setLabel()).to.throw(
        TypeError,
        "GLUON: Button label must be provided.",
      );
    });
  });

  context("check setEmoji", function () {
    it("should have method setEmoji", function () {
      const button = new Button();
      expect(button).to.respondTo("setEmoji");
    });
    it("should set the emoji of the button", function () {
      const button = new Button();
      button.setEmoji("👍");
      expect(button.emoji.name).to.equal("👍");
    });
    it("should set the emoji id of the button", function () {
      const button = new Button();
      button.setEmoji("<:bitcoin:844240546246950922>");
      expect(button.emoji.id).to.equal("844240546246950922");
      expect(button.emoji.name).to.equal("bitcoin");
      expect(button.emoji.animated).to.equal(false);
    });
    it("should throw an error if no emoji is provided", function () {
      const button = new Button();
      expect(() => button.setEmoji()).to.throw(
        TypeError,
        "GLUON: The emoji must be a string.",
      );
    });
    it("should throw an error if string is not an emoji", function () {
      const button = new Button();
      expect(() => button.setEmoji("test")).to.throw(
        TypeError,
        "GLUON: Button emoji must be provided.",
      );
    });
  });

  context("check setStyle", function () {
    it("should have method setStyle", function () {
      const button = new Button();
      expect(button).to.respondTo("setStyle");
    });
    it("should set the style of the button", function () {
      const button = new Button();
      button.setStyle(1);
      expect(button.style).to.equal(1);
    });
  });

  context("check setCustomID", function () {
    it("should have method setCustomID", function () {
      const button = new Button();
      expect(button).to.respondTo("setCustomID");
    });
    it("should set the custom id of the button", function () {
      const button = new Button();
      button.setCustomID("custom_id");
      expect(button.custom_id).to.equal("custom_id");
    });
  });

  context("check setURL", function () {
    it("should have method setURL", function () {
      const button = new Button();
      expect(button).to.respondTo("setURL");
    });
    it("should set the url of the button", function () {
      const button = new Button();
      button.setURL("https://example.com");
      expect(button.url).to.equal("https://example.com");
    });
  });

  context("check setDisabled", function () {
    it("should have method setDisabled", function () {
      const button = new Button();
      expect(button).to.respondTo("setDisabled");
    });
    it("should set the disabled status of the button", function () {
      const button = new Button();
      button.setDisabled(true);
      expect(button.disabled).to.equal(true);
    });
  });

  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const button = new Button();
      expect(button).to.respondTo("toJSON");
    });
    it("should return the button as an object", function () {
      const button = new Button()
        .setCustomID("custom_id")
        .setLabel("test")
        .setDisabled(true)
        .setEmoji("👍")
        .setStyle(1);
      expect(button.toJSON()).to.deep.equal({
        type: COMPONENT_TYPES.BUTTON,
        disabled: true,
        label: "test",
        style: 1,
        emoji: { name: "👍", id: null },
        url: undefined,
        custom_id: "custom_id",
      });
    });
  });
});
