import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class OptionSelect extends Interaction {
  #private;
  /**
   * Creates an option selected interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(client: any, data: any, { channelId, guildId }: any);
  /**
   * The custom id of the select menu.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): any;
  /**
   * The message which the option belongs to.
   * @type {Message}
   * @readonly
   * @public
   */
  get message(): Message;
  /**
   * The values selected from the select menu.
   * @type {Array<Object>}
   * @readonly
   * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
   * @public
   */
  get values(): any;
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
  toJSON(format: any):
    | {
        custom_id: any;
        message: any;
        values: any;
        id: string;
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
      }
    | {
        data: {
          custom_id: any;
          values: any;
        };
        message: any;
        id: string;
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
export default OptionSelect;
