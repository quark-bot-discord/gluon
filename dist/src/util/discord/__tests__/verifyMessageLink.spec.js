import { expect } from "chai";
import { verifyMessageLink } from "../verifyMessageLink.js";
import { LIMITS } from "../../../constants.js";
describe("verifyMessageLink", function () {
  it("should return null for an empty string", function () {
    const result = verifyMessageLink("");
    return expect(result).to.be.null;
  });
  it("should throw a RangeError if the text length exceeds the maximum allowed limit", function () {
    const longText = "a".repeat(LIMITS.MAX_NITRO_MESSAGE_CONTENT + 1);
    expect(() => verifyMessageLink(longText)).to.throw(
      RangeError,
      `GLUON: Text must be less than ${LIMITS.MAX_NITRO_MESSAGE_CONTENT} characters.`,
    );
  });
  it("should return the matched Discord message link if found", function () {
    const text =
      "Check this link: https://discord.com/channels/123456789012345678/123456789012345678/123456789012345678";
    const result = verifyMessageLink(text);
    expect(result).to.equal(
      "https://discord.com/channels/123456789012345678/123456789012345678/123456789012345678",
    );
  });
  it("should return null if no valid Discord message link is found", function () {
    const text = "This is a random text without a link.";
    const result = verifyMessageLink(text);
    return expect(result).to.be.null;
  });
  it("should return the first matched Discord message link if multiple links are present", function () {
    const text =
      "First link: https://discord.com/channels/123456789012345678/123456789012345678/123456789012345678 Second link: https://discord.com/channels/987654321098765432/987654321098765432/987654321098765432";
    const result = verifyMessageLink(text);
    expect(result).to.equal(
      "https://discord.com/channels/123456789012345678/123456789012345678/123456789012345678",
    );
  });
});
//# sourceMappingURL=verifyMessageLink.spec.js.map
