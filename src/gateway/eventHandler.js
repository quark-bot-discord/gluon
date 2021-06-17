const { EVENTS, INTERACTION_TYPES } = require("../constants");
const ButtonClick = require("../structures/ButtonClick");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const Message = require("../structures/Message");
const SlashCommand = require("../structures/SlashCommand");
const User = require("../structures/User");
const VoiceState = require("../structures/VoiceState");

class EventHandler {

    constructor(client, ws) {

        this.client = client;

        this.ws = ws;

    }

    READY(data) {

        this.ws.sessionId = data.session_id;

        const user = new User(this.client, data.user);
        
        this.client.user = user;
        
        this.client.emit(EVENTS.READY);

    }

    GUILD_CREATE(data) {

        if (data.unavailable == false) {

            new Guild(this.client, data);

        }

    }

    MESSAGE_CREATE(data) {

        const message = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

    MESSAGE_UPDATE(data) {

        const oldMessage = this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.get(data.id) || null;
        const newMessage = new Message(this.client, data, data.channel_id, data.guild_id);
        this.client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);

    }

    MESSAGE_DELETE(data) {

        const message = this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.get(data.id) || null;
        this.client.guilds.cache.get(data.guild_id).channels.cache.get(data.channel_id).messages.cache.delete(data.id);
        this.client.emit(EVENTS.MESSAGE_DELETE, message);

    }

    GUILD_MEMBER_ADD(data) {

        const member = new Member(this.client, data, data.user.id, data.guild_id);
        this.client.emit("guildMemberAdd", member);

    }

    GUILD_MEMBER_REMOVE(data) {

        let member = this.client.guilds.cache.get(data.guild_id).members.cache.get(data.user.id);
        if (member)
            this.client.guilds.cache.get(data.guild_id).members.cache.delete(data.user.id);
        else
            member = new Member(this.client, data, data.user.id, data.guild_id, true);
        this.client.emit("guildMemberRemove", member);

    }

    INTERACTION_CREATE(data) {

        switch (data.type) {

            case INTERACTION_TYPES.COMPONENT: {

                const componentInteraction = new ButtonClick(this.client, data);
                this.client.emit("buttonClick", componentInteraction);
                break;

            }

            case INTERACTION_TYPES.COMMAND: {

                const commandInteraction = new SlashCommand();
                this.client.emit("slashCommand", commandInteraction);
                break;

            }

        }

    }

    VOICE_STATE_UPDATE(data) {

        const oldVoiceState = this.client.guilds.cache.get(data.guild_id).voice_states.cache.get(data.user_id) || null;
        let newVoiceState;
        if (data.channel_id) {
            newVoiceState = new VoiceState(this.client, data, data.guild_id);
        } else {
            newVoiceState = null;
            this.client.guilds.cache.get(data.guild_id).voice_states.cache.delete(data.user_id);
        }
        this.client.emit("voiceStateUpdate", oldVoiceState, newVoiceState);

    }

}

module.exports = EventHandler;