import ActionRow from "../util/builder/actionRowBuilder.js";
import Member from "./Member.js";
import TextInput from "../util/builder/textInputBuilder.js";
import util from "util";
import Message from "./Message.js";
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
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberStorageJSON,
} from "../../typings/index.d.ts";
import {
  APIGuildInteraction,
  APIMessageComponentGuildInteraction,
} from "#typings/discord.js";
import { JsonTypes } from "../../typings/enums.js";
import getMember from "#src/util/gluon/getMember.js";

/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
class Interaction implements InteractionType {
  #_client;
  #_id;
  #type;
  #_guild_id;
  #_channel_id;
  #token;
  #_member_id;
  #_responses_sent = 0;
  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data: APIGuildInteraction | APIMessageComponentGuildInteraction,
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the message.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The type of interaction.
     * @type {Number}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-type}
     * @private
     */
    this.#type = data.type;

    /**
     * The id of the guild that this interaction belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(data.guild_id);

    /**
     * The id of the channel that this interaction belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_channel_id = data.channel ? BigInt(data.channel.id) : undefined;

    /**
     * The member that triggered the interaction, if it was run in a guild.
     * @type {Member?}
     * @private
     */
    this.#_member_id = BigInt(data.member.user.id);
    new Member(this.#_client, data.member, {
      userId: data.member.user.id,
      guildId: data.guild_id,
    });

    /**
     * The interaction token, needed to respond to it.
     * @type {String}
     * @private
     */
    this.#token = data.token;

    /**
     * Whether a response has been sent to the interaction.
     * @type {Boolean}
     * @private
     */
    this.#_responses_sent = 0;
  }

  /**
   * The id of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The token of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get token() {
    return this.#token;
  }

  /**
   * The type of interaction.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The id of the guild that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this interaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    const guild = this.#_client.guilds.get(this.guildId);
    if (!guild) {
      throw new Error(`GLUON: Guild ${this.guildId} not found in cache.`);
    }
    return guild;
  }

  /**
   * The id of the channel that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    if (!this.#_channel_id) {
      throw new Error(
        `GLUON: Channel id not found for interaction ${
          this.id
        } in guild ${this.guildId}.`,
      );
    }
    return String(this.#_channel_id);
  }

  /**
   * The channel that this interaction belongs to.
   * @type {(TextChannel | VoiceChannel | Thread)?}
   * @readonly
   * @public
   */
  get channel() {
    const channel = this.guild?.channels.get(this.channelId);
    if (!channel) {
      throw new Error(
        `GLUON: Channel ${this.channelId} not found in cache for interaction ${
          this.id
        } in guild ${this.guildId}.`,
      );
    }
    return channel;
  }

  /**
   * The member that triggered the interaction, if it was run in a guild.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    return this.memberId
      ? getMember(this.#_client, this.guildId, this.memberId)
      : undefined;
  }

  /**
   * The id of the member that triggered the interaction, if it was run in a guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get memberId() {
    return String(this.#_member_id);
  }

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
  async textPrompt({
    title,
    customId,
    textInputModal,
  }: {
    title: string;
    customId: string;
    textInputModal: TextInputBuilderType;
  }) {
    if (typeof title !== "string")
      throw new TypeError("GLUON: No title provided.");

    if (typeof customId !== "string")
      throw new TypeError("GLUON: No custom id provided.");

    if (!(textInputModal instanceof TextInput))
      throw new TypeError("GLUON: Text input modal must be provided.");

    const body = {};

    // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
    body.type = 9;
    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data = {};

    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data.title = title;

    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data.custom_id = customId;

    const components = new ActionRow().addComponent(textInputModal);

    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data.components =
      Array.isArray(components) != true ? [components] : [];

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );
  }

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
  async autocompleteResponse({
    choices,
  }: {
    choices: CommandChoiceBuilderType[];
  }) {
    if (!choices || !Array.isArray(choices))
      throw new Error("GLUON: No choices provided.");

    const body = {};

    // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
    body.type = 8;
    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data = {};

    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data.choices = choices;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );
  }

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
  async reply({
    content,
    files,
    embeds,
    components,
    quiet,
  }: {
    content?: string;
    files?: FileUpload[];
    embeds?: Embed[];
    components?: MessageComponentsType;
    quiet?: boolean;
  }) {
    if (!content && !files && !embeds && !components)
      throw new Error(
        "GLUON: No content, files, embed, or components provided.",
      );

    Message.sendValidation({ content, embeds, components, files });

    if (typeof quiet !== "undefined" && typeof quiet !== "boolean")
      throw new TypeError("GLUON: Quiet must be a boolean.");

    if (this.#_responses_sent === 0) {
      const body = {};

      // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
      body.type = 4;
      // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
      body.data = {};

      // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
      if (content) body.data.content = content;
      // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
      if (files) body.files = files;
      // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
      if (embeds) body.data.embeds = embeds;
      if (components)
        // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
        body.data.components =
          Array.isArray(components) != true ? components : [];
      // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
      if (quiet == true) body.data.flags = 64;

      await this.#_client.request.makeRequest(
        "postInteractionResponse",
        [this.id, this.#token],
        body,
      );
      this.#_responses_sent++;
    } else if (this.#_responses_sent < 6) {
      const body = {};

      // @ts-expect-error TS(2339): Property 'content' does not exist on type '{}'.
      if (content) body.content = content;
      // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
      if (files) body.files = files;
      // @ts-expect-error TS(2339): Property 'embeds' does not exist on type '{}'.
      if (embeds) body.embeds = embeds;
      if (components)
        // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
        body.components = Array.isArray(components) != true ? components : [];
      // @ts-expect-error TS(2339): Property 'flags' does not exist on type '{}'.
      if (quiet == true) body.flags = 64;

      await this.#_client.request.makeRequest(
        "postExecuteWebhook",
        [this.#_client.user.id, this.#token],
        body,
      );
      this.#_responses_sent++;
    } else {
      throw new Error(
        "GLUON: You have reached the maximum number of responses for this interaction (5).",
      );
    }

    return this;
  }

  /**
   * Silently acknowledges an interaction.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   */
  async acknowledge() {
    const body = {};

    // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
    body.type = 6;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );

    return this;
  }

  /**
   * Deletes a response to an interaction. Works up to 15 minutes after the response was sent.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  async delete() {
    return Interaction.delete(this.#_client, this.#token);
  }

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
  static async delete(client: ClientType, interactionToken: string) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof interactionToken !== "string")
      throw new TypeError("GLUON: Interaction token must be a string");

    return client.request.makeRequest("deleteOriginalInteractionResponse", [
      client.user.id,
      interactionToken,
    ]);
  }

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
  async edit({
    content,
    files,
    embeds,
    components,
  }: {
    content?: string;
    files?: FileUpload[];
    embeds?: Embed[];
    components?: MessageComponentsType;
  }) {
    return Interaction.edit(this.#_client, this.#token, {
      content,
      files,
      embeds,
      components,
    });
  }

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
  static async edit(
    client: ClientType,
    interactionToken: string,
    {
      content,
      files,
      embeds,
      components,
    }: {
      content?: string;
      files?: FileUpload[];
      embeds?: Embed[];
      components?: MessageComponentsType;
    },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof interactionToken !== "string")
      throw new TypeError("GLUON: Interaction token must be a string");

    Message.sendValidation({ content, embeds, components, files });

    const body = {};

    // @ts-expect-error TS(2339): Property 'content' does not exist on type '{}'.
    if (content) body.content = content;
    // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
    if (files) body.files = files;
    // @ts-expect-error TS(2339): Property 'embeds' does not exist on type '{}'.
    if (embeds) body.embeds = embeds;
    if (components)
      // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
      body.components = Array.isArray(components) != true ? components : [];

    return client.request.makeRequest(
      "patchOriginalInteractionResponse",
      [client.user.id, interactionToken],
      body,
    );
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Interaction: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): InteractionCacheJSON | InteractionDiscordJSON | InteractionStorageJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          id: this.id,
          type: this.type,
          guild_id: this.guildId,
          channel_id: this.channelId,
          member: this.member
            ? (this.member.toJSON(format) as
                | MemberCacheJSON
                | MemberStorageJSON)
            : null,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          type: this.type,
          guild_id: this.guildId,
          channel_id: this.channelId,
          member: this.member
            ? (this.member.toJSON(format) as MemberDiscordJSON)
            : null,
        };
      }
    }
  }
}

export default Interaction;
