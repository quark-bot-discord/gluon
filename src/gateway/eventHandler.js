const chalk = require("chalk");
const { EVENTS, INTERACTION_TYPES, COMPONENT_TYPES } = require("../constants");
const ButtonClick = require("../structures/ButtonClick");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const Message = require("../structures/Message");
const OptionSelect = require("../structures/OptionSelect");
const Role = require("../structures/Role");
const SlashCommand = require("../structures/SlashCommand");
const Thread = require("../structures/Thread");
const User = require("../structures/User");
const VoiceState = require("../structures/VoiceState");
const cacheChannel = require("../util/cacheChannel");

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

    RESUMED(data) {

        this.client.emit("debug", `RESUMED`);

    }

    GUILD_CREATE(data) {

        if (data.unavailable == false) {

            const guild = new Guild(this.client, data);

            this.client.emit(EVENTS.GUILD_CREATE, guild);

        }

    }

    GUILD_UPDATE(data) {



    }

    GUILD_DELETE(data) {

        if (data.unavailable != true) {

            const guild = this.client.guilds.cache.get(data.id);
            this.client.guilds.cache.delete(data.id);

            this.client.emit(EVENTS.GUILD_DELETE, guild);

        }

    }

    GUILD_JOIN_REQUEST_DELETE(data) {

    }

    GUILD_ROLE_CREATE(data) {

        const role = new Role(this.client, data, data.guild_id);

        this.client.emit(EVENTS.GUILD_ROLE_CREATE, role);

    }

    GUILD_ROLE_UPDATE(data) {

        const oldRole = this.client.guilds.cache.get(data.guild_id)?.roles.cache.get(data.id);
        const newRole = new Role(this.client, data, data.guild_id);

        this.client.emit(EVENTS.GUILD_ROLE_UPDATE, oldRole, newRole);

    }

    GUILD_ROLE_DELETE(data) {

        const role = this.client.guilds.cache.get(data.guild_id)?.roles.cache.get(data.id);
        this.client.guilds.cache.get(data.guild_id)?.roles.cache.delete(data.id);

        this.client.emit(EVENTS.GUILD_ROLE_DELETE, role);

    }

    CHANNEL_CREATE(data) {

        const channel = cacheChannel(this.client, data, data.guild_id);

        this.client.emit(EVENTS.CHANNEL_CREATE, channel);

    }

    CHANNEL_UPDATE(data) {

        const oldChannel = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        const newChannel = cacheChannel(this.client, data, data.guild_id, true);

        this.client.emit(EVENTS.CHANNEL_UPDATE, oldChannel, newChannel);

    }

    CHANNEL_DELETE(data) {

        const channel = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.delete(data.id);

        this.client.emit(EVENTS.CHANNEL_DELETE, channel);

    }

    CHANNEL_PINS_UPDATE(data) {



    }

    THREAD_CREATE(data) {

        const thread = new Thread(this.client, data, data.guild_id);

        this.client.emit(EVENTS.THREAD_CREATE, thread);

    }

    THREAD_UPDATE(data) {

        const oldThread = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        const newThread = new Thread(this.client, data, data.guild_id);

        this.client.emit(EVENTS.THREAD_UPDATE, oldThread, newThread);

    }

    THREAD_DELETE(data) {

        const thread = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.delete(data.id);

        this.client.emit(EVENTS.THREAD_DELETE, thread);

    }

    THREAD_LIST_SYNC(data) {



    }

    THREAD_MEMBER_UPDATE(data) {



    }

    THREAD_MEMBERS_UPDATE(data) {



    }

    STAGE_INSTANCE_CREATE(data) {



    }

    STAGE_INSTANCE_UPDATE(data) {



    }

    STAGE_INSTANCE_DELETE(data) {



    }

    GUILD_MEMBER_ADD(data) {

        const member = new Member(this.client, data, data.user.id, data.guild_id, data.user);
        
        this.client.emit(EVENTS.GUILD_MEMBER_ADD, member);

    }

    GUILD_MEMBER_REMOVE(data) {

        let member = this.client.guilds.cache.get(data.guild_id)?.members.cache.get(data.user.id);
        if (member)
            this.client.guilds.cache.get(data.guild_id)?.members.cache.delete(data.user.id);
        else
            member = new Member(this.client, data, data.user.id, data.guild_id, data.user, true);

        this.client.emit(EVENTS.GUILD_MEMBER_REMOVE, member);

    }

    GUILD_MEMBER_UPDATE(data) {

        const oldMember = this.client.guilds.cache.get(data.guild_id)?.members.cache.get(data.user.id);
        const newMember = new Member(this.client, data, data.user.id, data.guild_id, data.user);

        this.client.emit(EVENTS.GUILD_MEMBER_UPDATE, oldMember, newMember);

    }

    GUILD_BAN_ADD(data) {

        const user = new User(client, data);
        user.guild_id = BigInt(data.guild_id);

        this.client.emit(EVENTS.GUILD_BAN_ADD, user);

    }

    GUILD_BAN_REMOVE(data) {

        const user = new User(client, data);
        user.guild_id = BigInt(data.guild_id);

        this.client.emit(EVENTS.GUILD_BAN_ADD, user);

    }

    INVITE_CREATE(data) {

        this.client.emit(EVENTS.INVITE_CREATE, data);

    }

    INVITE_DELETE(data) {

        this.client.emit(EVENTS.INVITE_DELETE, data);

    }

    VOICE_STATE_UPDATE(data) {

        const oldVoiceState = this.client.guilds.cache.get(data.guild_id)?.voice_states.cache.get(data.user_id) || null;
        let newVoiceState;
        if (data.channel_id) {
            newVoiceState = new VoiceState(this.client, data, data.guild_id);
        } else {
            newVoiceState = null;
            this.client.guilds.cache.get(data.guild_id)?.voice_states.cache.delete(data.user_id);
        }

        this.client.emit(EVENTS.VOICE_STATE_UPDATE, oldVoiceState, newVoiceState);

    }

    MESSAGE_CREATE(data) {

        const message = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

    MESSAGE_UPDATE(data) {

        const oldMessage = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.get(data.id) || null;
        const newMessage = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);

    }

    MESSAGE_DELETE(data) {

        const message = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.get(data.id) || null;
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.delete(data.id);
        
        this.client.emit(EVENTS.MESSAGE_DELETE, message);

    }

    MESSAGE_DELETE_BULK(data) {

        let messages = [];
        for (let i = 0; i < data.ids.length; i++) {
            const message = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.get(data.ids[i]);
            if (message) {
                messages.push(message);
                this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.delete(data.ids[i]);
            }
        }

        this.client.emit(EVENTS.MESSAGE_DELETE_BULK, messages);

    }

    INTERACTION_CREATE(data) {

        switch (data.type) {

            case INTERACTION_TYPES.COMPONENT: {

                switch (data.data.component_type) {

                    case COMPONENT_TYPES.BUTTON: {

                        const componentInteraction = new ButtonClick(this.client, data);
                
                        this.client.emit(EVENTS.BUTTON_CLICK, componentInteraction);

                        break;

                    }

                    case COMPONENT_TYPES.SELECT_MENU: {

                        const componentInteraction = new OptionSelect(this.client, data);

                        this.client.emit(EVENTS.MENU_SELECT, componentInteraction);

                        break;

                    }

                }

                break;

            }

            case INTERACTION_TYPES.COMMAND: {

                const commandInteraction = new SlashCommand(this.client, data);

                this.client.emit(EVENTS.SLASH_COMMAND, commandInteraction);

                break;

            }

        }

    }

    APPLICATION_COMMAND_UPDATE() {

    }

}

module.exports = EventHandler;