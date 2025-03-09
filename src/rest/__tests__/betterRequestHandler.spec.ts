/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";
import { Response } from "node-fetch";
import type { Client } from "typings/index.d.ts";
import { API_BASE_URL, VERSION } from "../../constants.js";
import { TEST_CLIENTS, TEST_DATA } from "#src/testData.js";
import * as td from "testdouble";

describe("BetterRequestHandler", function () {
  let client: Client;
  let requestHandler: any;
  let fetchStub: sinon.SinonStub;

  beforeEach(async function () {
    client = TEST_CLIENTS.ALL_CACHES_ENABLED();
    sinon.replace(client, "_emitDebug", sinon.stub());
    sinon.replace(client, "emit", sinon.stub());
    fetchStub = sinon.stub();
    await td.replaceEsm("node-fetch", {
      default: fetchStub,
    });
    const mainModule = await import("../betterRequestHandler.js");
    const BetterRequestHandler = mainModule.default;
    requestHandler = new BetterRequestHandler(client, "test-token");
  });

  afterEach(function () {
    sinon.restore();
  });

  it("should make a GET request with correct data format", async function () {
    fetchStub.resolves(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    const result = await requestHandler.makeRequest(
      "getGuildAuditLog",
      [TEST_DATA.GUILD_ID],
      {
        key: "value",
      },
    );

    expect(fetchStub.calledOnce).to.be.true;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.equal(
      `${API_BASE_URL}/v${VERSION}/guilds/${TEST_DATA.GUILD_ID}/audit-logs?key=value`,
    );
    expect(options.method).to.equal("GET");
    expect(options.headers.Authorization).to.equal("Bot test-token");
    expect(result).to.deep.equal({ success: true });
  });

  it("should make a POST request with correct data format", async function () {
    fetchStub.resolves(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    const result = await requestHandler.makeRequest(
      "postCreateMessage",
      [TEST_DATA.CHANNEL_ID],
      { key: "value" },
    );

    expect(fetchStub.calledOnce).to.be.true;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.equal(
      `${API_BASE_URL}/v${VERSION}/channels/${TEST_DATA.CHANNEL_ID}/messages`,
    );
    expect(options.method).to.equal("POST");
    expect(options.headers.Authorization).to.equal("Bot test-token");
    expect(options.headers["Content-Type"]).to.equal("application/json");
    expect(options.body).to.equal(JSON.stringify({ key: "value" }));
    expect(result).to.deep.equal({ success: true });
  });

  it("should make a DELETE request with correct data format", async function () {
    fetchStub.resolves(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    const result = await requestHandler.makeRequest(
      "deleteGuildMember",
      [TEST_DATA.GUILD_ID, TEST_DATA.MEMBER_ID],
      { key: "value", "X-Audit-Log-Reason": "reason" },
    );

    expect(fetchStub.calledOnce).to.be.true;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.equal(
      `${API_BASE_URL}/v${VERSION}/guilds/${TEST_DATA.GUILD_ID}/members/${TEST_DATA.MEMBER_ID}?key=value`,
    );
    expect(options.method).to.equal("DELETE");
    expect(options.headers.Authorization).to.equal("Bot test-token");
    expect(options.headers["X-Audit-Log-Reason"]).to.equal("reason");
    expect(result).to.deep.equal({ success: true });
  });

  it("should make a PUT request with correct data format", async function () {
    fetchStub.resolves(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    const result = await requestHandler.makeRequest(
      "putCreateGuildBan",
      [TEST_DATA.GUILD_ID, TEST_DATA.MEMBER_ID],
      {
        key: "value",
        "X-Audit-Log-Reason": "reason",
      },
    );

    expect(fetchStub.calledOnce).to.be.true;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.equal(
      `${API_BASE_URL}/v${VERSION}/guilds/${TEST_DATA.GUILD_ID}/bans/${TEST_DATA.MEMBER_ID}`,
    );
    expect(options.method).to.equal("PUT");
    expect(options.headers.Authorization).to.equal("Bot test-token");
    expect(options.headers["Content-Type"]).to.equal("application/json");
    expect(options.headers["X-Audit-Log-Reason"]).to.equal("reason");
    expect(options.body).to.equal(JSON.stringify({ key: "value" }));
    expect(result).to.deep.equal({ success: true });
  });
});
