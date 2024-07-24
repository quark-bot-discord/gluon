const ActionRow = require("../util/builder/actionRowBuilder");
const Member = require("./Member");

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
     */
    this.#_client = client;

    /**
     * The id of the message.
     * @type {BigInt}
     */
    this.#_id = BigInt(data.id);

    /**
     * The type of interaction.
     * @type {Number}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-type}
     */
    this.#type = data.type;

    /**
     * The id of the guild that this interaction belongs to.
     * @type {BigInt}
     */
    this.#_guild_id = BigInt(data.guild_id);

    /**
     * The id of the channel that this interaction belongs to.
     * @type {BigInt}
     */
    this.#_channel_id = BigInt(data.channel_id);

    if (data.member)
      /**
       * The member that triggered the interaction, if it was run in a guild.
       * @type {Member?}
       */
      this.#member = new Member(this.#_client, data.member, {
        user_id: data.member.user.id,
        guild_id: data.guild_id,
      });

    /**
     * The interaction token, needed to respond to it.
     * @type {String}
     */
    this.#token = data.token;
  }

  /**
   * The id of the interaction.
   * @type {String}
   * @readonly
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The type of interaction.
   * @type {Number}
   * @readonly
   */
  get type() {
    return this.#type;
  }

  /**
   * The id of the guild that this interaction belongs to.
   * @type {String}
   * @readonly
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this interaction belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The id of the channel that this interaction belongs to.
   * @type {String}
   * @readonly
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The channel that this interaction belongs to.
   * @type {TextChannel? | VoiceChannel? | Thread?}
   * @readonly
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }

  /**
   * The member that triggered the interaction, if it was run in a guild.
   * @type {Member?}
   * @readonly
   */
  get member() {
    return this.#member;
  }

  /**
   * Prompts a user to enter text using a modal.
   * @param {Object} options Modal options.
   * @returns {Promise<Interaction>}
   */
  async textPrompt({ title, customId, textInputModal }) {
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
      body
    );
  }

  /**
   * Responds to autocomplete interactions.
   * @param {Object} options Autocompletion options.
   * @returns {Promise<Interaction>}
   */
  async autocompleteResponse({ choices }) {
    const body = {};

    body.type = 8;
    body.data = {};

    body.data.choices = choices;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body
    );
  }

  /**
   * Replies to an interaction.
   * @param {String?} content The message content to send in the response to the interaction.
   * @param {Object?} options An embed, components, and whether the response should be as an ephemeral message.
   * @returns {Promise<Interaction>}
   */
  async reply(
    content,
    { files, embed, embeds, _embed, _embeds, components, quiet } = {}
  ) {
    const body = {};

    body.type = 4;
    body.data = {};

    if (content) body.data.content = content;
    if (files) body.files = files;
    if (embed) body.data.embeds = [embed];
    else if (embeds && embeds.length != 0) body.embeds = embeds;
    else if (_embed) body.data.embeds = [_embed];
    else if (_embeds) body.data.embeds = _embeds;
    if (components)
      body.data.components =
        Array.isArray(components) != true ? components : [];
    if (quiet == true) body.data.flags = 64;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body
    );

    return this;
  }

  /**
   * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {String?} content The new interaction response content.
   * @param {Object?} options The new interaction response options.
   * @returns {Promise<Interaction>}
   */
  async edit(content, { files, embed, _embed, _embeds, components } = {}) {
    const body = {};

    if (content) body.content = content;
    if (files) body.files = files;
    if (embed) body.embeds = [embed];
    else if (_embed) body.embeds = [_embed];
    else if (_embeds) body.embeds = _embeds;
    if (components)
      body.components = Array.isArray(components) != true ? components : [];

    await this.#_client.request.makeRequest(
      "patchOriginalInteractionResponse",
      [this.#_client.user.id, this.#token],
      body
    );

    return this;
  }

  /**
   * Silently acknowledges an interaction.
   * @returns {Promise<Interaction>}
   */
  async acknowledge() {
    const body = {};

    body.type = 6;

    await this.#_client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.#token],
      body
    );

    return this;
  }

  toString() {
    return `<Interaction: ${this.id}>`;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      guildId: this.guildId,
      channelId: this.channelId,
      member: this.member,
    };
  }
}

module.exports = Interaction;
