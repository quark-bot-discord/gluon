import { after, before, afterEach } from "mocha";
import { server } from "../src/mocks/node.js";
import chaiAsPromised from "chai-as-promised";
import { use } from "chai";
import sinonChai from "sinon-chai";
import { restore } from "sinon";

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
});
