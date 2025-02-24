import Interaction from "./Interaction.js";
import util from "util";
/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
declare class SlashCommand extends Interaction {
  #private;
  /**
   * Creates a slash command interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(client: any, data: any);
  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   * @public
   */
  get data(): any;
  /**
   * The options provided with the slash command.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get options(): any;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format: any): {
    id: string;
    data: any;
    type: any;
    guild_id: string;
    channel_id: string;
    member:
      | {
          user: any;
          nick: any;
          joined_at: number | undefined;
          avatar: string | null;
          permissions: string;
          roles: string[] | undefined;
          communication_disabled_until: number | undefined;
          flags: any;
          _attributes: any;
          pending?: undefined;
        }
      | {
          user: any;
          nick: any;
          joined_at: string | undefined;
          avatar: string | null;
          permissions: string;
          roles: string[] | undefined;
          communication_disabled_until: number | undefined;
          flags: any;
          pending: boolean;
          _attributes?: undefined;
        };
  };
}
export default SlashCommand;
