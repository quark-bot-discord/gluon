import { expect } from "chai";
import resolveEmoji from "../resolveEmoji.js";

describe("resolveEmoji", function () {
  it("should resolve a standard emoji", function () {
    const result = resolveEmoji("<:smile:1234567890>");
    expect(result).to.deep.equal({
      id: "1234567890",
      name: "smile",
      animated: false,
    });
  });

  it("should resolve an animated emoji", function () {
    const result = resolveEmoji("<a:smile:1234567890>");
    expect(result).to.deep.equal({
      id: "1234567890",
      name: "smile",
      animated: true,
    });
  });

  it("should return null for an invalid emoji string", function () {
    const result = resolveEmoji("invalid emoji string");
    return expect(result).to.be.null;
  });

  it("should resolve a Unicode emoji", function () {
    const result = resolveEmoji("😊");
    expect(result).to.deep.equal({
      name: "😊",
      id: null,
    });
  });

  it("should return null for an empty string", function () {
    const result = resolveEmoji("");
    return expect(result).to.be.null;
  });
});
