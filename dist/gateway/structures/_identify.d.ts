export default _identify;
/**
 * Creates an identify payload for the gateway.
 * @param {String} token The authorization token.
 * @param {Array<Number>} shard An array of shard ids which this process is managing.
 * @param {Number} intents The intents to use.
 * @returns {Buffer}
 */
declare function _identify(token: string, shard: Array<number>, intents: number): Buffer;
//# sourceMappingURL=_identify.d.ts.map