import { expect } from "chai";
import sinon from "sinon";
import { sleep } from "../sleep.js";

describe("sleep", function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it("should resolve after the specified period", async function () {
    const period = 1000;
    const sleepPromise = sleep(period);

    clock.tick(period);

    await expect(sleepPromise).to.eventually.be.fulfilled;
  });

  it("should resolve immediately if period is 0", async function () {
    const period = 0;
    const sleepPromise = sleep(period);

    clock.tick(period);

    await expect(sleepPromise).to.eventually.be.fulfilled;
  });

  it("should resolve after the specified period even if period is negative", async function () {
    const period = -1000;
    const sleepPromise = sleep(period);

    clock.tick(0);

    await expect(sleepPromise).to.eventually.be.fulfilled;
  });
});
