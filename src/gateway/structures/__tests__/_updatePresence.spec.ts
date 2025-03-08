/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import erlpack from "erlpack";
import { _updatePresence } from "../_updatePresence.js";
import {
  ActivityType,
  GatewayOpcodes,
  PresenceUpdateStatus,
} from "#typings/discord.js";

describe("_updatePresence", function () {
  let packStub: sinon.SinonStub;

  beforeEach(function () {
    packStub = sinon.stub(erlpack, "pack");
  });

  afterEach(function () {
    packStub.restore();
  });

  it("should create a presence update payload with default values", function () {
    const name = "Playing a game";
    const expectedPayload = {
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        since: null,
        activities: [
          {
            name,
            type: ActivityType.Playing,
            state: undefined,
          },
        ],
        status: PresenceUpdateStatus.Online,
        afk: false,
      },
    };

    _updatePresence(name);

    expect(packStub.calledOnce).to.be.true;
    expect(packStub.calledWith(expectedPayload)).to.be.true;
  });

  it("should create a presence update payload with custom values", function () {
    const name = "Streaming";
    const type = ActivityType.Streaming;
    const status = PresenceUpdateStatus.DoNotDisturb;
    const afk = true;
    const since = 1620000000;
    const expectedPayload = {
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        since,
        activities: [
          {
            name,
            type,
            state: undefined,
          },
        ],
        status,
        afk,
      },
    };

    _updatePresence(name, type, status, afk, since);

    expect(packStub.calledOnce).to.be.true;
    expect(packStub.calledWith(expectedPayload)).to.be.true;
  });

  it("should create a presence update payload with no activity if name is empty", function () {
    const expectedPayload = {
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        since: null,
        activities: [],
        status: PresenceUpdateStatus.Online,
        afk: false,
      },
    };

    _updatePresence("");

    expect(packStub.calledOnce).to.be.true;
    expect(packStub.calledWith(expectedPayload)).to.be.true;
  });

  it("should set state to name if type is 4", function () {
    const name = "Custom Status";
    const type = 4;
    const expectedPayload = {
      op: GatewayOpcodes.PresenceUpdate,
      d: {
        since: null,
        activities: [
          {
            name,
            type,
            state: name,
          },
        ],
        status: PresenceUpdateStatus.Online,
        afk: false,
      },
    };

    _updatePresence(name, type);

    expect(packStub.calledOnce).to.be.true;
    expect(packStub.calledWith(expectedPayload)).to.be.true;
  });
});
