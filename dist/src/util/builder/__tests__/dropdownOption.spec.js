import { expect } from "chai";
import { LIMITS } from "../../../constants.js";
import DropdownOption from "../dropdownOption.js";
describe("DropdownOption", function () {
  context("check import", function () {
    it("should be an object", function () {
      const dropdownOption = new DropdownOption();
      expect(dropdownOption).to.be.an("object");
    });
  });
  context("check setLabel", function () {
    it("should have method setLabel", function () {
      const dropdownOption = new DropdownOption();
      expect(dropdownOption).to.respondTo("setLabel");
    });
    it("should set the label of the dropdown option", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setLabel("test");
      expect(dropdownOption.label).to.equal("test");
    });
    it("should throw an error if no label is provided", function () {
      const dropdownOption = new DropdownOption();
      expect(() => dropdownOption.setLabel()).to.throw(
        TypeError,
        "GLUON: Dropdown option label must be provided.",
      );
    });
    it("should truncate the label if it exceeds the maximum length", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setLabel("a".repeat(LIMITS.MAX_DROPDOWN_OPTION_LABEL + 1));
      expect(dropdownOption.label.length).to.equal(
        LIMITS.MAX_DROPDOWN_OPTION_LABEL,
      );
    });
  });
  context("check setValue", function () {
    it("should have method setValue", function () {
      const dropdownOption = new DropdownOption();
      expect(dropdownOption).to.respondTo("setValue");
    });
    it("should set the value of the dropdown option", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setValue("test");
      expect(dropdownOption.value).to.equal("test");
    });
    it("should throw an error if no value is provided", function () {
      const dropdownOption = new DropdownOption();
      expect(() => dropdownOption.setValue()).to.throw(
        TypeError,
        "GLUON: Dropdown option value must be provided.",
      );
    });
    it("should throw an error if it exceeds the maximum length", function () {
      const dropdownOption = new DropdownOption();
      expect(() =>
        dropdownOption.setValue(
          "a".repeat(LIMITS.MAX_DROPDOWN_OPTION_VALUE + 1),
        ),
      ).to.throw(
        RangeError,
        `GLUON: Dropdown option value must be less than ${LIMITS.MAX_DROPDOWN_OPTION_VALUE} characters.`,
      );
    });
  });
  context("check setDescription", function () {
    it("should have method setDescription", function () {
      const dropdownOption = new DropdownOption();
      expect(dropdownOption).to.respondTo("setDescription");
    });
    it("should set the description of the dropdown option", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setDescription("test");
      expect(dropdownOption.description).to.equal("test");
    });
    it("should throw an error if no description is provided", function () {
      const dropdownOption = new DropdownOption();
      expect(() => dropdownOption.setDescription()).to.throw(
        TypeError,
        "GLUON: Dropdown option description must be provided.",
      );
    });
    it("should truncate the description if it exceeds the maximum length", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setDescription(
        "a".repeat(LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION + 1),
      );
      expect(dropdownOption.description.length).to.equal(
        LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION,
      );
    });
  });
  context("check setEmoji", function () {
    it("should have method setEmoji", function () {
      const dropdownOption = new DropdownOption();
      expect(dropdownOption).to.respondTo("setEmoji");
    });
    it("should set the emoji of the dropdown option", function () {
      const dropdownOption = new DropdownOption();
      dropdownOption.setEmoji("👍");
      expect(dropdownOption.emoji.name).to.equal("👍");
    });
    it("should throw an error if the emoji invalid", function () {
      const dropdownOption = new DropdownOption();
      expect(() => dropdownOption.setEmoji("test")).to.throw(
        TypeError,
        "GLUON: Dropdown option emoji must be provided.",
      );
    });
  });
});
//# sourceMappingURL=dropdownOption.spec.js.map
