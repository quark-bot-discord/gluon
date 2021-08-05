const Interaction = require("./Interaction");

/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 */
class SlashCommand extends Interaction {

    constructor(client, data) {

        super(client, data);

        /**
         * Raw slash command data from discord.
         * @type {Object?}
         * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data}
         */
        this.data = data.data;

    }

}

module.exports = SlashCommand;