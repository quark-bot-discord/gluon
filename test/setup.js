import "source-map-support/register.js";
import { after, before, afterEach } from "mocha";
import { server } from "../dist/src/mocks/node.js";
import chaiAsPromised from "chai-as-promised";
import { use } from "chai";
import sinonChai from "sinon-chai";
import { restore } from "sinon";
import redisClient from "../dist/src/util/general/redisClient.js";

before(() => {
  server.listen();
  server.events.on("request:start", ({ request }) => {
    console.log("MSW intercepted:", request.method, request.url);
  });
  use(chaiAsPromised);
  use(sinonChai);
});

afterEach(() => {
  server.resetHandlers();
  restore();
});

after(() => {
  server.close();
  redisClient.quit();
});
