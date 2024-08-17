import ActionRow from "../util/builder/actionRowBuilder.js";
import Member from "./Member.js";
import TextInput from "../util/builder/textInputBuilder.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import util from "util";
import Message from "./Message.js";

/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
class Interaction {
  #_client;
  #_id;
  #type;
  #_guild_id;
  #_channel_id;
  #token;
  #member;

  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
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
    this.#_channel_id = BigInt(data.channel_id);

    if (data.member)
      /**
       * The member that triggered the interaction, if it was run in a guild.
       * @type {Member?}
       * @private
       */
      this.#member = new Member(this.#_client, data.member, {
        user_id: data.member.user.id,
        guild_id: data.guild_id,
      });

    /**
     * The interaction token, needed to respond to it.
     * @type {String}
     * @private
     */
    this.#token = data.token;
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
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The id of the channel that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The channel that this interaction belongs to.
   * @type {(TextChannel | VoiceChannel | Thread)?}
   * @readonly
   * @public
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }

  /**
   * The member that triggered the interaction, if it was run in a guild.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    return this.#member;
  }

  /**
   * Prompts a user to enter text using a modal.
   * @param {Object} options Modal options.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  async textPrompt({ title, customId, textInputModal } = {}) {
    if (typeof title !== "string")
      throw new TypeError("GLUON: No title provided.");

    if (typeof customId !== "string")
      throw new TypeError("GLUON: No custom id provided.");

    if (!(textInputModal instanceof TextInput))
      throw new TypeError("GLUON: Text input modal must be provided.");

    const body = {};

    body.type = 9;
    body.data = {};

    body.data.title = title;

    body.data.custom_id = customId;

    const components = new ActionRow().addComponent(textInputModal);

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
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  async autocompleteResponse({ choices } = {}) {
    if (!choices || !Array.isArray(choices))
      throw new Error("GLUON: No choices provided.");

    const body = {};

    body.type = 8;
    body.data = {};

    body.data.choices = choices;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );
  }

  /**
   * Replies to an interaction.
   * @param {String?} content The message content to send in the response to the interaction.
   * @param {Object?} options An embed, components, and whether the response should be as an ephemeral message.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   */
  async reply(content, { files, embeds, components, quiet } = {}) {
    if (!content && !files && !embeds && !components)
      throw new Error(
        "GLUON: No content, files, embed, or components provided.",
      );

    Message.sendValidation({ content, embeds, components, files });

    if (typeof quiet !== "undefined" && typeof quiet !== "boolean")
      throw new TypeError("GLUON: Quiet must be a boolean.");

    const body = {};

    body.type = 4;
    body.data = {};

    if (content) body.data.content = content;
    if (files) body.files = files;
    if (embeds) body.data.embeds = embeds;
    if (components)
      body.data.components =
        Array.isArray(components) != true ? components : [];
    if (quiet == true) body.data.flags = 64;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );

    return this;
  }

  /**
   * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {String?} content The new interaction response content.
   * @param {Object?} options The new interaction response options.
   * @returns {Promise<Interaction>}
   * @public
   * @async
   * @method
   * @throws {Error | TypeError}
   */
  async edit(content, { files, embeds, components } = {}) {
    Message.sendValidation({ content, embeds, components, files });

    const body = {};

    if (content) body.content = content;
    if (files) body.files = files;
    if (embeds) body.embeds = embeds;
    if (components)
      body.components = Array.isArray(components) != true ? components : [];

    await this.#_client.request.makeRequest(
      "patchOriginalInteractionResponse",
      [this.#_client.user.id, this.#token],
      body,
    );

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

    body.type = 6;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body,
    );

    return this;
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
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        return {
          id: this.id,
          type: this.type,
          guild_id: this.guildId,
          channel_id: this.channelId,
          member: this.member.toJSON(format),
          type: this.type,
        };
      }
    }
  }
}

export default Interaction;
