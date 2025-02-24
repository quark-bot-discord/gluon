var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _SlashCommand_data, _SlashCommand_options;
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import util from "util";
import Member from "./Member.js";
import Role from "./Role.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import User from "./User.js";
/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
class SlashCommand extends Interaction {
  /**
   * Creates a slash command interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);
    _SlashCommand_data.set(this, void 0);
    _SlashCommand_options.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    /**
     * Raw slash command data from discord.
     * @type {Object?}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data}
     * @private
     */
    __classPrivateFieldSet(this, _SlashCommand_data, data.data, "f");
    if (data.data.resolved?.members)
      for (const [key, value] of Object.entries(data.data.resolved.members))
        new Member(client, value, {
          userId: key,
          guildId: data.guild_id,
          user: new User(client, data.data.resolved.users[key]),
        });
    if (data.data.resolved?.roles)
      for (const value of Object.values(data.data.resolved.roles))
        new Role(client, value, {
          guildId: data.guild_id,
        });
    if (data.data.resolved?.channels)
      for (const value of Object.values(data.data.resolved.channels))
        cacheChannel(client, value, data.guild_id);
    /**
     * The options provided with the interaction.
     * @type {Array<Object>}
     * @private
     */
    __classPrivateFieldSet(this, _SlashCommand_options, data.data.options, "f");
  }
  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   * @public
   */
  get data() {
    return __classPrivateFieldGet(this, _SlashCommand_data, "f");
  }
  /**
   * The options provided with the slash command.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get options() {
    return __classPrivateFieldGet(this, _SlashCommand_options, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<SlashCommand: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_SlashCommand_data = new WeakMap()),
  (_SlashCommand_options = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          id: this.id,
          data: __classPrivateFieldGet(this, _SlashCommand_data, "f"),
        };
      }
    }
  }
}
export default SlashCommand;
//# sourceMappingURL=SlashCommand.js.map
