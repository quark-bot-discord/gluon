import Member from "./Member.js";
import util from "util";
/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
declare class Interaction {
  #private;
  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client: any, data: any);
  /**
   * The id of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The token of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get token(): any;
  /**
   * The type of interaction.
   * @type {Number}
   * @readonly
   * @public
   */
  get type(): any;
  /**
   * The id of the guild that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this interaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): any;
  /**
   * The id of the channel that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId(): string;
  /**
   * The channel that this interaction belongs to.
   * @type {(TextChannel | VoiceChannel | Thread)?}
   * @readonly
   * @public
   */
  get channel(): any;
  /**
   * The member that triggered the interaction, if it was run in a guild.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member(): Member | undefined;
  /**
   * The id of the member that triggered the interaction, if it was run in a guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get memberId(): string | null;
  /**
   * Prompts a user to enter text using a modal.
   * @param {Object} options Modal options.
   * @param {String} options.title The title of the modal.
   * @param {String} options.customId The custom id of the modal.
   * @param {TextInput} options.textInputModal The text input modal.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  textPrompt({ title, customId, textInputModal }?: any): Promise<void>;
  /**
   * Responds to autocomplete interactions.
   * @param {Object} options Autocompletion options.
   * @param {Array<CommandChoice>} options.choices The choices to send back.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  autocompleteResponse({ choices }?: any): Promise<void>;
  /**
   * Replies to an interaction.
   * @param {Object?} [options] An embed, components, and whether the response should be as an ephemeral message.
   * @param {String?} [options.content] The content of the interaction response.
   * @param {Array<FileUpload>?} [options.files] The files to send with the interaction response.
   * @param {Array<Embed>?} [options.embeds] The embeds to send with the interaction response.
   * @param {Array<ActionRow>?} [options.components] The components to send with the interaction response.
   * @param {Boolean?} [options.quiet] Whether the response should be an ephemeral message.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   */
  reply({ content, files, embeds, components, quiet }?: any): Promise<this>;
  /**
   * Silently acknowledges an interaction.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   */
  acknowledge(): Promise<this>;
  /**
   * Deletes a response to an interaction. Works up to 15 minutes after the response was sent.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  delete(): Promise<any>;
  /**
   * Deletes a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {Client} client The client instance.
   * @param {String} interactionToken The interaction token.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @static
   * @throws {Error | TypeError}
   */
  static delete(client: any, interactionToken: any): Promise<any>;
  /**
   * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {Object?} [options] The new interaction response options.
   * @param {String?} [options.content] The new content of the interaction response.
   * @param {Array<FileUpload>?} [options.files] The new files to send with the interaction response.
   * @param {Array<Embed>?} [options.embeds] The new embeds to send with the interaction response.
   * @param {Array<ActionRow>?} [options.components] The new components to send with the interaction response.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  edit({ content, files, embeds, components }?: any): Promise<any>;
  /**
   * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {Client} client The client instance.
   * @param {String} interactionToken The interaction token.
   * @param {Object?} [options] The new interaction response options.
   * @param {String?} [options.content] The new content of the interaction response.
   * @param {Array<FileUpload>?} [options.files] The new files to send with the interaction response.
   * @param {Array<Embed>?} [options.embeds] The new embeds to send with the interaction response.
   * @param {Array<ActionRow>?} [options.components] The new components to send with the interaction response.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  static edit(
    client: any,
    interactionToken: any,
    { content, files, embeds, components }?: any,
  ): Promise<any>;
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
   */
  toJSON(format: any): {
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
export default Interaction;
