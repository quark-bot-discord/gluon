const Interaction = require("./Interaction");
const Message = require("./Message");

class ButtonClick extends Interaction {

    constructor(client, data) {

        super(client, data);

        this.custom_id = data.data.custom_id;

        this.message = new Message(this.client, data.message, data.channel_id, data.guild_id, this.client.cacheMessages);

    }

}

module.exports = ButtonClick;