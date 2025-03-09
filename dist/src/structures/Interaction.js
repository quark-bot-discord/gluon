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
var _Interaction__client,
  _Interaction__id,
  _Interaction_type,
  _Interaction__guild_id,
  _Interaction__channel_id,
  _Interaction_token,
  _Interaction__member_id,
  _Interaction__responses_sent;
import ActionRow from "../util/builder/actionRowBuilder.js";
import Member from "./Member.js";
import TextInput from "../util/builder/textInputBuilder.js";
import util from "util";
import Message from "./Message.js";
import { JsonTypes } from "../../typings/enums.js";
import getMember from "#src/util/gluon/getMember.js";
/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
class Interaction {
  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    _Interaction__client.set(this, void 0);
    _Interaction__id.set(this, void 0);
    _Interaction_type.set(this, void 0);
    _Interaction__guild_id.set(this, void 0);
    _Interaction__channel_id.set(this, void 0);
    _Interaction_token.set(this, void 0);
    _Interaction__member_id.set(this, void 0);
    _Interaction__responses_sent.set(this, 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _Interaction__client, client, "f");
    /**
     * The id of the message.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Interaction__id, BigInt(data.id), "f");
    /**
     * The type of interaction.
     * @type {Number}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-type}
     * @private
     */
    __classPrivateFieldSet(this, _Interaction_type, data.type, "f");
    /**
     * The id of the guild that this interaction belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Interaction__guild_id,
      BigInt(data.guild_id),
      "f",
    );
    /**
     * The id of the channel that this interaction belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Interaction__channel_id,
      data.channel_id ? BigInt(data.channel_id) : undefined,
      "f",
    );
    /**
     * The member that triggered the interaction, if it was run in a guild.
     * @type {Member?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Interaction__member_id,
      BigInt(data.member.user.id),
      "f",
    );
    new Member(
      __classPrivateFieldGet(this, _Interaction__client, "f"),
      data.member,
      {
        userId: data.member.user.id,
        guildId: data.guild_id,
      },
    );
    /**
     * The interaction token, needed to respond to it.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Interaction_token, data.token, "f");
    /**
     * Whether a response has been sent to the interaction.
     * @type {Boolean}
     * @private
     */
    __classPrivateFieldSet(this, _Interaction__responses_sent, 0, "f");
  }
  /**
   * The id of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Interaction__id, "f"));
  }
  /**
   * The token of the interaction.
   * @type {String}
   * @readonly
   * @public
   */
  get token() {
    return __classPrivateFieldGet(this, _Interaction_token, "f");
  }
  /**
   * The type of interaction.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return __classPrivateFieldGet(this, _Interaction_type, "f");
  }
  /**
   * The id of the guild that this interaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Interaction__guild_id, "f"));
  }
  /**
   * The guild that this interaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    const guild = __classPrivateFieldGet(
      this,
      _Interaction__client,
      "f",
    ).guilds.get(this.guildId);
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
    return String(__classPrivateFieldGet(this, _Interaction__channel_id, "f"));
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
    return this.memberId
      ? getMember(
          __classPrivateFieldGet(this, _Interaction__client, "f"),
          this.guildId,
          this.memberId,
        )
      : undefined;
  }
  /**
   * The id of the member that triggered the interaction, if it was run in a guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get memberId() {
    return String(__classPrivateFieldGet(this, _Interaction__member_id, "f"));
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
  async textPrompt({ title, customId, textInputModal }) {
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
    await __classPrivateFieldGet(
      this,
      _Interaction__client,
      "f",
    ).request.makeRequest(
      "postInteractionResponse",
      [this.id, __classPrivateFieldGet(this, _Interaction_token, "f")],
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
  async autocompleteResponse({ choices }) {
    if (!choices || !Array.isArray(choices))
      throw new Error("GLUON: No choices provided.");
    const body = {};
    // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
    body.type = 8;
    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data = {};
    // @ts-expect-error TS(2339): Property 'data' does not exist on type '{}'.
    body.data.choices = choices;
    await __classPrivateFieldGet(
      this,
      _Interaction__client,
      "f",
    ).request.makeRequest(
      "postInteractionResponse",
      [this.id, __classPrivateFieldGet(this, _Interaction_token, "f")],
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
  async reply({ content, files, embeds, components, quiet }) {
    var _a, _b;
    if (!content && !files && !embeds && !components)
      throw new Error(
        "GLUON: No content, files, embed, or components provided.",
      );
    Message.sendValidation({ content, embeds, components, files });
    if (typeof quiet !== "undefined" && typeof quiet !== "boolean")
      throw new TypeError("GLUON: Quiet must be a boolean.");
    if (__classPrivateFieldGet(this, _Interaction__responses_sent, "f") === 0) {
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
      await __classPrivateFieldGet(
        this,
        _Interaction__client,
        "f",
      ).request.makeRequest(
        "postInteractionResponse",
        [this.id, __classPrivateFieldGet(this, _Interaction_token, "f")],
        body,
      );
      __classPrivateFieldSet(
        this,
        _Interaction__responses_sent,
        ((_a = __classPrivateFieldGet(this, _Interaction__responses_sent, "f")),
        _a++,
        _a),
        "f",
      );
    } else if (
      __classPrivateFieldGet(this, _Interaction__responses_sent, "f") < 6
    ) {
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
      await __classPrivateFieldGet(
        this,
        _Interaction__client,
        "f",
      ).request.makeRequest(
        "postExecuteWebhook",
        [
          __classPrivateFieldGet(this, _Interaction__client, "f").user.id,
          __classPrivateFieldGet(this, _Interaction_token, "f"),
        ],
        body,
      );
      __classPrivateFieldSet(
        this,
        _Interaction__responses_sent,
        ((_b = __classPrivateFieldGet(this, _Interaction__responses_sent, "f")),
        _b++,
        _b),
        "f",
      );
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
    await __classPrivateFieldGet(
      this,
      _Interaction__client,
      "f",
    ).request.makeRequest(
      "postInteractionResponse",
      [this.id, __classPrivateFieldGet(this, _Interaction_token, "f")],
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
    return Interaction.delete(
      __classPrivateFieldGet(this, _Interaction__client, "f"),
      __classPrivateFieldGet(this, _Interaction_token, "f"),
    );
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
  static async delete(client, interactionToken) {
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
  async edit({ content, files, embeds, components }) {
    return Interaction.edit(
      __classPrivateFieldGet(this, _Interaction__client, "f"),
      __classPrivateFieldGet(this, _Interaction_token, "f"),
      {
        content,
        files,
        embeds,
        components,
      },
    );
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
    client,
    interactionToken,
    { content, files, embeds, components },
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
  [((_Interaction__client = new WeakMap()),
  (_Interaction__id = new WeakMap()),
  (_Interaction_type = new WeakMap()),
  (_Interaction__guild_id = new WeakMap()),
  (_Interaction__channel_id = new WeakMap()),
  (_Interaction_token = new WeakMap()),
  (_Interaction__member_id = new WeakMap()),
  (_Interaction__responses_sent = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          id: this.id,
          type: this.type,
          guild_id: this.guildId,
          channel_id: this.channelId,
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          type: this.type,
          guild_id: this.guildId,
          channel_id: this.channelId,
          member: this.member ? this.member.toJSON(format) : null,
        };
      }
    }
  }
}
export default Interaction;
//# sourceMappingURL=Interaction.js.map
