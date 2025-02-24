/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
import {
  EVENTS,
  INTERACTION_TYPES,
  COMPONENT_TYPES,
  GLUON_DEBUG_LEVELS,
} from "../constants.js";
import AuditLog from "../structures/AuditLog.js";
import ButtonClick from "../structures/ButtonClick.js";
import Emoji from "../structures/Emoji.js";
import Guild from "../structures/Guild.js";
import Member from "../structures/Member.js";
import Message from "../structures/Message.js";
import OptionSelect from "../structures/OptionSelect.js";
import Role from "../structures/Role.js";
import ScheduledEvent from "../structures/ScheduledEvent.js";
import SlashCommand from "../structures/SlashCommand.js";
import Thread from "../structures/Thread.js";
import User from "../structures/User.js";
import VoiceState from "../structures/VoiceState.js";
import Invite from "../structures/Invite.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import deepCompare from "../util/general/deepCompare.js";
import ModalResponse from "../structures/ModalResponse.js";
import ChannelMessageManager from "../managers/ChannelMessageManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import GuildManager from "../managers/GuildManager.js";
import quark from "../util/art/quark.js";
import gluon from "../util/art/gluon.js";

class EventHandler {
  #_client;
  #shard;
  // @ts-expect-error TS(7008): Member '#initialGuilds' implicitly has an 'any[]' ... Remove this comment to see the full error message
  #initialGuilds;
  #initialisedSent;
  #asciiArtSent;
  constructor(client: any, ws: any) {
    this.#_client = client;

    this.#shard = ws;

    this.#initialGuilds = [];

    this.#initialisedSent = false;

    this.#asciiArtSent = false;
  }

  READY(data: any) {
    this.#shard.sessionId = data.session_id;

    this.#shard.resumeGatewayUrl = data.resume_gateway_url;

    this.#shard.resetRetries();

    const user = new User(this.#_client, data.user);

    this.#_client.user = user;

    this.#_client.ready = true;

    this.#initialGuilds = data.guilds.map((g: any) => g.id);

    if (this.#asciiArtSent === false) {
      this.#asciiArtSent = true;
      console.info("\n");
      console.info(quark());
      console.info("\n\n\n");
      console.info(gluon());
    }

    this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "READY");

    this.#_client.emit(EVENTS.READY, this.#initialGuilds);
  }

  RESUMED(data: any) {
    this.#shard.resetRetries();

    this.#_client._emitDebug(GLUON_DEBUG_LEVELS.INFO, "RESUMED");

    this.#_client.emit(EVENTS.RESUMED);
  }

  GUILD_CREATE(data: any) {
    let guild;

    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_CREATE ${data.id}`,
    );

    if (
      GuildManager.getGuild(this.#_client, data.id)?.unavailable == true &&
      data.unavailable != true
    ) {
      guild = new Guild(this.#_client, data);
      return;
    } else guild = new Guild(this.#_client, data);

    if (!this.#initialGuilds.includes(data.id))
      this.#_client.emit(EVENTS.GUILD_CREATE, guild);
    else this.#initialGuilds.splice(this.#initialGuilds.indexOf(data.id), 1);

    if (this.#initialGuilds.length == 0 && this.#initialisedSent == false) {
      this.#initialisedSent = true;
      this.#_client.emit(EVENTS.INITIALISED);
    }
  }

  GUILD_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_UPDATE ${data.id}`,
    );

    const oldGuild = GuildManager.getGuild(this.#_client, data.id);
    const newGuild = new Guild(this.#_client, data);

    this.#_client.emit(EVENTS.GUILD_UPDATE, oldGuild, newGuild);
  }

  GUILD_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_DELETE ${data.id}`,
    );

    if (data.unavailable != true) {
      const guild = GuildManager.getGuild(this.#_client, data.id);

      this.#_client.guilds.delete(data.id);

      if (!guild) return;

      this.#_client.emit(EVENTS.GUILD_DELETE, guild);
    }
  }

  GUILD_ROLE_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_CREATE ${data.guild_id}`,
    );

    const role = new Role(this.#_client, data.role, {
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.GUILD_ROLE_CREATE, role);
  }

  GUILD_ROLE_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_UPDATE ${data.guild_id}`,
    );

    const oldRole = this.#_client.guilds
      .get(data.guild_id)
      ?.roles.get(data.role.id);
    const newRole = new Role(this.#_client, data.role, {
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.GUILD_ROLE_UPDATE, oldRole, newRole);
  }

  GUILD_ROLE_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_DELETE ${data.guild_id}`,
    );

    const role = this.#_client.guilds
      .get(data.guild_id)
      ?.roles.get(data.role_id);
    GuildManager.getGuild(this.#_client, data.guild_id)?.roles.delete(
      data.role_id,
    );

    this.#_client.emit(EVENTS.GUILD_ROLE_DELETE, role);
  }

  CHANNEL_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_CREATE ${data.guild_id}`,
    );

    const channel = cacheChannel(this.#_client, data, data.guild_id);

    this.#_client.emit(EVENTS.CHANNEL_CREATE, channel);
  }

  CHANNEL_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_UPDATE ${data.guild_id}`,
    );

    const oldChannel = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id);
    const newChannel = cacheChannel(this.#_client, data, data.guild_id, true);

    this.#_client.emit(EVENTS.CHANNEL_UPDATE, oldChannel, newChannel);
  }

  CHANNEL_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_DELETE ${data.guild_id}`,
    );

    const channel = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id);
    GuildManager.getGuild(this.#_client, data.guild_id)?.channels.delete(
      data.id,
    );

    this.#_client.emit(EVENTS.CHANNEL_DELETE, channel);
  }

  CHANNEL_PINS_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_PINS_UPDATE ${data.guild_id}`,
    );

    this.#_client.emit(EVENTS.CHANNEL_PINS_UPDATE, data);
  }

  THREAD_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_CREATE ${data.guild_id}`,
    );

    const thread = new Thread(this.#_client, data, { guildId: data.guild_id });

    this.#_client.emit(EVENTS.THREAD_CREATE, thread);
  }

  THREAD_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_UPDATE ${data.guild_id}`,
    );

    const oldThread = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id);
    const newThread = new Thread(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.THREAD_UPDATE, oldThread, newThread);
  }

  THREAD_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_DELETE ${data.guild_id}`,
    );

    const thread = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id);
    GuildManager.getGuild(this.#_client, data.guild_id)?.channels.delete(
      data.id,
    );

    this.#_client.emit(EVENTS.THREAD_DELETE, thread);
  }

  THREAD_LIST_SYNC(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_LIST_SYNC ${data.guild_id}`,
    );

    const threads = [];
    for (let i = 0; i < data.threads.length; i++)
      threads.push(
        new Thread(this.#_client, data.threads[i], { guildId: data.guild_id }),
      );

    this.#_client.emit(EVENTS.THREAD_LIST_SYNC, threads);
  }

  GUILD_MEMBER_ADD(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_ADD ${data.guild_id}`,
    );

    const member = new Member(this.#_client, data, {
      userId: data.user.id,
      guildId: data.guild_id,
    });

    member.guild._incrementMemberCount();

    this.#_client.emit(EVENTS.GUILD_MEMBER_ADD, member);
  }

  GUILD_MEMBER_REMOVE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_REMOVE ${data.guild_id}`,
    );

    const cacheManager = GuildMemberManager.getCacheManager(
      this.#_client,
      data.guild_id,
    );

    cacheManager.fetchWithRules(data.user.id).then((member: any) => {
      const guild = GuildManager.getCacheManager(this.#_client).get(
        data.guild_id,
      );
      if (member) guild?.members.delete(data.user.id);
      else {
        // @ts-expect-error TS(2322): Type 'true' is not assignable to type 'false'.
        const user = new User(this.#_client, data.user, { nocache: true });
        member = new Member(
          this.#_client,
          {},
          { userId: data.user.id, guildId: data.guild_id, user, nocache: true },
        );
      }

      member.guild._decrementMemberCount();

      this.#_client.emit(EVENTS.GUILD_MEMBER_REMOVE, member);
    });
  }

  GUILD_MEMBER_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_UPDATE ${data.guild_id}`,
    );

    const cacheManager = GuildMemberManager.getCacheManager(
      this.#_client,
      data.guild_id,
    );

    cacheManager.fetchWithRules(data.user.id).then((oldMember: any) => {
      const newMember = new Member(this.#_client, data, {
        userId: data.user.id,
        guildId: data.guild_id,
      });

      this.#_client.emit(EVENTS.GUILD_MEMBER_UPDATE, oldMember, newMember);
    });
  }

  GUILD_MEMBERS_CHUNK(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBERS_CHUNK ${data.guild_id}`,
    );

    for (let i = 0; i < data.members.length; i++)
      new Member(this.#_client, data.members[i], {
        userId: data.members[i].user.id,
        guildId: data.guild_id,
      });
  }

  GUILD_BAN_ADD(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_BAN_ADD ${data.guild_id}`,
    );

    const user = new User(this.#_client, data.user);
    // @ts-expect-error TS(2339): Property 'guild' does not exist on type 'User'.
    user.guild = GuildManager.getGuild(this.#_client, data.guild_id) || null;
    // @ts-expect-error TS(2339): Property 'guild' does not exist on type 'User'.
    if (!user.guild) user.guild_id = BigInt(data.guild_id);

    this.#_client.emit(EVENTS.GUILD_BAN_ADD, user);
  }

  GUILD_BAN_REMOVE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_BAN_REMOVE ${data.guild_id}`,
    );

    const user = new User(this.#_client, data.user);
    // @ts-expect-error TS(2339): Property 'guild' does not exist on type 'User'.
    user.guild = GuildManager.getGuild(this.#_client, data.guild_id) || null;
    // @ts-expect-error TS(2339): Property 'guild' does not exist on type 'User'.
    if (!user.guild) user.guild_id = BigInt(data.guild_id);

    this.#_client.emit(EVENTS.GUILD_BAN_REMOVE, user);
  }

  INVITE_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `INVITE_CREATE ${data.guild_id}`,
    );

    const invite = new Invite(this.#_client, data, { guildId: data.guild_id });

    this.#_client.emit(EVENTS.INVITE_CREATE, invite);
  }

  INVITE_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `INVITE_DELETE ${data.guild_id}`,
    );

    const guild = GuildManager.getGuild(this.#_client, data.guild_id);

    const invite = guild?.invites?.get(data.code) || null;

    guild?.invites?.delete(data.code);

    const partialInvite = new Invite(this.#_client, data, {
      guildId: data.guild_id,
      nocache: true,
    });

    this.#_client.emit(EVENTS.INVITE_DELETE, partialInvite, invite);
  }

  VOICE_STATE_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `VOICE_STATE_UPDATE ${data.guild_id}`,
    );

    const oldVoiceState =
      GuildManager.getGuild(this.#_client, data.guild_id)?.voiceStates.get(
        data.user_id,
      ) || null;
    let newVoiceState;
    if (data.channel_id)
      newVoiceState = new VoiceState(this.#_client, data, {
        guildId: data.guild_id,
      });
    else {
      newVoiceState = null;
      GuildManager.getGuild(this.#_client, data.guild_id)?.voiceStates.delete(
        data.user_id,
      );
    }

    this.#_client.emit(EVENTS.VOICE_STATE_UPDATE, oldVoiceState, newVoiceState);
  }

  VOICE_CHANNEL_STATUS_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `VOICE_CHANNEL_STATUS_UPDATE ${data.guild_id}`,
    );

    this.#_client.emit(EVENTS.VOICE_CHANNEL_STATUS_UPDATE, data);
  }

  MESSAGE_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_CREATE ${data.guild_id}`,
    );

    const message = new Message(this.#_client, data, {
      channelId: data.channel_id,
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.MESSAGE_CREATE, message);
  }

  MESSAGE_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_UPDATE ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.id).then((oldMessage: any) => {
      const newMessage = new Message(this.#_client, data, {
        channelId: data.channel_id,
        guildId: data.guild_id,
      });

      if (
        !(
          !newMessage.editedTimestamp ||
          newMessage.editedTimestamp * 1000 + 2000 < Date.now()
        )
      ) {
        this.#_client.emit(EVENTS.MESSAGE_EDIT, oldMessage, newMessage);
      }
      this.#_client.emit(EVENTS.MESSAGE_UPDATE, oldMessage, newMessage);
    });
  }

  MESSAGE_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_DELETE ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.id).then((message: any) => {
      this.#_client.emit(EVENTS.MESSAGE_DELETE, message);
    });
  }

  MESSAGE_DELETE_BULK(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_DELETE_BULK ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    const messages = [];
    for (let i = 0; i < data.ids.length; i++)
      messages.push(cacheManager.fetchWithRules(data.ids[i]));

    Promise.all(messages).then((m) =>
      this.#_client.emit(
        EVENTS.MESSAGE_DELETE_BULK,
        m.filter((a) => a != null),
      ),
    );
  }

  INTERACTION_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `INTERACTION_CREATE ${data.guild_id}`,
    );

    if (!data.guild_id) return;

    switch (data.type) {
      case INTERACTION_TYPES.COMPONENT: {
        switch (data.data.component_type) {
          case COMPONENT_TYPES.BUTTON: {
            const componentInteraction = new ButtonClick(this.#_client, data, {
              guildId: data.guild_id,
              channelId: data.channel_id,
            });

            this.#_client.emit(EVENTS.BUTTON_CLICK, componentInteraction);

            break;
          }

          case COMPONENT_TYPES.SELECT_MENU:
          case COMPONENT_TYPES.USER_SELECT_MENU:
          case COMPONENT_TYPES.ROLE_SELECT_MENU:
          case COMPONENT_TYPES.MENTIONABLE_SELECT_MENU:
          case COMPONENT_TYPES.CHANNEL_SELECT_MENU: {
            const componentInteraction = new OptionSelect(this.#_client, data, {
              guildId: data.guild_id,
              channelId: data.channel_id,
            });

            this.#_client.emit(EVENTS.MENU_SELECT, componentInteraction);

            break;
          }

          default:
            break;
        }

        break;
      }

      case INTERACTION_TYPES.COMMAND: {
        const commandInteraction = new SlashCommand(this.#_client, data);

        this.#_client.emit(EVENTS.SLASH_COMMAND, commandInteraction);

        break;
      }

      case INTERACTION_TYPES.MODAL_SUBMIT: {
        const componentInteraction = new ModalResponse(this.#_client, data);

        this.#_client.emit(EVENTS.MODAL_RESPONSE, componentInteraction);

        break;
      }

      case INTERACTION_TYPES.APPLICATION_COMMAND_AUTOCOMPLETE: {
        const commandInteraction = new SlashCommand(this.#_client, data);

        this.#_client.emit(
          EVENTS.SLASH_COMMAND_AUTOCOMPLETE,
          commandInteraction,
        );

        break;
      }

      default:
        break;
    }
  }

  GUILD_AUDIT_LOG_ENTRY_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_AUDIT_LOG_ENTRY_CREATE ${data.guild_id}`,
    );

    const auditLogEntry = new AuditLog(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.GUILD_AUDIT_LOG_ENTRY_CREATE, auditLogEntry);
  }

  ENTITLEMENT_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_CREATE ${data.user_id}`,
    );

    this.#_client.emit(EVENTS.ENTITLEMENT_CREATE, data);
  }

  ENTITLEMENT_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_UPDATE ${data.user_id}`,
    );

    this.#_client.emit(EVENTS.ENTITLEMENT_UPDATE, data);
  }

  ENTITLEMENT_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_DELETE ${data.user_id}`,
    );

    this.#_client.emit(EVENTS.ENTITLEMENT_DELETE, data);
  }

  GUILD_SCHEDULED_EVENT_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_CREATE ${data.guild_id}`,
    );

    const scheduledEvent = new ScheduledEvent(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(EVENTS.GUILD_SCHEDULED_EVENT_CREATE, scheduledEvent);
  }

  GUILD_SCHEDULED_EVENT_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_UPDATE ${data.guild_id}`,
    );

    const oldScheduledEvent =
      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.id,
      ) || null;
    const newScheduledEvent = new ScheduledEvent(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(
      EVENTS.GUILD_SCHEDULED_EVENT_UPDATE,
      oldScheduledEvent,
      newScheduledEvent,
    );
  }

  GUILD_SCHEDULED_EVENT_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_DELETE ${data.guild_id}`,
    );

    const scheduledEvent =
      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.id,
      ) || null;
    GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.delete(
      data.id,
    );

    this.#_client.emit(EVENTS.GUILD_SCHEDULED_EVENT_DELETE, scheduledEvent);
  }

  GUILD_SCHEDULED_EVENT_USER_ADD(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_USER_ADD ${data.guild_id}`,
    );

    const scheduledEvent =
      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.guild_scheduled_event_id,
      ) || null;

    if (scheduledEvent) {
      scheduledEvent.user_count++;

      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.set(
        data.guild_scheduled_event_id,
        scheduledEvent,
      );
    }

    const user = this.#_client.users.get(data.user_id) || null;

    this.#_client.emit(EVENTS.GUILD_SCHEDULED_EVENT_USER_ADD, data, user);
  }

  GUILD_SCHEDULED_EVENT_USER_REMOVE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_USER_REMOVE ${data.guild_id}`,
    );

    const scheduledEvent =
      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.guild_scheduled_event_id,
      ) || null;

    if (scheduledEvent) {
      scheduledEvent.user_count--;

      GuildManager.getGuild(this.#_client, data.guild_id)?.scheduledEvents.set(
        data.guild_scheduled_event_id,
        scheduledEvent,
      );
    }

    const user = this.#_client.users.get(data.user_id) || null;

    this.#_client.emit(EVENTS.GUILD_SCHEDULED_EVENT_USER_REMOVE, data, user);
  }

  AUTO_MODERATION_RULE_CREATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_CREATE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_RULE_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_UPDATE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_RULE_DELETE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_DELETE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(EVENTS.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_ACTION_EXECUTION(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_ACTION_EXECUTION ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_ACTION_EXECUTION' does n... Remove this comment to see the full error message
    this.#_client.emit(EVENTS.AUTO_MODERATION_ACTION_EXECUTION, data);
  }

  GUILD_EMOJIS_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_EMOJIS_UPDATE ${data.guild_id}`,
    );

    const oldEmojis = GuildManager.getGuild(
      this.#_client,
      data.guild_id,
    )?.emojis;
    const newEmojis = data.emojis.map(
      (emoji: any) =>
        new Emoji(this.#_client, emoji, { guildId: data.guild_id }),
    );

    if (oldEmojis.size < newEmojis.length) {
      // EMOJI ADDED
      let addedEmojiRaw;
      const oldIds = oldEmojis.toJSON().map((e: any) => e.id);

      for (let i = 0; i < newEmojis.length; i++) {
        let matchingFound = false;

        for (let n = 0; n < oldIds.length; n++)
          if (oldIds[n] == newEmojis[i].id) {
            matchingFound = true;
            break;
          }

        if (matchingFound != true) {
          addedEmojiRaw = newEmojis[i];
          break;
        }
      }

      const addedEmoji = new Emoji(this.#_client, addedEmojiRaw, {
        guildId: data.guild_id,
      });

      this.#_client.emit(EVENTS.GUILD_EMOJI_CREATE, addedEmoji);
    } else if (oldEmojis.size > newEmojis.length) {
      // EMOJI DELETED
      let deletedId;
      const oldIds = oldEmojis.toJSON().map((e: any) => e.id);

      for (let i = 0; i < oldIds.length; i++) {
        let matchingFound = false;

        for (let n = 0; n < newEmojis.length; n++)
          if (oldIds[i] == newEmojis[n].id) {
            matchingFound = true;
            break;
          }

        if (matchingFound != true) {
          deletedId = oldIds[i];
          break;
        }
      }

      const deletedEmoji = oldEmojis.get(deletedId);

      GuildManager.getGuild(this.#_client, data.guild_id)?.emojis.delete(
        deletedId,
      );

      this.#_client.emit(EVENTS.GUILD_EMOJI_DELETE, deletedEmoji);
    } else {
      // EMOJI UPDATED
      const oldEmojisArray = oldEmojis.toJSON();

      let newEmoji;
      let oldEmoji;

      for (let i = 0; i < oldEmojisArray.length; i++) {
        const correspondingNewEmojiRaw = newEmojis.find(
          (e: any) => e.id == oldEmojisArray[i].id,
        );
        const correspondingNewEmoji = new Emoji(
          this.#_client,
          correspondingNewEmojiRaw,
          { guildId: data.guild_id },
        );

        const differences = deepCompare(
          oldEmojisArray[i],
          correspondingNewEmoji,
        );

        if (differences.length != 0) {
          newEmoji = correspondingNewEmoji;
          oldEmoji = oldEmojisArray[i];
          break;
        }
      }

      this.#_client.emit(EVENTS.GUILD_EMOJI_UPDATE, oldEmoji, newEmoji);
    }
  }

  WEBHOOKS_UPDATE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `WEBHOOKS_UPDATE ${data.guild_id}`,
    );

    this.#_client.emit(EVENTS.WEBHOOKS_UPDATE, data);
  }

  MESSAGE_POLL_VOTE_ADD(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_POLL_VOTE_ADD ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.message_id).then((message: any) => {
      if (message) {
        message.poll._results._addVote(data.user_id, data.answer_id);
      }
      this.#_client.emit(EVENTS.MESSAGE_POLL_VOTE_ADD, data);
    });
  }

  MESSAGE_POLL_VOTE_REMOVE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_POLL_VOTE_REMOVE ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.message_id).then((message: any) => {
      if (message) {
        message.poll._results._removeVote(data.user_id, data.answer_id);
      }
      this.#_client.emit(EVENTS.MESSAGE_POLL_VOTE_REMOVE, data);
    });
  }

  MESSAGE_REACTION_ADD(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_REACTION_ADD ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.message_id).then((message: any) => {
      if (message) {
        message.reactions._addReaction(
          data.user_id,
          data.emoji.id ? data.emoji.id : data.emoji.name,
          data,
        );
      }
      const finalData = data;

      finalData.emoji = new Emoji(this.#_client, data.emoji, {
        guildId: data.guild_id,
      });

      this.#_client.emit(EVENTS.MESSAGE_REACTION_ADD, finalData);
    });
  }

  MESSAGE_REACTION_REMOVE(data: any) {
    this.#_client._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_REACTION_REMOVE ${data.guild_id}`,
    );

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager.fetchWithRules(data.message_id).then((message: any) => {
      if (message) {
        message.reactions._removeReaction(
          data.user_id,
          data.emoji.id ? data.emoji.id : data.emoji.name,
        );
      }
      const finalData = data;

      finalData.emoji = new Emoji(this.#_client, data.emoji, {
        guildId: data.guild_id,
      });

      this.#_client.emit(EVENTS.MESSAGE_REACTION_REMOVE, finalData);
    });
  }
}

export default EventHandler;
