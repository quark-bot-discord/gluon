let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { LIMITS } = require("../../../src/constants");
const CommandChoice = require("../../../src/util/builder/commandChoiceBuilder");
const CommandOptionBuilder = require("../../../src/util/builder/commandOptionBuilder");

describe("CommandOptionBuilder", () => {
  context("check import", () => {
    it("should be an object", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.be.an("object");
    });
  });

  context("check setName", () => {
    it("should have method setName", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setName");
    });
    it("should set the name of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setName("test");
      expect(commandOption.name).to.equal("test");
    });
    it("should allow for localisation of the name", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setName({ "en-GB": "test", "en-US": "test en-US" });
      expect(commandOption.name_localizations["en-GB"]).to.equal("test");
    });
    it("should throw an error if no name is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setName()).to.throw(
        TypeError,
        "GLUON: Command option name must be provided."
      );
    });
    it("should throw an error if the name is not a string or object", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setName(123)).to.throw(
        TypeError,
        "GLUON: Command option name must be a string or an object."
      );
    });
    it("should throw an error if the name is too long", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() =>
        commandOption.setName("a".repeat(LIMITS.MAX_COMMAND_OPTION_NAME + 1))
      ).to.throw(
        RangeError,
        `GLUON: Command option name must be less than ${LIMITS.MAX_COMMAND_OPTION_NAME} characters.`
      );
    });
  });

  context("check setDescription", () => {
    it("should have method setDescription", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setDescription");
    });
    it("should set the description of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setDescription("test");
      expect(commandOption.description).to.equal("test");
    });
    it("should allow for localisation of the description", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setDescription({ "en-GB": "test", "en-US": "test en-US" });
      expect(commandOption.description_localizations["en-GB"]).to.equal("test");
    });
    it("should throw an error if the description is not a string or object", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setDescription(123)).to.throw(
        TypeError,
        "GLUON: Command option description must be a string or an object."
      );
    });
    it("should throw an error if the description is too long", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() =>
        commandOption.setDescription(
          "a".repeat(LIMITS.MAX_COMMAND_OPTION_DESCRIPTION + 1)
        )
      ).to.throw(
        RangeError,
        `GLUON: Command option description must be less than ${LIMITS.MAX_COMMAND_OPTION_DESCRIPTION} characters.`
      );
    });
  });

  context("check setType", () => {
    it("should have method setType", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setType");
    });
    it("should set the type of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setType(3);
      expect(commandOption.type).to.equal(3);
    });
    it("should throw an error if no type is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setType()).to.throw(
        TypeError,
        "GLUON: Command option type must be a number."
      );
    });
    it("should throw an error if the type is not a number", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setType("test")).to.throw(
        TypeError,
        "GLUON: Command option type must be a number."
      );
    });
  });

  context("check setRequired", () => {
    it("should have method setRequired", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setRequired");
    });
    it("should set the required status of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setRequired(true);
      expect(commandOption.required).to.be.true;
    });
    it("should throw an error if the required status is not a boolean", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setRequired(123)).to.throw(
        TypeError,
        "GLUON: Command option required status must be a boolean."
      );
    });
  });

  context("check addChoice", () => {
    it("should have method addChoice", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("addChoice");
    });
    it("should add a choice to the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.addChoice({ name: "test", value: "testValue" });
      expect(commandOption.choices).to.have.lengthOf(1);
    });
    it("should throw an error if no choice is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.addChoice()).to.throw(
        TypeError,
        "GLUON: Command option choice must be provided."
      );
    });
    it("should throw an error if the choices limit is reached", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.choices = new Array(LIMITS.MAX_COMMAND_OPTION_CHOICES);
      expect(() =>
        commandOption.addChoice({ name: "test", value: "testValue" })
      ).to.throw(
        RangeError,
        `GLUON: Command option choices must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICES}.`
      );
    });
  });

  context("check addOption", () => {
    it("should have method addOption", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("addOption");
    });
    it("should add an option to the command option", () => {
      const commandOption = new CommandOptionBuilder();
      const option = { name: "test" };
      commandOption.addOption(option);
      expect(commandOption.options).to.include(option);
    });
    it("should throw an error if no option is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.addOption()).to.throw(
        TypeError,
        "GLUON: Command option must be provided."
      );
    });
    it("should throw an error if the options limit is reached", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.options = new Array(LIMITS.MAX_COMMAND_OPTIONS);
      expect(() => commandOption.addOption({ name: "test" })).to.throw(
        RangeError,
        `GLUON: Command option options must be less than ${LIMITS.MAX_COMMAND_OPTIONS}.`
      );
    });
  });

  context("check setChannelTypes", () => {
    it("should have method setChannelTypes", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setChannelTypes");
    });
    it("should set the channel types of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setChannelTypes([0, 1, 2]);
      expect(commandOption.channel_types).to.have.lengthOf(3);
    });
    it("should throw an error if no channel types are provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setChannelTypes()).to.throw(
        TypeError,
        "GLUON: Command option channel types must be provided."
      );
    });
    it("should throw an error if the channel types are not an array", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setChannelTypes(123)).to.throw(
        TypeError,
        "GLUON: Command option channel types must be an array."
      );
    });
  });

  context("check setMinValue", () => {
    it("should have method setMinValue", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setMinValue");
    });

    it("should set the minimum value of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setMinValue(1);
      expect(commandOption.min_value).to.equal(1);
    });

    it("should throw an error if no value is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setMinValue()).to.throw(
        TypeError,
        "GLUON: Command option min value must be a number."
      );
    });
  });

  context("check setMaxValue", () => {
    it("should have method setMaxValue", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setMaxValue");
    });

    it("should set the maximum value of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setMaxValue(1);
      expect(commandOption.max_value).to.equal(1);
    });

    it("should throw an error if no value is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setMaxValue()).to.throw(
        TypeError,
        "GLUON: Command option max value must be a number."
      );
    });
  });

  context("check setMinLength", () => {
    it("should have method setMinLength", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setMinLength");
    });

    it("should set the minimum length of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setMinLength(1);
      expect(commandOption.min_length).to.equal(1);
    });

    it("should throw an error if no length is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setMinLength()).to.throw(
        TypeError,
        "GLUON: Command option min length must be a number."
      );
    });
  });

  context("check setMaxLength", () => {
    it("should have method setMaxLength", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setMaxLength");
    });

    it("should set the maximum length of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setMaxLength(1);
      expect(commandOption.max_length).to.equal(1);
    });

    it("should throw an error if no length is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setMaxLength()).to.throw(
        TypeError,
        "GLUON: Command option max length must be a number."
      );
    });
  });

  context("check setAutocomplete", () => {
    it("should have method setAutoComplete", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setAutocomplete");
    });

    it("should set the auto complete status of the command option", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setAutocomplete(true);
      expect(commandOption.autocomplete).to.be.true;
    });

    it("should throw an error if autocomplete is not a boolean", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setAutocomplete(123)).to.throw(
        TypeError,
        "GLUON: Command option autocomplete must be a boolean."
      );
    });
  });

  context("check setDefaultLocale", () => {
    it("should have method setDefaultLocale", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("setDefaultLocale");
    });

    it("should set the default locale for localisation", () => {
      const commandOption = new CommandOptionBuilder();
      commandOption.setDefaultLocale("en-GB");
      expect(commandOption.defaultLocale).to.equal("en-GB");
    });

    it("should throw an error if no locale is provided", () => {
      const commandOption = new CommandOptionBuilder();
      expect(() => commandOption.setDefaultLocale()).to.throw(
        TypeError,
        "GLUON: Default locale must be provided."
      );
    });
  });

  context("check toJSON", () => {
    it("should have method toJSON", () => {
      const commandOption = new CommandOptionBuilder();
      expect(commandOption).to.respondTo("toJSON");
    });
    it("should return the command option as an object", () => {
      const commandOption = new CommandOptionBuilder();
      const choice = new CommandChoice()
        .setName("testChoiceName")
        .setValue("testChoiceValue");
      commandOption
        .setName("test")
        .setDescription("testDescription")
        .setType(3)
        .setRequired(true)
        .addChoice(choice)
        .addOption({ name: "test" })
        .setChannelTypes([0, 1, 2])
        .setMinValue(1)
        .setMaxValue(1)
        .setMinLength(1)
        .setMaxLength(1)
        .setAutocomplete(true)
        .setDefaultLocale("en-GB");

      const json = commandOption.toJSON();
      expect(json).to.deep.equal({
        name: "test",
        description: "testDescription",
        type: 3,
        required: true,
        choices: [choice],
        options: [{ name: "test" }],
        channel_types: [0, 1, 2],
        min_value: 1,
        max_value: 1,
        min_length: 1,
        max_length: 1,
        autocomplete: true,
        name_localizations: undefined,
        description_localizations: undefined,
      });
    });
  });
});
