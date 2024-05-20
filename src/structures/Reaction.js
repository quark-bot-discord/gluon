const Emoji = require("./Emoji");

class Reaction {

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

        /**
         * The emoji used for the reaction.
         * @type {Emoji}
         */
        if (data.emoji.mention)
            this.emoji = data.emoji;
        else
            this.emoji = new Emoji(client, data, guild_id, true);

        /**
         * Users who reacted with this emoji.
         * @type {Array<BigInt>}
         */
        this._reacted = data._reacted || [];

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

        return this._reacted.map(userId => {

            const member = this.guild.members.cache.get(userId.toString());

            if (member)
                return member;
            else
                return userId;

        });

    }

}

module.exports = Reaction;