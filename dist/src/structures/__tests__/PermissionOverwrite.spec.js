import { expect } from "chai";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../testData.js";
import { PermissionOverwrite } from "../../structures.js";
import { JsonTypes } from "#typings/enums.js";
describe("PermissionOverwrite", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(PermissionOverwrite).to.be.a("function");
    });
  });
  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite).to.have.property("id");
      expect(permissionOverwrite).to.have.property("type");
      expect(permissionOverwrite).to.have.property("allow");
      expect(permissionOverwrite).to.have.property("deny");
      expect(permissionOverwrite).to.have.property("toString");
      expect(permissionOverwrite).to.have.property("toJSON");
    });
  });
  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.id).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.id,
      );
    });
  });
  context("check type", function () {
    it("should have the correct type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.type).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.type,
      );
    });
  });
  context("check allow", function () {
    it("should have the correct allow permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.allow).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.allow,
      );
    });
  });
  context("check deny", function () {
    it("should have the correct deny permissions", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.deny).to.equal(
        TEST_DATA.PERMISSION_OVERWRITE.deny,
      );
    });
  });
  context("check toString", function () {
    it("should return the correct string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.toString()).to.equal(
        `<PermissionOverwrite: ${TEST_DATA.PERMISSION_OVERWRITE.id}>`,
      );
    });
  });
  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(permissionOverwrite.toJSON()).to.deep.equal(
        TEST_DATA.PERMISSION_OVERWRITE,
      );
    });
    it("should return a valid JSON with a custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(
        permissionOverwrite.toJSON(JsonTypes.STORAGE_FORMAT),
      ).to.deep.equal(TEST_DATA.PERMISSION_OVERWRITE);
      expect(permissionOverwrite.toJSON(JsonTypes.CACHE_FORMAT)).to.deep.equal(
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      expect(
        permissionOverwrite.toJSON(JsonTypes.DISCORD_FORMAT),
      ).to.deep.equal(TEST_DATA.PERMISSION_OVERWRITE);
    });
  });
  context("check bundling", function () {
    it("should bundle correctly", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      const rebundled = new PermissionOverwrite(
        client,
        permissionOverwrite.toJSON(),
      );
      expect(rebundled.allow).to.deep.equal(permissionOverwrite.allow);
      expect(rebundled.deny).to.deep.equal(permissionOverwrite.deny);
      expect(rebundled.id).to.equal(permissionOverwrite.id);
      expect(rebundled.type).to.equal(permissionOverwrite.type);
      expect(rebundled.toString()).to.equal(permissionOverwrite.toString());
      expect(rebundled.toJSON()).to.deep.equal(permissionOverwrite.toJSON());
    });
    it("should bundle correctly with custom toJSON", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      const permissionOverwrite = new PermissionOverwrite(
        client,
        TEST_DATA.PERMISSION_OVERWRITE,
      );
      const rebundled = new PermissionOverwrite(
        client,
        permissionOverwrite.toJSON(JsonTypes.CACHE_FORMAT),
      );
      expect(rebundled.allow).to.deep.equal(permissionOverwrite.allow);
      expect(rebundled.deny).to.deep.equal(permissionOverwrite.deny);
      expect(rebundled.id).to.equal(permissionOverwrite.id);
      expect(rebundled.type).to.equal(permissionOverwrite.type);
      expect(rebundled.toString()).to.equal(permissionOverwrite.toString());
      expect(rebundled.toJSON()).to.deep.equal(permissionOverwrite.toJSON());
    });
  });
  it("should bundle correctly with custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    const permissionOverwrite = new PermissionOverwrite(
      client,
      TEST_DATA.PERMISSION_OVERWRITE,
    );
    const rebundled = new PermissionOverwrite(
      client,
      permissionOverwrite.toJSON(JsonTypes.STORAGE_FORMAT),
    );
    expect(rebundled.allow).to.deep.equal(permissionOverwrite.allow);
    expect(rebundled.deny).to.deep.equal(permissionOverwrite.deny);
    expect(rebundled.id).to.equal(permissionOverwrite.id);
    expect(rebundled.type).to.equal(permissionOverwrite.type);
    expect(rebundled.toString()).to.equal(permissionOverwrite.toString());
    expect(rebundled.toJSON()).to.deep.equal(permissionOverwrite.toJSON());
  });
  it("should bundle correctly with custom toJSON", function () {
    const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    const permissionOverwrite = new PermissionOverwrite(
      client,
      TEST_DATA.PERMISSION_OVERWRITE,
    );
    const rebundled = new PermissionOverwrite(
      client,
      permissionOverwrite.toJSON(JsonTypes.DISCORD_FORMAT),
    );
    expect(rebundled.allow).to.deep.equal(permissionOverwrite.allow);
    expect(rebundled.deny).to.deep.equal(permissionOverwrite.deny);
    expect(rebundled.id).to.equal(permissionOverwrite.id);
    expect(rebundled.type).to.equal(permissionOverwrite.type);
    expect(rebundled.toString()).to.equal(permissionOverwrite.toString());
    expect(rebundled.toJSON()).to.deep.equal(permissionOverwrite.toJSON());
  });
});
//# sourceMappingURL=PermissionOverwrite.spec.js.map
