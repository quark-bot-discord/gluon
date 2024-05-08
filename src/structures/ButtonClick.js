const Interaction = require("./Interaction");
const Message = require("./Message");

/**
 * Represents when a button is clicked.
 */
class ButtonClick extends Interaction {

    /**
     * Creates a button click interaction structure.
     * @param {Client} client The client instance.
     * @param {Object} data The interaction data from Discord.
     */
    constructor(client, data) {

        super(client, data);

        this.custom_id = data.data.custom_id;

        this.message = new Message(this.client, data.message, data.channel_id, data.guild_id, this.client.cacheMessages);

    }

}

module.exports = ButtonClick;