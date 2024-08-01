import { after, before, afterEach } from "mocha";
import { server } from "../src/mocks/node.js";
import chaiAsPromised from "chai-as-promised";
import { use } from "chai";
import sinonChai from "sinon-chai";

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
});

after(() => {
  server.close();
});
