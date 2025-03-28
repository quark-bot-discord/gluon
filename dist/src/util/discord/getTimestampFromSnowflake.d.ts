import { Snowflake } from "#typings/discord.js";
/**
 * Gives the UNIX timestamp for when the snowflake was created.
 * @param {String} snowflake The snowflake (or id).
 * @returns {Number}
 */
declare function getTimestamp(snowflake: Snowflake): number;
export default getTimestamp;
