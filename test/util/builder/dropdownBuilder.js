let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { LIMITS } = require("../../../src/constants");
const DropdownBuilder = require("../../../src/util/builder/dropdownBuilder");

describe("DropdownBuilder", function () {
  context("check import", function () {
    it("should be an object", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.be.an("object");
    });
  });

  context("check setType", () => {
    it("should have method setType", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setType");
    });

    it("should set the type of the dropdown", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setType(1);
      expect(dropdown.type).to.equal(1);
    });

    it("should throw an error if no type is provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setType()).to.throw(
        TypeError,
        "GLUON: Dropdown type must be a number."
      );
    });
  });

  context("check setCustomID", () => {
    it("should have method setCustomID", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setCustomID");
    });

    it("should set the custom id of the dropdown", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setCustomID("test");
      expect(dropdown.custom_id).to.equal("test");
    });

    it("should throw an error if no custom id is provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setCustomID()).to.throw(
        TypeError,
        "GLUON: Dropdown custom id must be provided."
      );
    });
    it("should throw an error if the custom id is too long", function () {
      const dropdown = new DropdownBuilder();
      expect(() =>
        dropdown.setCustomID("a".repeat(LIMITS.MAX_DROPDOWN_CUSTOM_ID + 1))
      ).to.throw(
        RangeError,
        `GLUON: Dropdown custom id must be less than ${LIMITS.MAX_DROPDOWN_CUSTOM_ID} characters.`
      );
    });
  });

  context("check addOption", () => {
    it("should have method addOption", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("addOption");
    });

    it("should add an option to the dropdown", function () {
      const dropdown = new DropdownBuilder();
      dropdown.addOption({ label: "test", value: "test" });
      expect(dropdown.options).to.have.lengthOf(1);
    });

    it("should throw an error if no option is provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.addOption()).to.throw(
        TypeError,
        "GLUON: Dropdown option must be provided."
      );
    });

    it("should throw an error if the options are too long", function () {
      const dropdown = new DropdownBuilder();
      dropdown.options = new Array(LIMITS.MAX_DROPDOWN_OPTIONS);
      expect(() =>
        dropdown.addOption({ label: "test", value: "test" })
      ).to.throw(
        RangeError,
        `GLUON: Dropdown options must be less than ${LIMITS.MAX_DROPDOWN_OPTIONS}.`
      );
    });
  });

  context("check addChannelTypes", () => {
    it("should have method addChannelTypes", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("addChannelTypes");
    });

    it("should set which channel types are selectable by the user", function () {
      const dropdown = new DropdownBuilder();
      dropdown.addChannelTypes([1, 2, 3]);
      expect(dropdown.channel_types).to.have.lengthOf(3);
    });

    it("should throw an error if no channel types are provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.addChannelTypes()).to.throw(
        TypeError,
        "GLUON: Dropdown channel types must be provided."
      );
    });

    it("should throw an error if the channel types are not an array", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.addChannelTypes(123)).to.throw(
        TypeError,
        "GLUON: Dropdown channel types must be an array."
      );
    });
  });

  context("check setPlaceholder", () => {
    it("should have method setPlaceholder", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setPlaceholder");
    });

    it("should set the placeholder text", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setPlaceholder("test");
      expect(dropdown.placeholder).to.equal("test");
    });

    it("should throw an error if no placeholder is provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setPlaceholder()).to.throw(
        TypeError,
        "GLUON: Dropdown placeholder must be provided."
      );
    });

    it("should truncate the placeholder text if it is too long", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setPlaceholder("a".repeat(LIMITS.MAX_DROPDOWN_PLACEHOLDER + 1));
      expect(dropdown.placeholder.length).to.equal(
        LIMITS.MAX_DROPDOWN_PLACEHOLDER
      );
    });
  });

  context("check setMinValue", () => {
    it("should have method setMinValue", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setMinValue");
    });

    it("should set the minimum number of values that must be chosen", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setMinValue(1);
      expect(dropdown.min_values).to.equal(1);
    });

    it("should throw an error if no minimum values are provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setMinValue()).to.throw(
        TypeError,
        "GLUON: Dropdown min value must be a number."
      );
    });
  });

  context("check setMaxValue", () => {
    it("should have method setMaxValue", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setMaxValue");
    });

    it("should set the max number of values that must be chosen", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setMaxValue(1);
      expect(dropdown.max_values).to.equal(1);
    });

    it("should throw an error if no maximum values are provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setMaxValue()).to.throw(
        TypeError,
        "GLUON: Dropdown max value must be a number."
      );
    });
  });

  context("check setDisabled", () => {
    it("should have method setDisabled", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("setDisabled");
    });

    it("should disable the dropdown from being clickable", function () {
      const dropdown = new DropdownBuilder();
      dropdown.setDisabled(true);
      expect(dropdown.disabled).to.be.true;
    });

    it("should throw an error if no disabled value is provided", function () {
      const dropdown = new DropdownBuilder();
      expect(() => dropdown.setDisabled()).to.throw(
        TypeError,
        "GLUON: Dropdown disabled must be a boolean."
      );
    });
  });

  context("check toJSON", () => {
    it("should have method toJSON", function () {
      const dropdown = new DropdownBuilder();
      expect(dropdown).to.respondTo("toJSON");
    });

    it("should return the dropdown as an object", function () {
      const dropdown = new DropdownBuilder();
      dropdown
        .setType(1)
        .setCustomID("test")
        .addOption({ label: "test", value: "test" })
        .addChannelTypes([1, 2, 3])
        .setPlaceholder("test")
        .setMinValue(1)
        .setMaxValue(1)
        .setDisabled(true);
      expect(dropdown.toJSON()).to.eql({
        type: 1,
        custom_id: "test",
        options: [{ label: "test", value: "test" }],
        channel_types: [1, 2, 3],
        placeholder: "test",
        min_values: 1,
        max_values: 1,
        disabled: true,
      });
    });
  });
});
