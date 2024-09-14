export default GluonCacheRule;
declare class GluonCacheRule {
    /**
     * The name of the rule.
     * @param {String} name What the rule is called.
     * @returns {GluonCacheRule}
     */
    setName(name: string): GluonCacheRule;
    name: string;
    /**
     * Set the function which handles the rule.
     * The function is passed the structure data that this rule is for.
     * @param {Function} handlerFunction A function that handles the rule.
     * @returns {GluonCacheRule}
     * @public
     * @method
     * @throws {TypeError}
     */
    public setHandlerFunction(handlerFunction: Function): GluonCacheRule;
    handlerFunction: Function;
    /**
     * Set the type of structure this rule is for.
     * Pass the class of the structure type.
     * @param {Object} structureType The type of structure this rule is for.
     * @returns {GluonCacheRule}
     * @public
     * @method
     * @throws {TypeError}
     */
    public setStructureType(structureType: any): GluonCacheRule;
    structureType: any;
    /**
     * Set the function which retrieves the data for the structure.
     * @param {Function} retrieveFunction The function that retrieves the data for the structure.
     * @returns {GluonCacheRule}
     * @public
     * @method
     * @throws {TypeError}
     */
    public setRetrieveFunction(retrieveFunction: Function): GluonCacheRule;
    retrieveFunction: Function;
    /**
     * Apply the rule to the structure type.
     * @returns {void}
     * @public
     * @method
     * @throws {Error}
     */
    public applyRule(): void;
}
//# sourceMappingURL=gluonCacheRule.d.ts.map