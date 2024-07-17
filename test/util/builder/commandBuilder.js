let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const Command = require("../../../src/util/builder/commandBuilder");

describe("CommandBuilder", function () {
  context("check import", function () {
    it("should be an object", function () {
      const command = new Command();
      expect(command).to.be.an("object");
    });
  });

  context("check setName", function () {
    it("should have method setName", function () {
      const command = new Command();
      expect(command).to.respondTo("setName");
    });
    it("should set the name of the command", function () {
      const command = new Command();
      command.setName("test");
      expect(command.name).to.equal("test");
    });
    it("should throw an error if no name is provided", function () {
      const command = new Command();
      expect(() => command.setName()).to.throw(
        TypeError,
        "GLUON: Command name must be provided.",
      );
    });
  });

  context("check setDescription", function () {
    it("should have method setDescription", function () {
      const command = new Command();
      expect(command).to.respondTo("setDescription");
    });
    it("should set the description of the command", function () {
      const command = new Command();
      command.setDescription("test");
      expect(command.description).to.equal("test");
    });
    it("should throw an error if no description is provided", function () {
      const command = new Command();
      expect(() => command.setDescription()).to.throw(
        TypeError,
        "GLUON: Command description must be provided.",
      );
    });
  });

  context("check setDefaultMemberPermissions", function () {
    it("should have method setDefaultMemberPermissions", function () {
      const command = new Command();
      expect(command).to.respondTo("setDefaultMemberPermissions");
    });
    it("should set the default permission of the command", function () {
      const command = new Command();
      command.setDefaultMemberPermissions(8);
      expect(command.default_member_permissions).to.equal(8);
    });
    it("should throw an error if no default permission is provided", function () {
      const command = new Command();
      expect(() => command.setDefaultMemberPermissions()).to.throw(
        TypeError,
        "GLUON: Command default permission must be a number.",
      );
    });
  });

  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const command = new Command();
      expect(command).to.respondTo("toJSON");
    });
  });
});
