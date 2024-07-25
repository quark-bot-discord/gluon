import { beforeEach, after, before } from "mocha";
import { server } from "../src/mocks/node.js";

before(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});

after(() => {
  server.close();
});
