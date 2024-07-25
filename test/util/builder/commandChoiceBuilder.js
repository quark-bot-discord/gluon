import { expect } from "chai";
import { LIMITS } from "../../../src/constants.js";
import CommandChoiceBuilder from "../../../src/util/builder/commandChoiceBuilder.js";

describe("CommandChoiceBuilder", function () {
  context("check import", function () {
    it("should be an object", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(commandChoice).to.be.an("object");
    });
  });

  context("check setName", function () {
    it("should have method setName", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(commandChoice).to.respondTo("setName");
    });
    it("should set the name of the command choice", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice.setName("test");
      expect(commandChoice.name).to.equal("test");
    });
    it("should allow for localisation of the name", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice.setName({ "en-US": "test" });
      expect(commandChoice.name).to.equal("test");
    });
    it("should throw an error if no name is provided", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() => commandChoice.setName()).to.throw(
        TypeError,
        "GLUON: Command choice name must be provided.",
      );
    });
    it("should throw an error if the name is not a string or object", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() => commandChoice.setName(123)).to.throw(
        TypeError,
        "GLUON: Command choice name must be a string or an object.",
      );
    });
    it("should throw an error if the name is too long", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() =>
        commandChoice.setName(
          "a".repeat(LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME + 1),
        ),
      ).to.throw(
        RangeError,
        `GLUON: Command choice name must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME} characters.`,
      );
    });
  });

  context("check setValue", function () {
    it("should have method setValue", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(commandChoice).to.respondTo("setValue");
    });
    it("should set the value of the command choice", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice.setValue("test");
      expect(commandChoice.value).to.equal("test");
    });
    it("should throw an error if no value is provided", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() => commandChoice.setValue()).to.throw(
        TypeError,
        "GLUON: Command choice value must be provided.",
      );
    });
    it("should throw an error if the value is too long", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() =>
        commandChoice.setValue(
          "a".repeat(LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE + 1),
        ),
      ).to.throw(
        RangeError,
        `GLUON: Command choice value must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE} characters.`,
      );
    });
  });

  context("check setDefaultLocale", function () {
    it("should have method setDefaultLocale", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(commandChoice).to.respondTo("setDefaultLocale");
    });
    it("should set the default locale for localisation", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice.setDefaultLocale("en-GB");
      expect(commandChoice.defaultLocale).to.equal("en-GB");
    });
    it("should throw an error if no locale is provided", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(() => commandChoice.setDefaultLocale()).to.throw(
        TypeError,
        "GLUON: Default locale must be provided.",
      );
    });
  });

  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const commandChoice = new CommandChoiceBuilder();
      expect(commandChoice).to.respondTo("toJSON");
    });
    it("should return the command choice as an object", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice.setName("test").setValue("testValue");
      expect(commandChoice.toJSON()).to.deep.equal({
        name: "test",
        name_localizations: undefined,
        value: "testValue",
      });
    });
    it("should return the command choice as an object with localisation", function () {
      const commandChoice = new CommandChoiceBuilder();
      commandChoice
        .setName({ "en-US": "test", "en-GB": "testGB" })
        .setValue("testValue");
      expect(commandChoice.toJSON()).to.deep.equal({
        name: "test",
        name_localizations: { "en-GB": "testGB" },
        value: "testValue",
      });
    });
  });
});
