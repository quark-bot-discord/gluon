export default MessagePollManager;
/**
 * Manages a poll for a message.
 */
declare class MessagePollManager {
    /**
     * Creates a message poll manager.
     * @param {Object} existingResponses Existing responses for a poll.
     */
    constructor(client: any, existingResponses?: any);
    /**
     * Adds a response to a poll.
     * @param {String} user_id The id of the user who voted.
     * @param {Number} answer_id The id of the answer that was voted for.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _addVote(user_id: string, answer_id: number): void;
    /**
     * Removes a response from a poll.
     * @param {String} user_id The id of the user whose vote was removed.
     * @param {Number} answer_id The id of the answer for which the vote was removed.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _removeVote(user_id: string, answer_id: number): void;
    /**
     * Returns the result for a given answer.
     * @param {Number} answerId The ID of the answer to get the result for.
     * @returns {Array<String>}
     */
    getResult(answerId: number): Array<string>;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
//# sourceMappingURL=MessagePollManager.d.ts.map