import { expect } from "chai";
import { Stream } from "stream";
import { FileUpload } from "../fileUpload.js";
import { LIMITS } from "../../../constants.js";
import { JsonTypes } from "#typings/enums.js";
describe("FileUpload", function () {
  let fileUpload;
  beforeEach(function () {
    fileUpload = new FileUpload();
  });
  describe("setName", function () {
    it("should set the name of the file", function () {
      const name = "testFile.txt";
      fileUpload.setName(name);
      expect(fileUpload.name).to.equal(name);
    });
    it("should throw an error if name is not provided", function () {
      expect(() => fileUpload.setName("")).to.throw(
        "GLUON: File name must be provided.",
      );
    });
    it("should throw an error if name length exceeds the limit", function () {
      const longName = "a".repeat(LIMITS.MAX_FILE_NAME_LENGTH + 1);
      expect(() => fileUpload.setName(longName)).to.throw(
        `GLUON: File name must be less than ${LIMITS.MAX_FILE_NAME_LENGTH} characters.`,
      );
    });
  });
  describe("setStream", function () {
    it("should set the stream of the file", function () {
      const stream = new Stream();
      fileUpload.setStream(stream);
      expect(fileUpload.stream).to.equal(stream);
    });
  });
  describe("setPath", function () {
    it("should set the path of the file", function () {
      const path = "/path/to/file.txt";
      fileUpload.setPath(path);
      expect(fileUpload.attachment).to.equal(path);
    });
    it("should throw an error if path is not provided", function () {
      expect(() => fileUpload.setPath("")).to.throw(
        "GLUON: File path must be provided.",
      );
    });
  });
  describe("setSize", function () {
    it("should set the size of the file", function () {
      const size = 1024;
      fileUpload.setSize(size);
      expect(fileUpload.size).to.equal(size);
    });
  });
  describe("toJSON", function () {
    it("should return JSON representation with stream", function () {
      const name = "testFile.txt";
      const size = 1024;
      const stream = new Stream();
      fileUpload.setName(name).setSize(size).setStream(stream);
      const json = fileUpload.toJSON(JsonTypes.CACHE_FORMAT);
      expect(json).to.deep.equal({ name, size, stream });
    });
    it("should return JSON representation with path", function () {
      const name = "testFile.txt";
      const size = 1024;
      const path = "/path/to/file.txt";
      fileUpload.setName(name).setSize(size).setPath(path);
      const json = fileUpload.toJSON(JsonTypes.CACHE_FORMAT);
      expect(json).to.deep.equal({ name, size, attachment: path });
    });
    it("should throw an error if name is not provided and validation is not suppressed", function () {
      expect(() => fileUpload.toJSON(JsonTypes.CACHE_FORMAT)).to.throw(
        "GLUON: File name must be provided.",
      );
    });
    it("should throw an error if neither stream nor path is provided and validation is not suppressed", function () {
      fileUpload.setName("testFile.txt").setSize(1024);
      expect(() => fileUpload.toJSON(JsonTypes.CACHE_FORMAT)).to.throw(
        "GLUON: File stream or path must be provided.",
      );
    });
    it("should not throw an error if validation is suppressed", function () {
      const json = fileUpload.toJSON(JsonTypes.CACHE_FORMAT, {
        suppressValidation: true,
      });
      expect(json).to.deep.equal({
        attachment: undefined,
        name: undefined,
        size: undefined,
      });
    });
  });
});
//# sourceMappingURL=fileUpload.spec.js.map
