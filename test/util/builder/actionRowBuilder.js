let expect;
before(async () => {
  expect = (await import("chai")).expect;
});
const Button = require("../../../src/util/builder/buttonBuilder");
const ActionRow = require("../../../src/util/builder/actionRowBuilder");
const { COMPONENT_TYPES } = require("../../../src/constants");

describe("ActionRowBuilder", () => {
  context("check import", function () {
    it("should be an object", function () {
      const actionRow = new ActionRow();
      expect(actionRow).to.be.an("object");
    });
  });
  context("check addComponent", function () {
    it("should have method addComponent", function () {
      const actionRow = new ActionRow();
      expect(actionRow).to.respondTo("addComponent");
    });
    it("should add a component to the action row", function () {
      const actionRow = new ActionRow();
      const button = new Button()
        .setCustomID("custom_id")
        .setLabel("test")
        .setStyle(1);
      actionRow.addComponent(button);
      expect(actionRow.components).to.have.lengthOf(1);
    });
  });
  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const actionRow = new ActionRow();
      expect(actionRow).to.respondTo("toJSON");
    });
    it("should return the action row as an object", function () {
      const actionRow = new ActionRow();
      const button = new Button()
        .setCustomID("custom_id")
        .setLabel("test")
        .setStyle(1);
      actionRow.addComponent(button);
      expect(actionRow.toJSON()).to.deep.equal({
        type: COMPONENT_TYPES.ACTION_ROW,
        components: [
          {
            type: button.type,
            label: button.label,
            style: button.style,
            custom_id: button.custom_id,
          },
        ],
      });
    });
  });
});
