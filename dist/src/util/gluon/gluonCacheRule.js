class GluonCacheRule {
  /**
   * The name of the rule.
   * @param {String} name What the rule is called.
   * @returns {GluonCacheRule}
   */
  setName(name) {
    if (typeof name !== "string")
      throw new TypeError("GLUON: Rule name must be a string.");
    this.name = name;
    return this;
  }
  /**
   * Set the function which handles the rule.
   * The function is passed the structure data that this rule is for.
   * @param {Function} handlerFunction A function that handles the rule.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setHandlerFunction(handlerFunction) {
    if (typeof handlerFunction !== "function")
      throw new TypeError("GLUON: Rule handler function must be a function.");
    this.handlerFunction = handlerFunction;
    return this;
  }
  /**
   * Set the type of structure this rule is for.
   * Pass the class of the structure type.
   * @param {Object} structureType The type of structure this rule is for.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setStructureType(structureType) {
    if (!(structureType instanceof Object))
      throw new TypeError("GLUON: Rule structure type must be a class.");
    this.structureType = structureType;
    return this;
  }
  /**
   * Set the function which retrieves the data for the structure.
   * @param {Function} retrieveFunction The function that retrieves the data for the structure.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setRetrieveFunction(retrieveFunction) {
    if (typeof retrieveFunction !== "function")
      throw new TypeError("GLUON: Rule retrieve function must be a function.");
    this.retrieveFunction = retrieveFunction;
    return this;
  }
  /**
   * Apply the rule to the structure type.
   * @returns {void}
   * @public
   * @method
   * @throws {Error}
   */
  applyRule() {
    if (!this.name) throw new Error("GLUON: Rule name is required.");
    if (!this.handlerFunction)
      throw new Error("GLUON: Rule handler function is required.");
    if (!this.structureType)
      throw new Error("GLUON: Rule structure type is required.");
    if (!this.retrieveFunction)
      throw new Error("GLUON: Rule retrieve function is required.");
    if (!this.structureType.rules)
      throw new Error("GLUON: Structure does not support rules.");
    Object.assign(this.structureType.rules, {
      [this.name]: {
        store: this.handlerFunction,
        retrieve: this.retrieveFunction,
        structure: this.structureType,
      },
    });
  }
}
export default GluonCacheRule;
//# sourceMappingURL=gluonCacheRule.js.map
