import Interaction from "./Interaction.js";
import util from "util";
/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 * @extends {Interaction}
 */
declare class ModalResponse extends Interaction {
  #private;
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client: any, data: any);
  /**
   * The custom id of the modal.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): any;
  /**
   * The entered modal values.
   * @type {Array<Object>}
   * @readonly
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
        values: any;
        custom_id: any;
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
          components: {
            components: any;
          }[];
        };
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
export default ModalResponse;
