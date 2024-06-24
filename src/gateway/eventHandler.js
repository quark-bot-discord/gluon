/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
const { EVENTS, INTERACTION_TYPES, COMPONENT_TYPES } = require("../constants");
const AuditLog = require("../structures/AuditLog");
const ButtonClick = require("../structures/ButtonClick");
const Emoji = require("../structures/Emoji");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const Message = require("../structures/Message");
const OptionSelect = require("../structures/OptionSelect");
const Role = require("../structures/Role");
const ScheduledEvent = require("../structures/ScheduledEvent");
const SlashCommand = require("../structures/SlashCommand");
const Thread = require("../structures/Thread");
const User = require("../structures/User");
const VoiceState = require("../structures/VoiceState");
const Invite = require("../structures/Invite");
const cacheChannel = require("../util/cacheChannel");
const deepCompare = require("../util/deepCompare");
const getMessage = require("../util/getMessage");
const ModalResponse = require("../structures/ModalResponse");
const getMember = require("../util/getMember");

class EventHandler {

    constructor(client, ws) {

        this.client = client;

        this.ws = ws;

        this.initialGuilds = [];

        this.initialisedSent = false;

    }

    READY(data) {

        this.ws.sessionId = data.session_id;

        this.ws.resumeGatewayUrl = data.resume_gateway_url;

        this.ws.retries = 0;

        const user = new User(this.client, data.user);

        this.client.user = user;

        this.client.ready = true;

        this.initialGuilds = data.guilds.map(g => g.id);

        this.client.emit(EVENTS.READY, this.initialGuilds);

    }

    RESUMED(data) {

        this.ws.retries = 0;

        this.ws.heartbeatInit();

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => RESUMED`);

        this.client.emit(EVENTS.RESUMED);

    }

    GUILD_CREATE(data) {

        let guild;

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_CREATE ${data.id}`);

        if (this.client.guilds.cache.get(data.id)?.unavailable == true && data.unavailable != true) {
            guild = new Guild(this.client, data);
            return;
        } else
            guild = new Guild(this.client, data);

        if (!this.initialGuilds.includes(data.id))
            this.client.emit(EVENTS.GUILD_CREATE, guild);
        else
            this.initialGuilds.splice(this.initialGuilds.indexOf(data.id), 1);

        if (this.initialGuilds.length == 0 && this.initialisedSent == false) {
            this.initialisedSent = true;
            this.client.emit(EVENTS.INITIALISED);
        }

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
            guild.cleanup();
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

    CHANNEL_PINS_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => CHANNEL_PINS_UPDATE ${data.guild_id}`);

        this.client.emit(EVENTS.CHANNEL_PINS_UPDATE, data);

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

    THREAD_LIST_SYNC(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => THREAD_LIST_SYNC ${data.guild_id}`);

        let threads = [];
        for (let i = 0; i < data.threads.length; i++)
            threads.push(new Thread(this.client, data.threads[i], data.guild_id));

        this.client.emit(EVENTS.THREAD_LIST_SYNC, threads);

    }

    GUILD_MEMBER_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_ADD ${data.guild_id}`);

        const member = new Member(this.client, data, data.user.id, data.guild_id, data.user);

        member.guild.member_count += 1;

        this.client.emit(EVENTS.GUILD_MEMBER_ADD, member);

    }

    GUILD_MEMBER_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_REMOVE ${data.guild_id}`);

        getMember(this.client, data.guild_id, data.user.id, true)
            .then(member => {

                const guild = this.client.guilds.cache.get(data.guild_id) || null;

                if (member)
                    guild?.members.remove(data.user.id);
                else {
                    member = new User(this.client, data.user, { nocache: true });
                    member.user = member;
                    member.guild = guild || null;
                    if (!member.guild)
                        member.guild_id = BigInt(data.guild_id);
                }

                member.guild.member_count -= 1;

                this.client.emit(EVENTS.GUILD_MEMBER_REMOVE, member);

            });

    }

    GUILD_MEMBER_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBER_UPDATE ${data.guild_id}`);

        getMember(this.client, data.guild_id, data.user.id)
            .then(oldMember => {

                const newMember = new Member(this.client, data, data.user.id, data.guild_id, data.user);

                this.client.emit(EVENTS.GUILD_MEMBER_UPDATE, oldMember, newMember);

            });

    }

    GUILD_MEMBERS_CHUNK(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_MEMBERS_CHUNK ${data.guild_id}`);

        for (let i = 0; i < data.members.length; i++)
            new Member(this.client, data.members[i], data.members[i].user.id, data.guild_id, data.members[i].user);

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

        const invite = new Invite(this.client, data, data.guild_id);

        this.client.emit(EVENTS.INVITE_CREATE, invite);

    }

    INVITE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => INVITE_DELETE ${data.guild_id}`);

        const guild = this.client.guilds.cache.get(data.guild_id);

        const invite = guild?.invites?.cache.get(data.code) || null;

        guild?.invites?.cache.delete(data.code);

        this.client.emit(EVENTS.INVITE_DELETE, data, invite);

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

    VOICE_CHANNEL_STATUS_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => VOICE_CHANNEL_STATUS_UPDATE ${data.guild_id}`);

        this.client.emit(EVENTS.VOICE_CHANNEL_STATUS_UPDATE, data);

    }

    MESSAGE_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_CREATE ${data.guild_id}`);

        const message = new Message(this.client, data, data.channel_id, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_CREATE, message);

    }

    MESSAGE_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_UPDATE ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.id)
            .then(oldMessage => {

                const newMessage = new Message(this.client, data, data.channel_id, data.guild_id);

                this.client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);

            });

    }

    MESSAGE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_DELETE ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.id, true)
            .then(message => {

                this.client.emit(EVENTS.MESSAGE_DELETE, message);

            });

    }

    MESSAGE_DELETE_BULK(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_DELETE_BULK ${data.guild_id}`);

        let messages = [];
        for (let i = 0; i < data.ids.length; i++)
            messages.push(getMessage(this.client, data.guild_id, data.channel_id, data.ids[i], true));

        Promise.all(messages)
            .then(m => this.client.emit(EVENTS.MESSAGE_DELETE_BULK, m.filter(a => a != null)));

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

                    case COMPONENT_TYPES.SELECT_MENU:
                    case COMPONENT_TYPES.USER_SELECT_MENU:
                    case COMPONENT_TYPES.ROLE_SELECT_MENU:
                    case COMPONENT_TYPES.MENTIONABLE_SELECT_MENU:
                    case COMPONENT_TYPES.CHANNEL_SELECT_MENU: {

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

            case INTERACTION_TYPES.MODAL_SUBMIT: {

                const componentInteraction = new ModalResponse(this.client, data);

                this.client.emit(EVENTS.MODAL_RESPONSE, componentInteraction);

                break;

            }

            case INTERACTION_TYPES.APPLICATION_COMMAND_AUTOCOMPLETE: {

                const commandInteraction = new SlashCommand(this.client, data);

                this.client.emit(EVENTS.SLASH_COMMAND_AUTOCOMPLETE, commandInteraction);

            }

        }

    }

    GUILD_AUDIT_LOG_ENTRY_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_AUDIT_LOG_ENTRY_CREATE ${data.guild_id}`);

        const auditLogEntry = new AuditLog(this.client, data);

        this.client.emit(EVENTS.GUILD_AUDIT_LOG_ENTRY_CREATE, auditLogEntry);

    }

    ENTITLEMENT_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => ENTITLEMENT_CREATE ${data.user_id}`);

        this.client.emit(EVENTS.ENTITLEMENT_CREATE, data);

    }

    ENTITLEMENT_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => ENTITLEMENT_UPDATE ${data.user_id}`);

        this.client.emit(EVENTS.ENTITLEMENT_UPDATE, data);

    }

    ENTITLEMENT_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => ENTITLEMENT_DELETE ${data.user_id}`);

        this.client.emit(EVENTS.ENTITLEMENT_DELETE, data);

    }

    GUILD_SCHEDULED_EVENT_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_SCHEDULED_EVENT_CREATE ${data.guild_id}`);

        const scheduledEvent = new ScheduledEvent(this.client, data);

        this.client.emit(EVENTS.GUILD_SCHEDULED_EVENT_CREATE, scheduledEvent);

    }

    GUILD_SCHEDULED_EVENT_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_SCHEDULED_EVENT_UPDATE ${data.guild_id}`);

        const oldScheduledEvent = this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.get(data.id) || null;
        const newScheduledEvent = new ScheduledEvent(this.client, data);

        this.client.emit(EVENTS.GUILD_SCHEDULED_EVENT_UPDATE, oldScheduledEvent, newScheduledEvent);

    }

    GUILD_SCHEDULED_EVENT_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_SCHEDULED_EVENT_DELETE ${data.guild_id}`);

        const scheduledEvent = this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.get(data.id) || null;
        this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.delete(data.id);

        this.client.emit(EVENTS.GUILD_SCHEDULED_EVENT_DELETE, scheduledEvent);

    }

    GUILD_SCHEDULED_EVENT_USER_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_SCHEDULED_EVENT_USER_ADD ${data.guild_id}`);

        const scheduledEvent = this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.get(data.guild_scheduled_event_id) || null;

        if (scheduledEvent) {

            scheduledEvent.user_count++;

            this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.set(data.guild_scheduled_event_id, scheduledEvent);

        }

        const user = this.client.users.cache.get(data.user_id) || null;

        this.client.emit(EVENTS.GUILD_SCHEDULED_EVENT_USER_ADD, data, user);

    }

    GUILD_SCHEDULED_EVENT_USER_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_SCHEDULED_EVENT_USER_REMOVE ${data.guild_id}`);

        const scheduledEvent = this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.get(data.guild_scheduled_event_id) || null;

        if (scheduledEvent) {

            scheduledEvent.user_count--;

            this.client.guilds.cache.get(data.guild_id)?.scheduled_events.cache.set(data.guild_scheduled_event_id, scheduledEvent);

        }

        const user = this.client.users.cache.get(data.user_id) || null;

        this.client.emit(EVENTS.GUILD_SCHEDULED_EVENT_USER_REMOVE, data, user);

    }

    AUTO_MODERATION_RULE_CREATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => AUTO_MODERATION_RULE_CREATE ${data.guild_id}`);

        this.client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);

    }

    AUTO_MODERATION_RULE_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => AUTO_MODERATION_RULE_UPDATE ${data.guild_id}`);

        this.client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);

    }

    AUTO_MODERATION_RULE_DELETE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => AUTO_MODERATION_RULE_DELETE ${data.guild_id}`);

        this.client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);

    }

    AUTO_MODERATION_ACTION_EXECUTION(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => AUTO_MODERATION_ACTION_EXECUTION ${data.guild_id}`);

        this.client.emit(EVENTS.AUTO_MODERATION_ACTION_EXECUTION, data);

    }

    GUILD_EMOJIS_UPDATE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => GUILD_EMOJIS_UPDATE ${data.guild_id}`);

        const oldEmojis = this.client.guilds.cache.get(data.guild_id)?.emojis.cache;

        if (oldEmojis.size < data.emojis.length) {
            // EMOJI ADDED
            let addedEmojiRaw;
            const oldIds = Array.from(oldEmojis.keys());

            for (let i = 0; i < data.emojis.length; i++) {

                let matchingFound = false;

                for (let n = 0; n < oldIds.length; n++)
                    if (oldIds[n] == data.emojis[i].id) {

                        matchingFound = true;
                        break;

                    }

                if (matchingFound != true) {

                    addedEmojiRaw = data.emojis[i];
                    break;

                }

            }

            const addedEmoji = new Emoji(this.client, addedEmojiRaw, data.guild_id);

            this.client.emit(EVENTS.GUILD_EMOJI_CREATE, addedEmoji);

        } else if (oldEmojis.size > data.emojis.length) {
            // EMOJI DELETED
            let deletedId;
            const oldIds = Array.from(oldEmojis.keys());

            for (let i = 0; i < oldIds.length; i++) {

                let matchingFound = false;

                for (let n = 0; n < data.emojis.length; n++)
                    if (oldIds[i] == data.emojis[n].id) {

                        matchingFound = true;
                        break;

                    }

                if (matchingFound != true) {

                    deletedId = oldIds[i];
                    break;

                }

            }

            const deletedEmoji = oldEmojis.get(deletedId);

            this.client.guilds.cache.get(data.guild_id)?.emojis.cache.delete(deletedId);

            this.client.emit(EVENTS.GUILD_EMOJI_DELETE, deletedEmoji);

        } else {
            // EMOJI UPDATED
            const oldEmojisArray = Array.from(oldEmojis.values());

            let newEmoji;
            let oldEmoji;

            for (let i = 0; i < oldEmojisArray.length; i++) {

                const correspondingNewEmojiRaw = data.emojis.find(e => e.id == oldEmojisArray[i].id);
                const correspondingNewEmoji = new Emoji(this.client, correspondingNewEmojiRaw, data.guild_id);

                const differences = deepCompare(oldEmojisArray[i], correspondingNewEmoji);

                if (differences.length != 0) {

                    newEmoji = correspondingNewEmoji;
                    oldEmoji = oldEmojisArray[i];
                    break;

                }

            }

            this.client.emit(EVENTS.GUILD_EMOJI_UPDATE, oldEmoji, newEmoji);

        }


    }

    MESSAGE_POLL_VOTE_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_POLL_VOTE_ADD ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.message_id)
            .then(message => {

                if (!message)
                    return;

                message.pollResponses.addVote(data.user_id, data.answer_id);

            });

        this.client.emit(EVENTS.MESSAGE_POLL_VOTE_ADD, data);

    }

    MESSAGE_POLL_VOTE_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_POLL_VOTE_REMOVE ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.message_id)
            .then(message => {

                if (!message)
                    return;

                message.pollResponses.removeVote(data.user_id, data.answer_id);

            });

        this.client.emit(EVENTS.MESSAGE_POLL_VOTE_REMOVE, data);

    }

    MESSAGE_REACTION_ADD(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_REACTION_ADD ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.message_id)
            .then(message => {

                if (!message)
                    return;

                message.reactions.addReaction(data.user_id, data.emoji.id ? data.emoji.id : data.emoji.name, data);

            });

        const finalData = data;

        finalData.emoji = new Emoji(this.client, data.emoji, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_REACTION_ADD, finalData);

    }

    MESSAGE_REACTION_REMOVE(data) {

        this.client.emit("debug", `${this.ws.libName} ${this.ws.shardNorminal} @ ${this.ws.time()} => MESSAGE_REACTION_REMOVE ${data.guild_id}`);

        getMessage(this.client, data.guild_id, data.channel_id, data.message_id)
            .then(message => {

                if (!message)
                    return;

                message.reactions.removeReaction(data.user_id, data.emoji.id ? data.emoji.id : data.emoji.name);

            });

        const finalData = data;

        finalData.emoji = new Emoji(this.client, data.emoji, data.guild_id);

        this.client.emit(EVENTS.MESSAGE_REACTION_REMOVE, finalData);

    }
}

module.exports = EventHandler;