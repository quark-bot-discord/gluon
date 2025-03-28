/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import erlpack from "erlpack";
import { _resume } from "../_resume.js";
import { GatewayOpcodes } from "#typings/discord.js";
describe("_resume function", function () {
  const token = "test_token";
  const session_id = "test_session_id";
  const seq = 123;
  it("should create a buffer containing the resume payload", function () {
    const payload = {
      op: GatewayOpcodes.Resume,
      d: {
        token,
        session_id,
        seq,
      },
    };
    const packedPayload = Buffer.from("packed_payload");
    const erlpackStub = sinon.stub(erlpack, "pack").returns(packedPayload);
    const result = _resume(token, session_id, seq);
    expect(erlpackStub.calledOnceWith(payload)).to.be.true;
    expect(result).to.equal(packedPayload);
    erlpackStub.restore();
  });
});
//# sourceMappingURL=_resume.spec.js.map
