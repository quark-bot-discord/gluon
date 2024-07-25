import { beforeEach, after, before } from "mocha";
import { server } from "../src/mocks/node.js";
import chaiAsPromised from "chai-as-promised";
import { use } from "chai";
import sinonChai from "sinon-chai";

before(() => {
  server.listen();
  use(chaiAsPromised);
  use(sinonChai);
});

beforeEach(() => {
  server.resetHandlers();
});

after(() => {
  server.close();
});
