import { expect } from "chai";
import { LIMITS } from "../../../constants.js";
import Button from "../buttonBuilder.js";
import { ButtonStyle, ComponentType } from "#typings/discord.js";

describe("ButtonBuilder", function () {
  context("check import", function () {
    it("should be an object", function () {
      const button = new Button();
      expect(button).to.be.an("object");
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const button = new Button();
      expect(button.type).to.equal(ComponentType.Button);
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
    it("should truncate the label if it exceeds the maximum length", function () {
      const button = new Button();
      button.setLabel("a".repeat(LIMITS.MAX_BUTTON_LABEL + 1));
      expect(button.label.length).to.equal(LIMITS.MAX_BUTTON_LABEL);
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
    it("should throw an error if no style is provided", function () {
      const button = new Button();
      expect(() => button.setStyle()).to.throw(
        TypeError,
        "GLUON: Button style must be provided.",
      );
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
    it("should throw an error if no custom id is provided", function () {
      const button = new Button();
      expect(() => button.setCustomID()).to.throw(
        TypeError,
        "GLUON: Button custom id must be provided for non-link buttons.",
      );
    });
    it("should throw an error if custom id exceeds the maximum length", function () {
      const button = new Button();
      expect(() =>
        button.setCustomID("a".repeat(LIMITS.MAX_BUTTON_CUSTOM_ID + 1)),
      ).to.throw(
        RangeError,
        `GLUON: Button custom id must be under ${LIMITS.MAX_BUTTON_CUSTOM_ID} characters.`,
      );
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
        type: ComponentType.Button,
        disabled: true,
        label: "test",
        style: 1,
        emoji: { name: "👍", id: null },
        url: undefined,
        custom_id: "custom_id",
      });
    });
    it("should throw an error if no label is provided", function () {
      const button = new Button();
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button label must be provided.",
      );
    });
    it("should throw an error if no custom id is provided", function () {
      const button = new Button()
        .setLabel("test")
        .setStyle(ButtonStyle.Primary);
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button custom id must be provided for non-link buttons.",
      );
    });
    it("should throw an error if no url is provided", function () {
      const button = new Button().setLabel("test").setStyle(ButtonStyle.Link);
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button url must be provided for link buttons.",
      );
    });
    it("should throw an error if custom id is provided for link buttons", function () {
      const button = new Button()
        .setLabel("test")
        .setStyle(ButtonStyle.Link)
        .setURL("https://example.com")
        .setCustomID("custom_id");
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button custom id must not be provided for link buttons.",
      );
    });
    it("should throw an error if url is provided for non-link buttons", function () {
      const button = new Button()
        .setLabel("test")
        .setStyle(ButtonStyle.Primary)
        .setCustomID("custom_id")
        .setURL("https://example.com");
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button url must not be provided for non-link buttons.",
      );
    });
    it("should throw an error if emoji is provided for link buttons", function () {
      const button = new Button()
        .setLabel("test")
        .setStyle(ButtonStyle.Link)
        .setEmoji("👍")
        .setURL("https://example.com");
      expect(() => button.toJSON()).to.throw(
        TypeError,
        "GLUON: Button emoji must not be provided for link buttons.",
      );
    });
  });
});
