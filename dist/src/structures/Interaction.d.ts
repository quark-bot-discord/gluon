import util from "util";
import type {
  Interaction as InteractionType,
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionStorageJSON,
  FileUpload,
  Embed,
  MessageComponents as MessageComponentsType,
  TextInputBuilder as TextInputBuilderType,
  CommandChoiceBuilder as CommandChoiceBuilderType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import {
  APIGuildInteraction,
  APIMessageComponentGuildInteraction,
} from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
declare class Interaction implements InteractionType {
  #private;
  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data: APIGuildInteraction | APIMessageComponentGuildInteraction,
  );
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
  get token(): string;
  /**
   * The type of interaction.
   * @type {Number}
   * @readonly
   * @public
   */
  get type():
    | import("discord-api-types/v10").InteractionType.ApplicationCommand
    | import("discord-api-types/v10").InteractionType.MessageComponent
    | import("discord-api-types/v10").InteractionType.ApplicationCommandAutocomplete
    | import("discord-api-types/v10").InteractionType.ModalSubmit;
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
  get guild(): import("../../typings/index.d.ts").Guild | null;
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
  get channel(): import("../../typings/index.d.ts").AllChannels | null;
  /**
   * The member that triggered the interaction, if it was run in a guild.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member(): import("../../typings/index.d.ts").Member | null | undefined;
  /**
   * The id of the member that triggered the interaction, if it was run in a guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get memberId(): string;
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
  textPrompt({
    title,
    customId,
    textInputModal,
  }: {
    title: string;
    customId: string;
    textInputModal: TextInputBuilderType;
  }): Promise<void>;
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
  autocompleteResponse({
    choices,
  }: {
    choices: CommandChoiceBuilderType[];
  }): Promise<void>;
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
  reply({
    content,
    files,
    embeds,
    components,
    quiet,
  }: {
    content: string;
    files: FileUpload[];
    embeds: Embed[];
    components: MessageComponentsType;
    quiet: boolean;
  }): Promise<this>;
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
  static delete(client: ClientType, interactionToken: string): Promise<any>;
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
  edit({
    content,
    files,
    embeds,
    components,
  }: {
    content: string;
    files: FileUpload[];
    embeds: Embed[];
    components: MessageComponentsType;
  }): Promise<any>;
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
    client: ClientType,
    interactionToken: string,
    {
      content,
      files,
      embeds,
      components,
    }: {
      content: string;
      files: FileUpload[];
      embeds: Embed[];
      components: MessageComponentsType;
    },
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
  toJSON(
    format?: JsonTypes,
  ): InteractionCacheJSON | InteractionDiscordJSON | InteractionStorageJSON;
}
export default Interaction;
