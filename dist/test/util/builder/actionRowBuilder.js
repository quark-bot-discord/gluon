import { expect } from "chai";
import Button from "../../../src/util/builder/buttonBuilder.js";
import ActionRow from "../../../src/util/builder/actionRowBuilder.js";
import { COMPONENT_TYPES } from "../../../src/constants.js";
describe("ActionRowBuilder", () => {
  context("check import", function () {
    it("should be an object", function () {
      const actionRow = new ActionRow();
      expect(actionRow).to.be.an("object");
    });
  });
  context("check type", function () {
    it("should have the correct type", function () {
      const actionRow = new ActionRow();
      expect(actionRow.type).to.equal(COMPONENT_TYPES.ACTION_ROW);
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
//# sourceMappingURL=actionRowBuilder.js.map
