/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import erlpack from "erlpack";
import { _heartbeat } from "../_heartbeat.js";
import { GatewayOpcodes } from "#typings/discord.js";
describe("_heartbeat", function () {
  let erlpackPackStub;
  beforeEach(function () {
    erlpackPackStub = sinon.stub(erlpack, "pack");
  });
  afterEach(function () {
    erlpackPackStub.restore();
  });
  it("should generate a heartbeat payload with a number", function () {
    const interval = 45000;
    const expectedPayload = {
      op: GatewayOpcodes.Heartbeat,
      d: interval,
    };
    _heartbeat(interval);
    expect(erlpackPackStub.calledOnce).to.be.true;
    expect(erlpackPackStub.calledWith(expectedPayload)).to.be.true;
  });
  it("should generate a heartbeat payload with null", function () {
    const expectedPayload = {
      op: GatewayOpcodes.Heartbeat,
      d: null,
    };
    _heartbeat(null);
    expect(erlpackPackStub.calledOnce).to.be.true;
    expect(erlpackPackStub.calledWith(expectedPayload)).to.be.true;
  });
});
//# sourceMappingURL=_heartbeat.spec.js.map
