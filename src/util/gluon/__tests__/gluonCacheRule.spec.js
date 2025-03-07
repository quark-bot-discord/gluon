import { expect } from "chai";
import GluonCacheRule from "../gluonCacheRule.js";
import ChannelMessageManager from "../../../managers/ChannelMessageManager.js";

describe("GluonCacheRule", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(GluonCacheRule).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no name is provided", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setName()).to.throw(
        TypeError,
        "GLUON: Rule name must be a string.",
      );
    });
    it("should throw an error if name is not a string", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setName(123456)).to.throw(
        TypeError,
        "GLUON: Rule name must be a string.",
      );
    });
    it("should throw an error if no handler function is provided", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setHandlerFunction()).to.throw(
        TypeError,
        "GLUON: Rule handler function must be a function.",
      );
    });
    it("should throw an error if handler function is not a function", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setHandlerFunction("handler")).to.throw(
        TypeError,
        "GLUON: Rule handler function must be a function.",
      );
    });
    it("should throw an error if no structure type is provided", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setStructureType()).to.throw(
        TypeError,
        "GLUON: Rule structure type must be a class.",
      );
    });
    it("should throw an error if structure type is not a class", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setStructureType("structure")).to.throw(
        TypeError,
        "GLUON: Rule structure type must be a class.",
      );
    });
    it("should throw an error if no retrieve function is provided", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setRetrieveFunction()).to.throw(
        TypeError,
        "GLUON: Rule retrieve function must be a function.",
      );
    });
    it("should throw an error if retrieve function is not a function", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.setRetrieveFunction("retrieve")).to.throw(
        TypeError,
        "GLUON: Rule retrieve function must be a function.",
      );
    });
    it("should throw an error if applyRule is called without setting the name", function () {
      const rule = new GluonCacheRule();
      expect(() => rule.applyRule()).to.throw(
        Error,
        "GLUON: Rule name is required.",
      );
    });
    it("should throw an error if applyRule is called without setting the handler function", function () {
      const rule = new GluonCacheRule();
      rule.setName("name");
      expect(() => rule.applyRule()).to.throw(
        Error,
        "GLUON: Rule handler function is required.",
      );
    });
    it("should throw an error if applyRule is called without setting the structure type", function () {
      const rule = new GluonCacheRule();
      rule.setName("name");
      rule.setHandlerFunction(() => {});
      expect(() => rule.applyRule()).to.throw(
        Error,
        "GLUON: Rule structure type is required.",
      );
    });
    it("should throw an error if applyRule is called without setting the retrieve function", function () {
      const rule = new GluonCacheRule();
      rule.setName("name");
      rule.setHandlerFunction(() => {});
      rule.setStructureType(ChannelMessageManager);
      expect(() => rule.applyRule()).to.throw(
        Error,
        "GLUON: Rule retrieve function is required.",
      );
    });
    it("should throw an error if applyRule is called with a class that does not have a rules property", function () {
      const rule = new GluonCacheRule();
      rule.setName("name");
      rule.setHandlerFunction(() => {});
      rule.setStructureType({});
      rule.setRetrieveFunction(() => {});
      expect(() => rule.applyRule()).to.throw(
        Error,
        "GLUON: Structure does not support rules.",
      );
    });
  });
  context("check valid input", function () {
    it("should set the name", function () {
      const rule = new GluonCacheRule();
      rule.setName("name");
      expect(rule.name).to.equal("name");
    });
    it("should set the handler function", function () {
      const rule = new GluonCacheRule();
      const handlerFunction = () => {};
      rule.setHandlerFunction(handlerFunction);
      expect(rule.handlerFunction).to.equal(handlerFunction);
    });
    it("should set the structure type", function () {
      const rule = new GluonCacheRule();
      class StructureType {}
      rule.setStructureType(StructureType);
      expect(rule.structureType).to.equal(StructureType);
    });
    it("should set the retrieve function", function () {
      const rule = new GluonCacheRule();
      const retrieveFunction = () => {};
      rule.setRetrieveFunction(retrieveFunction);
      expect(rule.retrieveFunction).to.equal(retrieveFunction);
    });
    it("should apply the rule", function () {
      const rule = new GluonCacheRule();
      rule
        .setName("name")
        .setHandlerFunction(() => 0)
        .setStructureType(ChannelMessageManager)
        .setRetrieveFunction(() => 1)
        .applyRule();
      expect(rule.name).to.equal("name");
      expect(rule.handlerFunction).to.be.a("function");
      expect(rule.structureType).to.equal(ChannelMessageManager);
      expect(rule.retrieveFunction).to.be.a("function");
      expect(ChannelMessageManager.rules["name"].store()).to.equal(0);
      expect(ChannelMessageManager.rules["name"].retrieve()).to.equal(1);
    });
  });
});
