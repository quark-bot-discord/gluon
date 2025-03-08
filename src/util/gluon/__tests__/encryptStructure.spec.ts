/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import encryptStructure from "../encryptStructure.js";
import { JsonTypes } from "#typings/enums.js";

describe("encryptStructure", function () {
  let mockStructure: { toJSON: sinon.SinonStub };
  let encryptionKeys: string[];

  beforeEach(function () {
    mockStructure = {
      toJSON: sinon.stub().returns({ key: "value" }),
    };
    encryptionKeys = ["key1", "key2"];
  });

  it("should call toJSON with STORAGE_FORMAT", function () {
    encryptStructure(mockStructure, ...encryptionKeys);
    return expect(mockStructure.toJSON.calledOnceWith(JsonTypes.STORAGE_FORMAT))
      .to.be.true;
  });

  it("should call return the correct value", function () {
    const result = encryptStructure(mockStructure, ...encryptionKeys);

    expect(result).to.equal("c+2l7SKavc3D4FTVgSVDxw==");
  });
});
