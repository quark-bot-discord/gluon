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
        "GLUON: Command name must be provided."
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
        "GLUON: Command description must be provided."
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
        "GLUON: Command default permission must be a number."
      );
    });
  });

  context("check setDefaultLocale", function () {
    it("should have method setDefaultLocale", function () {
      const command = new Command();
      expect(command).to.respondTo("setDefaultLocale");
    });
    it("should set the default locale for localisation", function () {
      const command = new Command();
      command.setDefaultLocale("en-GB");
      expect(command.defaultLocale).to.equal("en-GB");
    });
    it("should throw an error if no locale is provided", function () {
      const command = new Command();
      expect(() => command.setDefaultLocale()).to.throw(
        TypeError,
        "GLUON: Default locale must be provided."
      );
    });
  });

  context("check setNsfw", function () {
    it("should have method setNsfw", function () {
      const command = new Command();
      expect(command).to.respondTo("setNsfw");
    });
    it("should set whether the command is NSFW", function () {
      const command = new Command();
      command.setNsfw(true);
      expect(command.nsfw).to.be.true;
    });
    it("should throw an error if no NSFW value is provided", function () {
      const command = new Command();
      expect(() => command.setNsfw()).to.throw(
        TypeError,
        "GLUON: Command nsfw must be a boolean."
      );
    });
  });

  context("check addOption", function () {
    it("should have method addOption", function () {
      const command = new Command();
      expect(command).to.respondTo("addOption");
    });
    it("should add an option to the command", function () {
      const command = new Command();
      const option = { name: "test" };
      command.addOption(option);
      expect(command.options).to.include(option);
    });
    it("should throw an error if no option is provided", function () {
      const command = new Command();
      expect(() => command.addOption()).to.throw(
        TypeError,
        "GLUON: Command option must be provided."
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
