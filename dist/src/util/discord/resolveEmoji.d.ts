import { ResolvedEmoji } from "typings/index.js";
/**
 * Gives a valid Discord emoji structure when given an emoji mention.
 * @param {String} text Emoji mention. e.g. <:bitcoin:844240546246950922>
 * @returns {Object}
 */
declare function resolveEmoji(text: string): ResolvedEmoji | null;
export default resolveEmoji;
