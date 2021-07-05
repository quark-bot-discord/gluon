const Interaction = require("./Interaction");

class SlashCommand extends Interaction {

    constructor(client, data) {

        super(client, data);

        this.data = data.data;

    }

}

module.exports = SlashCommand;