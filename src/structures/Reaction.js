const Emoji = require("./Emoji");

/**
 * Represents a reaction belonging to a message.
 */
class Reaction {
  #_client;
  #_guild_id;
  #emoji;
  #_reacted;
  #initial_reactor;
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {String} guild_id The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(client, data, { guild_id } = {}) {
    /**
     * The client instance.
     * @type {Client}
     */
    this.#_client = client;

    /**
     * The id of the guild that this reaction belongs to.
     * @type {BigInt}
     */
    this.#_guild_id = BigInt(guild_id);

    if (data.emoji.mention)
      /**
       * The emoji used for the reaction.
       * @type {Emoji}
       */
      this.#emoji = data.emoji;
    else this.#emoji = new Emoji(client, data, { guild_id, nocache: true });

    /**
     * Users who reacted with this emoji.
     * @type {Array<BigInt>}
     */
    this.#_reacted = data._reacted.map((r) => BigInt(r)) || [];

    /**
     * The user who added the first reaction.
     * @type {BigInt?}
     */
    if (data.initial_reactor)
      this.#initial_reactor = BigInt(data.initial_reactor);
  }

  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   */
  get count() {
    return this.#_reacted.length;
  }

  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | String>}
   */
  get reacted() {
    return this.#_reacted.map((userId) => {
      const member = this.guild.members.get(String(userId));

      if (member) return member;
      else return String(userId);
    });
  }

  /**
   * The user ids of the users who reacted.
   * @readonly
   * @type {Array<String>}
   */
  get reactedIds() {
    return this.#_reacted.map((r) => String(r));
  }

  /**
   * The id of the guild that this reaction belongs to.
   * @type {String}
   * @readonly
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this reaction belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The emoji used for the reaction.
   * @type {Emoji}
   * @readonly
   */
  get emoji() {
    return this.#emoji;
  }

  /**
   * The user who added the first reaction.
   * @type {String?}
   * @readonly
   */
  get initialReactor() {
    return this.#initial_reactor ? String(this.#initial_reactor) : null;
  }
  
  toString() {
    return `<Reaction: ${this.emoji}>`;
  }

  toJSON() {
    return {
      emoji: this.emoji,
      _reacted: this.reactedIds,
      initial_reactor: this.initialReactor ?? undefined,
    };
  }
}

module.exports = Reaction;
