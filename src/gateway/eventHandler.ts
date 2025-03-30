/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
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
import { cacheChannel } from "../util/gluon/cacheChannel.js";
import { deepCompare } from "../util/general/deepCompare.js";
import ModalResponse from "../structures/ModalResponse.js";
import ChannelMessageManager from "../managers/ChannelMessageManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import { quark } from "../util/art/quark.js";
import { gluon } from "../util/art/gluon.js";
import {
  APIApplicationCommandAutocompleteGuildInteraction,
  APIChatInputApplicationCommandGuildInteraction,
  APIMessageComponentButtonInteraction,
  APIMessageComponentGuildInteraction,
  APIMessageComponentSelectMenuInteraction,
  APIModalInteractionResponse,
  ComponentType,
  GatewayAutoModerationActionExecutionDispatchData,
  GatewayAutoModerationRuleCreateDispatchData,
  GatewayAutoModerationRuleDeleteDispatchData,
  GatewayAutoModerationRuleUpdateDispatchData,
  GatewayChannelCreateDispatchData,
  GatewayChannelDeleteDispatchData,
  GatewayChannelPinsUpdateDispatchData,
  GatewayChannelUpdateDispatchData,
  GatewayEntitlementCreateDispatchData,
  GatewayEntitlementDeleteDispatchData,
  GatewayEntitlementUpdateDispatchData,
  GatewayGuildAuditLogEntryCreateDispatchData,
  GatewayGuildBanAddDispatchData,
  GatewayGuildBanRemoveDispatchData,
  GatewayGuildCreateDispatchData,
  GatewayGuildDeleteDispatchData,
  GatewayGuildEmojisUpdateDispatchData,
  GatewayGuildMemberAddDispatchData,
  GatewayGuildMemberRemoveDispatchData,
  GatewayGuildMembersChunkDispatchData,
  GatewayGuildMemberUpdateDispatchData,
  GatewayGuildRoleCreateDispatchData,
  GatewayGuildRoleDeleteDispatchData,
  GatewayGuildRoleUpdateDispatchData,
  GatewayGuildScheduledEventCreateDispatchData,
  GatewayGuildScheduledEventDeleteDispatchData,
  GatewayGuildScheduledEventUpdateDispatchData,
  GatewayGuildScheduledEventUserAddDispatchData,
  GatewayGuildScheduledEventUserRemoveDispatchData,
  GatewayGuildUpdateDispatchData,
  GatewayInteractionCreateDispatchData,
  GatewayInviteCreateDispatchData,
  GatewayInviteDeleteDispatchData,
  GatewayMessageCreateDispatchData,
  GatewayMessageDeleteBulkDispatchData,
  GatewayMessageDeleteDispatchData,
  GatewayMessagePollVoteDispatchData,
  GatewayMessageReactionAddDispatchData,
  GatewayMessageReactionRemoveDispatchData,
  GatewayMessageUpdateDispatchData,
  GatewayReadyDispatchData,
  GatewayResumeData,
  GatewayThreadCreateDispatchData,
  GatewayThreadDeleteDispatchData,
  GatewayThreadListSyncDispatchData,
  GatewayThreadUpdateDispatchData,
  GatewayVoiceStateUpdateDispatchData,
  GatewayWebhooksUpdateDispatchData,
  InteractionType,
  Snowflake,
} from "#typings/discord.js";
import type {
  Emoji as EmojiType,
  Message as MessageType,
  Member as MemberType,
  Client as ClientType,
  Thread as ThreadType,
} from "typings/index.d.ts";
import { Events, GluonDebugLevels } from "#typings/enums.js";
import getGuild from "#src/util/gluon/getGuild.js";

class EventHandler {
  #_client;
  #shard;
  // @ts-expect-error TS(7008): Member '#initialGuilds' implicitly has an 'any[]' ... Remove this comment to see the full error message
  #initialGuilds;
  #asciiArtSent;
  constructor(client: ClientType, ws: any) {
    this.#_client = client;

    this.#shard = ws;

    this.#initialGuilds = [];

    this.#asciiArtSent = false;
  }

  READY(data: GatewayReadyDispatchData) {
    this.#shard.sessionId = data.session_id;

    this.#shard.resumeGatewayUrl = data.resume_gateway_url;

    this.#shard.resetRetries();

    const user = new User(this.#_client, data.user);

    this.#_client.user = user;

    this.#_client.setReady();

    this.#initialGuilds = data.guilds.map((g) => g.id);

    if (this.#asciiArtSent === false) {
      this.#asciiArtSent = true;
      console.info("\n");
      console.info(quark());
      console.info("\n\n\n");
      console.info(gluon());
    }

    this.#_client._emitDebug(GluonDebugLevels.Info, "READY");

    this.#_client.emit(Events.READY, this.#initialGuilds);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RESUMED(data: GatewayResumeData) {
    this.#shard.resetRetries();

    this.#_client._emitDebug(GluonDebugLevels.Info, "RESUMED");

    this.#_client.emit(Events.RESUMED);
  }

  GUILD_CREATE(data: GatewayGuildCreateDispatchData) {
    let guild;

    this.#_client._emitDebug(GluonDebugLevels.Info, `GUILD_CREATE ${data.id}`);

    if (
      getGuild(this.#_client, data.id)?.unavailable == true &&
      data.unavailable != true
    ) {
      guild = new Guild(this.#_client, data);
      return;
    } else guild = new Guild(this.#_client, data);

    if (!this.#initialGuilds.includes(data.id))
      this.#_client.emit(Events.GUILD_CREATE, guild);
    else {
      this.#initialGuilds.splice(this.#initialGuilds.indexOf(data.id), 1);
      this.#_client.emit(Events.GUILD_INITIALIZED, guild);
    }
  }

  GUILD_UPDATE(data: GatewayGuildUpdateDispatchData) {
    this.#_client._emitDebug(GluonDebugLevels.Info, `GUILD_UPDATE ${data.id}`);

    const oldGuild = getGuild(this.#_client, data.id);
    const newGuild = new Guild(this.#_client, data);

    this.#_client.emit(Events.GUILD_UPDATE, oldGuild, newGuild);
  }

  GUILD_DELETE(data: GatewayGuildDeleteDispatchData) {
    this.#_client._emitDebug(GluonDebugLevels.Info, `GUILD_DELETE ${data.id}`);

    if (data.unavailable != true) {
      const guild = this.#_client.guilds.flagForDeletion(data.id);

      if (!guild) return;

      this.#_client.emit(Events.GUILD_DELETE, guild);
    }
  }

  GUILD_ROLE_CREATE(data: GatewayGuildRoleCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_ROLE_CREATE ${data.guild_id}`,
    );

    const role = new Role(this.#_client, data.role, {
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.GUILD_ROLE_CREATE, role);
  }

  GUILD_ROLE_UPDATE(data: GatewayGuildRoleUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_ROLE_UPDATE ${data.guild_id}`,
    );

    const oldRole = this.#_client.guilds
      .get(data.guild_id)
      ?.roles.get(data.role.id);
    const newRole = new Role(this.#_client, data.role, {
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.GUILD_ROLE_UPDATE, oldRole ?? null, newRole);
  }

  GUILD_ROLE_DELETE(data: GatewayGuildRoleDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_ROLE_DELETE ${data.guild_id}`,
    );

    const role = getGuild(this.#_client, data.guild_id)?.roles.flagForDeletion(
      data.role_id,
    );

    this.#_client.emit(Events.GUILD_ROLE_DELETE, role ?? null);
  }

  CHANNEL_CREATE(data: GatewayChannelCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `CHANNEL_CREATE ${data.guild_id}`,
    );

    const channel = cacheChannel(this.#_client, data, data.guild_id);

    this.#_client.emit(Events.CHANNEL_CREATE, channel);
  }

  CHANNEL_UPDATE(data: GatewayChannelUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `CHANNEL_UPDATE ${data.guild_id}`,
    );

    const oldChannel = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id);
    const newChannel = cacheChannel(this.#_client, data, data.guild_id, true);

    this.#_client.emit(Events.CHANNEL_UPDATE, oldChannel ?? null, newChannel);
  }

  CHANNEL_DELETE(data: GatewayChannelDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `CHANNEL_DELETE ${data.guild_id}`,
    );

    const channel = getGuild(
      this.#_client,
      data.guild_id,
    )?.channels.flagForDeletion(data.id);

    this.#_client.emit(Events.CHANNEL_DELETE, channel ?? null);
  }

  CHANNEL_PINS_UPDATE(data: GatewayChannelPinsUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `CHANNEL_PINS_UPDATE ${data.guild_id}`,
    );

    this.#_client.emit(Events.CHANNEL_PINS_UPDATE, data);
  }

  THREAD_CREATE(data: GatewayThreadCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `THREAD_CREATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const thread = new Thread(this.#_client, data, { guildId: data.guild_id });

    this.#_client.emit(Events.THREAD_CREATE, thread);
  }

  THREAD_UPDATE(data: GatewayThreadUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `THREAD_UPDATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const oldThread = this.#_client.guilds
      .get(data.guild_id)
      ?.channels.get(data.id) as ThreadType | null;
    const newThread = new Thread(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.THREAD_UPDATE, oldThread ?? null, newThread);
  }

  THREAD_DELETE(data: GatewayThreadDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `THREAD_DELETE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const thread = getGuild(
      this.#_client,
      data.guild_id,
    )?.channels.flagForDeletion(data.id) as ThreadType | null;

    this.#_client.emit(Events.THREAD_DELETE, thread);
  }

  THREAD_LIST_SYNC(data: GatewayThreadListSyncDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `THREAD_LIST_SYNC ${data.guild_id}`,
    );

    const threads = [];
    for (let i = 0; i < data.threads.length; i++) {
      threads.push(
        new Thread(this.#_client, data.threads[i], { guildId: data.guild_id }),
      );
    }

    this.#_client.emit(Events.THREAD_LIST_SYNC, threads);
  }

  GUILD_MEMBER_ADD(data: GatewayGuildMemberAddDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_MEMBER_ADD ${data.guild_id}`,
    );

    const member = new Member(this.#_client, data, {
      userId: data.user.id,
      guildId: data.guild_id,
    });

    if (!member.guild) {
      throw new Error(
        `GLUON: Guild ${data.guild_id} not found for member ${member.id}`,
      );
    }

    member.guild._incrementMemberCount();

    this.#_client.emit(Events.GUILD_MEMBER_ADD, member);
  }

  GUILD_MEMBER_REMOVE(data: GatewayGuildMemberRemoveDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_MEMBER_REMOVE ${data.guild_id}`,
    );

    const cacheManager = GuildMemberManager.getCacheManager(
      this.#_client,
      data.guild_id,
    );

    cacheManager
      .fetchWithRules(data.user.id)
      .then((member: MemberType | null) => {
        const guild = getGuild(this.#_client, data.guild_id);
        if (!guild) {
          throw new Error(`GLUON: Guild ${data.guild_id} not found.`);
        }
        const user = new User(this.#_client, data.user, { nocache: true });
        guild._decrementMemberCount();
        if (member) {
          guild.members.delete(data.user.id);
        }

        this.#_client.emit(
          Events.GUILD_MEMBER_REMOVE,
          member,
          user,
          data.guild_id,
        );
        return member;
      })
      .catch((error: Error) => {
        console.error("Error fetching member:", error);
        throw error;
      });
  }

  GUILD_MEMBER_UPDATE(data: GatewayGuildMemberUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_MEMBER_UPDATE ${data.guild_id}`,
    );

    const cacheManager = GuildMemberManager.getCacheManager(
      this.#_client,
      data.guild_id,
    );

    cacheManager
      .fetchWithRules(data.user.id)
      .then((oldMember: MemberType | null) => {
        const newMember = new Member(this.#_client, data, {
          userId: data.user.id,
          guildId: data.guild_id,
        });

        this.#_client.emit(Events.GUILD_MEMBER_UPDATE, oldMember, newMember);
        return newMember;
      })
      .catch((error: Error) => {
        console.error("Error fetching member:", error);
        throw error;
      });
  }

  GUILD_MEMBERS_CHUNK(data: GatewayGuildMembersChunkDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_MEMBERS_CHUNK ${data.guild_id}`,
    );

    for (let i = 0; i < data.members.length; i++)
      new Member(this.#_client, data.members[i], {
        userId: data.members[i].user.id,
        guildId: data.guild_id,
      });
  }

  GUILD_BAN_ADD(data: GatewayGuildBanAddDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_BAN_ADD ${data.guild_id}`,
    );

    const user = new User(this.#_client, data.user);

    this.#_client.emit(Events.GUILD_BAN_ADD, user, data.guild_id);
  }

  GUILD_BAN_REMOVE(data: GatewayGuildBanRemoveDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_BAN_REMOVE ${data.guild_id}`,
    );

    const user = new User(this.#_client, data.user);

    this.#_client.emit(Events.GUILD_BAN_REMOVE, user, data.guild_id);
  }

  INVITE_CREATE(data: GatewayInviteCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `INVITE_CREATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const invite = new Invite(this.#_client, data, { guildId: data.guild_id });

    this.#_client.emit(Events.INVITE_CREATE, invite);
  }

  INVITE_DELETE(data: GatewayInviteDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `INVITE_DELETE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const guild = getGuild(this.#_client, data.guild_id);

    const invite = guild?.invites?.flagForDeletion(data.code);

    const partialInvite = new Invite(this.#_client, data, {
      guildId: data.guild_id,
      nocache: true,
    });

    this.#_client.emit(Events.INVITE_DELETE, partialInvite, invite ?? null);
  }

  VOICE_STATE_UPDATE(data: GatewayVoiceStateUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `VOICE_STATE_UPDATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const oldVoiceState =
      getGuild(this.#_client, data.guild_id)?.voiceStates.get(data.user_id) ||
      null;
    let newVoiceState;
    if (data.channel_id) {
      newVoiceState = new VoiceState(this.#_client, data, {
        guildId: data.guild_id,
      });
    } else {
      newVoiceState = null;
      getGuild(this.#_client, data.guild_id)?.voiceStates.delete(data.user_id);
    }

    this.#_client.emit(Events.VOICE_STATE_UPDATE, oldVoiceState, newVoiceState);
  }

  MESSAGE_CREATE(data: GatewayMessageCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_CREATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const message = new Message(this.#_client, data, {
      channelId: data.channel_id,
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.MESSAGE_CREATE, message);
  }

  MESSAGE_UPDATE(data: GatewayMessageUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_UPDATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.id)
      .then((oldMessage: MessageType | null) => {
        const newMessage = new Message(this.#_client, data, {
          channelId: data.channel_id,
          guildId: data.guild_id as string, // valid as we check for guild_id above
        });

        if (
          !(
            !newMessage.editedTimestamp ||
            newMessage.editedTimestamp * 1000 + 2000 < Date.now()
          )
        ) {
          this.#_client.emit(Events.MESSAGE_EDIT, oldMessage, newMessage);
        }
        this.#_client.emit(Events.MESSAGE_UPDATE, oldMessage, newMessage);

        return newMessage;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }

  MESSAGE_DELETE(data: GatewayMessageDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_DELETE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.id)
      .then((message: MessageType | null) => {
        this.#_client.emit(Events.MESSAGE_DELETE, message, data);
        return message;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }

  MESSAGE_DELETE_BULK(data: GatewayMessageDeleteBulkDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_DELETE_BULK ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    const messages = [];
    for (let i = 0; i < data.ids.length; i++)
      messages.push(cacheManager.fetchWithRules(data.ids[i]));

    Promise.all(messages)
      .then((m) =>
        this.#_client.emit(
          Events.MESSAGE_DELETE_BULK,
          m.filter((a) => a != null),
        ),
      )
      .catch((error) => {
        console.error("Error fetching messages:", error);
        throw error;
      });
  }

  INTERACTION_CREATE(data: GatewayInteractionCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `INTERACTION_CREATE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    switch (data.type) {
      case InteractionType.MessageComponent: {
        switch (data.data.component_type) {
          case ComponentType.Button: {
            const componentInteraction = new ButtonClick(
              this.#_client,
              data as APIMessageComponentButtonInteraction &
                APIMessageComponentGuildInteraction,
              {
                guildId: data.guild_id,
                channelId: data.channel.id,
              },
            );

            this.#_client.emit(Events.BUTTON_CLICK, componentInteraction);

            break;
          }

          case ComponentType.StringSelect:
          case ComponentType.UserSelect:
          case ComponentType.RoleSelect:
          case ComponentType.MentionableSelect:
          case ComponentType.ChannelSelect: {
            const componentInteraction = new OptionSelect(
              this.#_client,
              data as APIMessageComponentSelectMenuInteraction &
                APIMessageComponentGuildInteraction,
              {
                guildId: data.guild_id,
                channelId: data.channel.id,
              },
            );

            this.#_client.emit(Events.MENU_SELECT, componentInteraction);

            break;
          }

          default:
            break;
        }

        break;
      }

      case InteractionType.ApplicationCommand: {
        const commandInteraction = new SlashCommand(
          this.#_client,
          data as APIChatInputApplicationCommandGuildInteraction,
        );

        this.#_client.emit(Events.SLASH_COMMAND, commandInteraction);

        break;
      }

      case InteractionType.ModalSubmit: {
        const componentInteraction = new ModalResponse(
          this.#_client,
          data as APIModalInteractionResponse &
            APIMessageComponentGuildInteraction,
        );

        this.#_client.emit(Events.MODAL_RESPONSE, componentInteraction);

        break;
      }

      case InteractionType.ApplicationCommandAutocomplete: {
        const commandInteraction = new SlashCommand(
          this.#_client,
          data as APIApplicationCommandAutocompleteGuildInteraction,
        );

        this.#_client.emit(
          Events.SLASH_COMMAND_AUTOCOMPLETE,
          commandInteraction,
        );

        break;
      }

      default:
        break;
    }
  }

  GUILD_AUDIT_LOG_ENTRY_CREATE(
    data: GatewayGuildAuditLogEntryCreateDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_AUDIT_LOG_ENTRY_CREATE ${data.guild_id}`,
    );

    const auditLogEntry = new AuditLog(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.GUILD_AUDIT_LOG_ENTRY_CREATE, auditLogEntry);
  }

  ENTITLEMENT_CREATE(data: GatewayEntitlementCreateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `ENTITLEMENT_CREATE ${data.user_id}`,
    );

    this.#_client.emit(Events.ENTITLEMENT_CREATE, data);
  }

  ENTITLEMENT_UPDATE(data: GatewayEntitlementUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `ENTITLEMENT_UPDATE ${data.user_id}`,
    );

    this.#_client.emit(Events.ENTITLEMENT_UPDATE, data);
  }

  ENTITLEMENT_DELETE(data: GatewayEntitlementDeleteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `ENTITLEMENT_DELETE ${data.user_id}`,
    );

    this.#_client.emit(Events.ENTITLEMENT_DELETE, data);
  }

  GUILD_SCHEDULED_EVENT_CREATE(
    data: GatewayGuildScheduledEventCreateDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_SCHEDULED_EVENT_CREATE ${data.guild_id}`,
    );

    const scheduledEvent = new ScheduledEvent(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(Events.GUILD_SCHEDULED_EVENT_CREATE, scheduledEvent);
  }

  GUILD_SCHEDULED_EVENT_UPDATE(
    data: GatewayGuildScheduledEventUpdateDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_SCHEDULED_EVENT_UPDATE ${data.guild_id}`,
    );

    const oldScheduledEvent =
      getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(data.id) ||
      null;
    const newScheduledEvent = new ScheduledEvent(this.#_client, data, {
      guildId: data.guild_id,
    });

    this.#_client.emit(
      Events.GUILD_SCHEDULED_EVENT_UPDATE,
      oldScheduledEvent,
      newScheduledEvent,
    );
  }

  GUILD_SCHEDULED_EVENT_DELETE(
    data: GatewayGuildScheduledEventDeleteDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_SCHEDULED_EVENT_DELETE ${data.guild_id}`,
    );

    const scheduledEvent =
      getGuild(this.#_client, data.guild_id)?.scheduledEvents.flagForDeletion(
        data.id,
      ) || null;

    this.#_client.emit(Events.GUILD_SCHEDULED_EVENT_DELETE, scheduledEvent);
  }

  GUILD_SCHEDULED_EVENT_USER_ADD(
    data: GatewayGuildScheduledEventUserAddDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_SCHEDULED_EVENT_USER_ADD ${data.guild_id}`,
    );

    const scheduledEvent =
      getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.guild_scheduled_event_id,
      ) || null;

    if (scheduledEvent) {
      scheduledEvent._incrementUserCount();

      getGuild(this.#_client, data.guild_id)?.scheduledEvents.set(
        data.guild_scheduled_event_id,
        scheduledEvent,
      );
    }

    const user = this.#_client.users.get(data.user_id);

    this.#_client.emit(Events.GUILD_SCHEDULED_EVENT_USER_ADD, data, user);
  }

  GUILD_SCHEDULED_EVENT_USER_REMOVE(
    data: GatewayGuildScheduledEventUserRemoveDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_SCHEDULED_EVENT_USER_REMOVE ${data.guild_id}`,
    );

    const scheduledEvent =
      getGuild(this.#_client, data.guild_id)?.scheduledEvents.get(
        data.guild_scheduled_event_id,
      ) || null;

    if (scheduledEvent) {
      scheduledEvent._decrementUserCount();

      getGuild(this.#_client, data.guild_id)?.scheduledEvents.set(
        data.guild_scheduled_event_id,
        scheduledEvent,
      );
    }

    const user = this.#_client.users.get(data.user_id);

    this.#_client.emit(Events.GUILD_SCHEDULED_EVENT_USER_REMOVE, data, user);
  }

  AUTO_MODERATION_RULE_CREATE(
    data: GatewayAutoModerationRuleCreateDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `AUTO_MODERATION_RULE_CREATE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(Events.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_RULE_UPDATE(
    data: GatewayAutoModerationRuleUpdateDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `AUTO_MODERATION_RULE_UPDATE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(Events.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_RULE_DELETE(
    data: GatewayAutoModerationRuleDeleteDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `AUTO_MODERATION_RULE_DELETE ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    this.#_client.emit(Events.AUTO_MODERATION_RULE_CREATE, data);
  }

  AUTO_MODERATION_ACTION_EXECUTION(
    data: GatewayAutoModerationActionExecutionDispatchData,
  ) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `AUTO_MODERATION_ACTION_EXECUTION ${data.guild_id}`,
    );

    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_ACTION_EXECUTION' does n... Remove this comment to see the full error message
    this.#_client.emit(Events.AUTO_MODERATION_ACTION_EXECUTION, data);
  }

  GUILD_EMOJIS_UPDATE(data: GatewayGuildEmojisUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `GUILD_EMOJIS_UPDATE ${data.guild_id}`,
    );

    const oldEmojis = getGuild(this.#_client, data.guild_id)?.emojis;
    const newEmojis = data.emojis.map(
      (emoji) => new Emoji(this.#_client, emoji, { guildId: data.guild_id }),
    );

    if (!oldEmojis) {
      throw new Error(
        `GLUON: Guild emojis cache not found for ${data.guild_id}.`,
      );
    }

    if (oldEmojis.size < newEmojis.length) {
      // EMOJI ADDED
      let addedEmojiRaw;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oldIds = oldEmojis.map(([id, _]) => id);

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

      const addedEmoji = addedEmojiRaw ?? null;

      this.#_client.emit(Events.GUILD_EMOJI_CREATE, addedEmoji);
    } else if (oldEmojis.size > newEmojis.length) {
      // EMOJI DELETED
      let deletedId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oldIds = oldEmojis.map(([id, _]) => id) as Snowflake[];

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

      if (!deletedId) {
        throw new Error("GLUON: Deleted emoji not found.");
      }

      const deletedEmoji =
        getGuild(this.#_client, data.guild_id)?.emojis.flagForDeletion(
          deletedId,
        ) || null;

      this.#_client.emit(Events.GUILD_EMOJI_DELETE, deletedEmoji);
    } else {
      // EMOJI UPDATED
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oldEmojisArray = oldEmojis.map(([_, e]) => e) as EmojiType[];

      let newEmoji;
      let oldEmoji;

      for (let i = 0; i < oldEmojisArray.length; i++) {
        const correspondingNewEmoji = newEmojis.find(
          (e) => e.id == oldEmojisArray[i].id,
        );

        if (!correspondingNewEmoji) {
          throw new Error("GLUON: Updated emoji not found.");
        }

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

      this.#_client.emit(
        Events.GUILD_EMOJI_UPDATE,
        oldEmoji ?? null,
        newEmoji ?? null,
      );
    }
  }

  WEBHOOKS_UPDATE(data: GatewayWebhooksUpdateDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `WEBHOOKS_UPDATE ${data.guild_id}`,
    );

    this.#_client.emit(Events.WEBHOOKS_UPDATE, data);
  }

  MESSAGE_POLL_VOTE_ADD(data: GatewayMessagePollVoteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_POLL_VOTE_ADD ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.message_id)
      .then((message: MessageType | null) => {
        if (message) {
          message.poll._results._addVote(data.user_id, data.answer_id);
        }
        this.#_client.emit(Events.MESSAGE_POLL_VOTE_ADD, data);
        return data;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }

  MESSAGE_POLL_VOTE_REMOVE(data: GatewayMessagePollVoteDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_POLL_VOTE_REMOVE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.message_id)
      .then((message: MessageType | null) => {
        if (message) {
          message.poll._results._removeVote(data.user_id, data.answer_id);
        }
        this.#_client.emit(Events.MESSAGE_POLL_VOTE_REMOVE, data);

        return data;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }

  MESSAGE_REACTION_ADD(data: GatewayMessageReactionAddDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_REACTION_ADD ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.message_id)
      .then((message: MessageType | null) => {
        if (message) {
          message.reactions._addReaction(
            data.user_id,
            (data.emoji.id ? data.emoji.id : data.emoji.name) as string, // valid because one of them will always be present
            { ...data, burst_colors: data.burst_colors ?? [] },
          );
        }

        const emoji = new Emoji(this.#_client, data.emoji, {
          guildId: data.guild_id as string, // valid as we check for guild_id above
        });

        this.#_client.emit(
          Events.MESSAGE_REACTION_ADD,
          { ...data, burst_colors: data.burst_colors ?? [] },
          emoji,
        );

        return data;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }

  MESSAGE_REACTION_REMOVE(data: GatewayMessageReactionRemoveDispatchData) {
    this.#_client._emitDebug(
      GluonDebugLevels.Info,
      `MESSAGE_REACTION_REMOVE ${data.guild_id}`,
    );

    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }

    const cacheManager = ChannelMessageManager.getCacheManager(
      this.#_client,
      data.guild_id,
      data.channel_id,
    );

    cacheManager
      .fetchWithRules(data.message_id)
      .then((message: MessageType | null) => {
        if (message) {
          message.reactions._removeReaction(
            data.user_id,
            (data.emoji.id ? data.emoji.id : data.emoji.name) as string, // valid because one of them will always be present
          );
        }

        const emoji = new Emoji(this.#_client, data.emoji, {
          guildId: data.guild_id as string, // valid as we check for guild_id above
        });

        this.#_client.emit(Events.MESSAGE_REACTION_REMOVE, data, emoji);

        return data;
      })
      .catch((error: Error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
}

export default EventHandler;
