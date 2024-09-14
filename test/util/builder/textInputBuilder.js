import { expect } from "chai";
import {
  LIMITS,
  COMPONENT_TYPES,
  TEXT_INPUT_STYLES,
} from "../../../src/constants.js";
import TextInputBuilder from "../../../src/util/builder/textInputBuilder.js";

describe("TextInputBuilder", function () {
  context("check import", function () {
    it("should be an object", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.be.an("object");
    });
  });

  context("check type", function () {
    it("should have the correct type", function () {
      const textInput = new TextInputBuilder();
      expect(textInput.type).to.equal(COMPONENT_TYPES.TEXT_INPUT);
    });
  });

  context("check setLabel", function () {
    it("should have method setLabel", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setLabel");
    });

    it("should set the label of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setLabel("test");
      expect(textInput.label).to.equal("test");
    });

    it("should throw an error if no label is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setLabel()).to.throw(
        TypeError,
        "GLUON: Text input label must be provided.",
      );
    });

    it("should truncate the label if it exceeds the maximum length", function () {
      const textInput = new TextInputBuilder();
      textInput.setLabel("a".repeat(LIMITS.MAX_TEXT_INPUT_LABEL + 1));
      expect(textInput.label.length).to.equal(LIMITS.MAX_TEXT_INPUT_LABEL);
    });
  });

  context("check setStyle", function () {
    it("should have method setStyle", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setStyle");
    });

    it("should set the style of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setStyle(TEXT_INPUT_STYLES.PARAGRAPH);
      expect(textInput.style).to.equal(TEXT_INPUT_STYLES.PARAGRAPH);
    });

    it("should throw an error if no style is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setStyle()).to.throw(
        TypeError,
        "GLUON: Text input style must be provided.",
      );
    });
  });

  context("check setCustomID", function () {
    it("should have method setCustomID", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setCustomID");
    });

    it("should set the custom id of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setCustomID("test");
      expect(textInput.custom_id).to.equal("test");
    });

    it("should throw an error if no custom id is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setCustomID()).to.throw(
        TypeError,
        "GLUON: Text input custom id must be provided.",
      );
    });
    it("should throw an error if the custom id is too long", function () {
      const textInput = new TextInputBuilder();
      expect(() =>
        textInput.setCustomID("a".repeat(LIMITS.MAX_TEXT_INPUT_CUSTOM_ID + 1)),
      ).to.throw(
        RangeError,
        `GLUON: Text input custom id must be less than ${LIMITS.MAX_TEXT_INPUT_CUSTOM_ID} characters.`,
      );
    });
  });

  context("check setValue", function () {
    it("should have method setValue", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setValue");
    });

    it("should set the value of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setValue("test");
      expect(textInput.value).to.equal("test");
    });

    it("should throw an error if no value is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setValue()).to.throw(
        TypeError,
        "GLUON: Text input value must be provided.",
      );
    });
  });

  context("check setPlaceholder", function () {
    it("should have method setPlaceholder", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setPlaceholder");
    });

    it("should set the placeholder of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setPlaceholder("test");
      expect(textInput.placeholder).to.equal("test");
    });

    it("should throw an error if no placeholder is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setPlaceholder()).to.throw(
        TypeError,
        "GLUON: Text input placeholder must be provided.",
      );
    });

    it("should truncate the placeholder if it exceeds the maximum length", function () {
      const textInput = new TextInputBuilder();
      textInput.setPlaceholder(
        "a".repeat(LIMITS.MAX_TEXT_INPUT_PLACEHOLDER + 1),
      );
      expect(textInput.placeholder.length).to.equal(
        LIMITS.MAX_TEXT_INPUT_PLACEHOLDER,
      );
    });
  });

  context("check setMinLength", function () {
    it("should have method setMinLength", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setMinLength");
    });

    it("should set the minimum length of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setMinLength(1);
      expect(textInput.min_length).to.equal(1);
    });

    it("should throw an error if no minimum length is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setMinLength()).to.throw(
        TypeError,
        "GLUON: Text input min length must be a number.",
      );
    });
  });

  context("check setMaxLength", function () {
    it("should have method setMaxLength", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("setMaxLength");
    });

    it("should set the maximum length of the text input", function () {
      const textInput = new TextInputBuilder();
      textInput.setMaxLength(1);
      expect(textInput.max_length).to.equal(1);
    });

    it("should throw an error if no maximum length is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.setMaxLength()).to.throw(
        TypeError,
        "GLUON: Text input max length must be a number.",
      );
    });
  });

  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const textInput = new TextInputBuilder();
      expect(textInput).to.respondTo("toJSON");
    });

    it("should return the correct Discord format for a text input", function () {
      const textInput = new TextInputBuilder();
      textInput
        .setLabel("testLabel")
        .setCustomID("testCustomId")
        .setPlaceholder("testPlaceholder")
        .setStyle(TEXT_INPUT_STYLES.PARAGRAPH)
        .setValue("testValue")
        .setMinLength(1)
        .setMaxLength(1);
      expect(textInput.toJSON()).to.deep.equal({
        type: COMPONENT_TYPES.TEXT_INPUT,
        label: "testLabel",
        custom_id: "testCustomId",
        placeholder: "testPlaceholder",
        style: TEXT_INPUT_STYLES.PARAGRAPH,
        min_length: 1,
        max_length: 1,
        value: "testValue",
      });
    });

    it("should throw an error if no label is provided", function () {
      const textInput = new TextInputBuilder();
      expect(() => textInput.toJSON()).to.throw(
        TypeError,
        "GLUON: Text input label must be provided.",
      );
    });

    it("should throw an error if no style is provided", function () {
      const textInput = new TextInputBuilder().setLabel("test");
      expect(() => textInput.toJSON()).to.throw(
        TypeError,
        "GLUON: Text input style must be provided.",
      );
    });

    it("should throw an error if no custom id is provided", function () {
      const textInput = new TextInputBuilder()
        .setLabel("test")
        .setStyle(TEXT_INPUT_STYLES.PARAGRAPH);
      expect(() => textInput.toJSON()).to.throw(
        TypeError,
        "GLUON: Text input custom id must be provided.",
      );
    });
  });
});
