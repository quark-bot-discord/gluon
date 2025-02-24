import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class ButtonClick extends Interaction {
  #private;
  /**
   * Creates a button click interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(client: any, data: any, { guildId, channelId }?: any);
  /**
   * The custom id of the button.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): any;
  /**
   * The message which the button belongs to.
   * @type {Message}
   * @readonly
   * @public
   * @see {@link Message}
   */
  get message(): Message;
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
    data: {
      custom_id: any;
    };
    message: Message;
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
export default ButtonClick;
