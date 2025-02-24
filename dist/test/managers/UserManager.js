import { expect } from "chai";
import { spy } from "sinon";
import { UserManager } from "../../src/structures.js";
import { TEST_CLIENTS, TEST_DATA } from "../../src/testData.js";
import { User } from "../../src/structures.js";
describe("UserManager", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(UserManager).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should create a new instance of UserManager with the correct options", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      expect(userManager).to.be.an.instanceOf(UserManager);
      expect(userManager).to.have.property("set");
      expect(userManager).to.have.property("fetch");
    });
  });
  context("check set method", function () {
    it("should set the correct values", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      const user = new User(client, TEST_DATA.USER);
      userManager.set("123456", user);
      expect(userManager.get("123456")).to.deep.equal(user);
    });
    it("should throw an error if user is not a User instance", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      expect(() => userManager.set("123456", {})).to.throw(
        TypeError,
        "GLUON: User must be an instance of User.",
      );
    });
  });
  context("check fetch method", function () {
    it("should fetch the correct user", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      const user = new User(client, TEST_DATA.USER);
      const fetchedUser = await userManager.fetch("123456");
      expect(fetchedUser).to.deep.equal(user);
    });
    it("should call makeRequest with the correct arguments", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      const request = spy(client.request, "makeRequest");
      await userManager.fetch("123456");
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledOnceWith("getUser", ["123456"]);
      expect(request.firstCall.args[2]).to.be.undefined;
    });
    it("should throw an error if userId is not a string", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const userManager = new UserManager(client);
      await expect(userManager.fetch(123456)).to.be.rejectedWith(
        TypeError,
        "GLUON: User ID must be a string.",
      );
    });
  });
});
//# sourceMappingURL=UserManager.js.map
