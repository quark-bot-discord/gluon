/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
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

        this.initialGuilds = [];

    }

    READY(data) {

        this.ws.sessionId = data.session_id;

        this.ws.resumeGatewayUrl = data.resume_gateway_url;

        this.ws.retries = 0;

        const user = new User(this.client, data.user);

        this.client.user = user;

        this.client.ready = true;

        this.initialGuilds = data.guilds.map(g => g.id);

        this.client.emit(EVENTS.READY);

    }

    RESUMED(data) {

        this.ws.retries = 0;

        this.ws.heartbeatInit();

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => RESUMED`);

    }

    GUILD_CREATE(data) {

        let guild;

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_CREATE ${data.id}`);

        if (this.client.guilds.cache.get(data.id)?.unavailable == true && data.unavailable != true) {
            guild = new Guild(this.client, data);
            return;
        } else if (!(this.client.guilds.cache.get(data.id) && this.client.guilds.cache.get(data.id).unavailable != true))
            guild = new Guild(this.client, data);

        if (!this.initialGuilds.includes(data.id))
            this.client.emit(EVENTS.GUILD_CREATE, guild);
        else
            this.initialGuilds.splice(this.initialGuilds.indexOf(data.id), 1);

    }

    GUILD_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_UPDATE ${data.id}`);

        const oldGuild = this.client.guilds.cache.get(data.id);
        const newGuild = new Guild(this.client, data);

        this.client.emit(EVENTS.GUILD_UPDATE, oldGuild, newGuild);

    }

    GUILD_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_DELETE ${data.id}`);

        if (data.unavailable != true) {

            const guild = this.client.guilds.cache.get(data.id);
            this.client.guilds.cache.delete(data.id);

            if (!guild)
                return;

            this.client.emit(EVENTS.GUILD_DELETE, guild);

        }

    }

    GUILD_ROLE_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_ROLE_CREATE ${data.guild_id}`);

        const role = new Role(this.client, data.role, data.guild_id);

        this.client.emit(EVENTS.GUILD_ROLE_CREATE, role);

    }

    GUILD_ROLE_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_ROLE_UPDATE ${data.guild_id}`);

        const oldRole = this.client.guilds.cache.get(data.guild_id)?.roles.cache.get(data.role.id);
        const newRole = new Role(this.client, data.role, data.guild_id);

        this.client.emit(EVENTS.GUILD_ROLE_UPDATE, oldRole, newRole);

    }

    GUILD_ROLE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_ROLE_DELETE ${data.guild_id}`);

        const role = this.client.guilds.cache.get(data.guild_id)?.roles.cache.get(data.role_id);
        this.client.guilds.cache.get(data.guild_id)?.roles.cache.delete(data.role_id);

        this.client.emit(EVENTS.GUILD_ROLE_DELETE, role);

    }

    CHANNEL_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => CHANNEL_CREATE ${data.guild_id}`);

        const channel = cacheChannel(this.client, data, data.guild_id);

        this.client.emit(EVENTS.CHANNEL_CREATE, channel);

    }

    CHANNEL_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => CHANNEL_UPDATE ${data.guild_id}`);

        const oldChannel = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        const newChannel = cacheChannel(this.client, data, data.guild_id, true);

        this.client.emit(EVENTS.CHANNEL_UPDATE, oldChannel, newChannel);

    }

    CHANNEL_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => CHANNEL_DELETE ${data.guild_id}`);

        const channel = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.delete(data.id);

        this.client.emit(EVENTS.CHANNEL_DELETE, channel);

    }

    THREAD_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => THREAD_CREATE ${data.guild_id}`);

        const thread = new Thread(this.client, data, data.guild_id);

        this.client.emit(EVENTS.THREAD_CREATE, thread);

    }

    THREAD_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => THREAD_UPDATE ${data.guild_id}`);

        const oldThread = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        const newThread = new Thread(this.client, data, data.guild_id);

        this.client.emit(EVENTS.THREAD_UPDATE, oldThread, newThread);

    }

    THREAD_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => THREAD_DELETE ${data.guild_id}`);

        const thread = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.id);
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.delete(data.id);

        this.client.emit(EVENTS.THREAD_DELETE, thread);

    }

    GUILD_MEMBER_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_ADD ${data.guild_id}`);

        const member = new Member(this.client, data, data.user.id, data.guild_id, data.user);

        member.guild.member_count += 1;

        this.client.emit(EVENTS.GUILD_MEMBER_ADD, member);

    }

    GUILD_MEMBER_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_REMOVE ${data.guild_id}`);

        const guild = this.client.guilds.cache.get(data.guild_id) || null;

        let member = guild?.members.cache.get(data.user.id);
        if (member)
            guild?.members.cache.delete(data.user.id);
        else {
            member = new User(this.client, data.user, true);
            member.user = member;
            member.guild = guild || null;
            if (!member.guild)
                member.guild_id = BigInt(data.guild_id);
        }

        if (member.guild)
            member.guild.member_count -= 1;

        this.client.emit(EVENTS.GUILD_MEMBER_REMOVE, member);

    }

    GUILD_MEMBER_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_UPDATE ${data.guild_id}`);

        const oldMember = this.client.guilds.cache.get(data.guild_id)?.members.cache.get(data.user.id);
        const newMember = new Member(this.client, data, data.user.id, data.guild_id, data.user);

        this.client.emit(EVENTS.GUILD_MEMBER_UPDATE, oldMember, newMember);

    }

    GUILD_BAN_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_BAN_ADD ${data.guild_id}`);

        const user = new User(this.client, data.user);
        user.guild = this.client.guilds.cache.get(data.guild_id) || null;
        if (!user.guild)
            user.guild_id = BigInt(data.guild_id);

        this.client.emit(EVENTS.GUILD_BAN_ADD, user);

    }

    GUILD_BAN_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_BAN_REMOVE ${data.guild_id}`);

        const user = new User(this.client, data.user);
        user.guild = this.client.guilds.cache.get(data.guild_id) || null;
        if (!user.guild)
            user.guild_id = BigInt(data.guild_id);

        this.client.emit(EVENTS.GUILD_BAN_REMOVE, user);

    }

    INVITE_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => INVITE_CREATE ${data.guild_id}`);

        this.client.emit(EVENTS.INVITE_CREATE, data);

    }

    INVITE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => INVITE_DELETE ${data.guild_id}`);

        this.client.emit(EVENTS.INVITE_DELETE, data);

    }

    VOICE_STATE_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => VOICE_STATE_UPDATE ${data.guild_id}`);

        const oldVoiceState = this.client.guilds.cache.get(data.guild_id)?.voice_states.cache.get(data.user_id) || null;
        let newVoiceState;
        if (data.channel_id)
            newVoiceState = new VoiceState(this.client, data, data.guild_id);
        else {
            newVoiceState = null;
            this.client.guilds.cache.get(data.guild_id)?.voice_states.cache.delete(data.user_id);
        }

        this.client.emit(EVENTS.VOICE_STATE_UPDATE, oldVoiceState, newVoiceState);

    }

    MESSAGE_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_CREATE ${data.guild_id}`);

        const message = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

    MESSAGE_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_UPDATE ${data.guild_id}`);

        const oldMessage = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.get(data.id) || null;
        const newMessage = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);

    }

    MESSAGE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_DELETE ${data.guild_id}`);

        const message = this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.get(data.id) || null;
        this.client.guilds.cache.get(data.guild_id)?.channels.cache.get(data.channel_id)?.messages.cache.delete(data.id);

        this.client.emit(EVENTS.MESSAGE_DELETE, message);

    }

    MESSAGE_DELETE_BULK(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_DELETE_BULK ${data.guild_id}`);

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

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => INTERACTION_CREATE ${data.guild_id}`);

        if (!data.guild_id)
            return;

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

}

module.exports = EventHandler;