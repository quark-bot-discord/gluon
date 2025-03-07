import { expect } from "chai";
import { TEST_DATA } from "../../../testData.js";
import FileUpload from "../fileUpload.js";
import Stream from "stream";
describe("File", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(File).to.be.a("function");
    });
  });
  context("check setName", function () {
    it("should have method setName", function () {
      const file = new FileUpload();
      expect(file).to.respondTo("setName");
    });
    it("should set the name of the file", function () {
      const file = new FileUpload();
      const readableStream = new Stream.Readable();
      file.setStream(readableStream);
      file.setName(TEST_DATA.FILE_NAME);
      expect(file.toJSON().name).to.equal(TEST_DATA.FILE_NAME);
    });
    it("should throw an error if no name is provided", function () {
      const file = new FileUpload();
      expect(() => file.setName()).to.throw(
        TypeError,
        "GLUON: File name must be provided.",
      );
    });
    it("should throw an error if the name is not a string", function () {
      const file = new FileUpload();
      expect(() => file.setName(123)).to.throw(
        TypeError,
        "GLUON: File name must be a string.",
      );
    });
  });
  context("check setStream", function () {
    it("should have method setStream", function () {
      const file = new FileUpload();
      expect(file).to.respondTo("setStream");
    });
    it("should set the stream of the file", function () {
      const file = new FileUpload();
      const readableStream = new Stream.Readable();
      file.setStream(readableStream);
      file.setName(TEST_DATA.FILE_NAME);
      expect(file.toJSON().stream).to.equal(readableStream);
    });
    it("should throw an error if no stream is provided", function () {
      const file = new FileUpload();
      expect(() => file.setStream()).to.throw(
        TypeError,
        "GLUON: File stream must be provided.",
      );
    });
  });
  context("check file structure", function () {
    it("should match the expected structure when a stream is provided", function () {
      const readableStream = new Stream.Readable();
      const file = new FileUpload()
        .setName(TEST_DATA.FILE_NAME)
        .setStream(readableStream);
      expect(file.toJSON()).to.be.an("object");
      expect(file.toJSON()).to.have.property("stream");
      expect(file.toJSON()).to.have.property("name");
      expect(file.toJSON().stream).to.equal(readableStream);
      expect(file.toJSON().name).to.equal(TEST_DATA.FILE_NAME);
    });
  });
});
//# sourceMappingURL=fileUpload.spec.js.map
