const Emoji = require("./Emoji");

/**
 * Represents a reaction belonging to a message.
 */
class Reaction {
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {String} guild_id The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(client, data, guild_id) {
    /**
     * The client instance.
     * @type {Client}
     */
    this.client = client;

    /**
     * The guild that this reaction belongs to.
     * @type {Guild?}
     */
    this.guild = this.client.guilds.cache.get(guild_id) || null;

    if (!this.guild)
      /**
       * The id of the guild that this reaction belongs to.
       * @type {BigInt?}
       */
      this.guild_id = BigInt(guild_id);

    if (data.emoji.mention)
      /**
       * The emoji used for the reaction.
       * @type {Emoji}
       */
      this.emoji = data.emoji;
    else this.emoji = new Emoji(client, data, guild_id, true);

    /**
     * Users who reacted with this emoji.
     * @type {Array<BigInt>}
     */
    this._reacted = data._reacted || [];

    /**
     * The user who added the first reaction.
     * @type {BigInt?}
     */
    if (data.initial_reactor)
      this.initial_reactor = BigInt(data.initial_reactor);
  }

  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   */
  get count() {
    return this._reacted.length;
  }

  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | BigInt>}
   */
  get reacted() {
    return this._reacted.map((userId) => {
      const member = this.guild.members.cache.get(userId.toString());

      if (member) return member;
      else return userId;
    });
  }
}

module.exports = Reaction;
