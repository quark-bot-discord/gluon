var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _EventHandler__client,
  _EventHandler_shard,
  _EventHandler_initialGuilds,
  _EventHandler_initialisedSent,
  _EventHandler_asciiArtSent;
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
import { GLUON_DEBUG_LEVELS } from "../constants.js";
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
import quark from "../util/art/quark.js";
import gluon from "../util/art/gluon.js";
import { ComponentType, InteractionType } from "discord-api-types/v10";
import { Events } from "#typings/enums.js";
import getGuild from "#src/util/gluon/getGuild.js";
class EventHandler {
  constructor(client, ws) {
    _EventHandler__client.set(this, void 0);
    _EventHandler_shard.set(this, void 0);
    // @ts-expect-error TS(7008): Member '#initialGuilds' implicitly has an 'any[]' ... Remove this comment to see the full error message
    _EventHandler_initialGuilds.set(this, void 0);
    _EventHandler_initialisedSent.set(this, void 0);
    _EventHandler_asciiArtSent.set(this, void 0);
    __classPrivateFieldSet(this, _EventHandler__client, client, "f");
    __classPrivateFieldSet(this, _EventHandler_shard, ws, "f");
    __classPrivateFieldSet(this, _EventHandler_initialGuilds, [], "f");
    __classPrivateFieldSet(this, _EventHandler_initialisedSent, false, "f");
    __classPrivateFieldSet(this, _EventHandler_asciiArtSent, false, "f");
  }
  READY(data) {
    __classPrivateFieldGet(this, _EventHandler_shard, "f").sessionId =
      data.session_id;
    __classPrivateFieldGet(this, _EventHandler_shard, "f").resumeGatewayUrl =
      data.resume_gateway_url;
    __classPrivateFieldGet(this, _EventHandler_shard, "f").resetRetries();
    const user = new User(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.user,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").user = user;
    __classPrivateFieldGet(this, _EventHandler__client, "f").setReady();
    __classPrivateFieldSet(
      this,
      _EventHandler_initialGuilds,
      data.guilds.map((g) => g.id),
      "f",
    );
    if (
      __classPrivateFieldGet(this, _EventHandler_asciiArtSent, "f") === false
    ) {
      __classPrivateFieldSet(this, _EventHandler_asciiArtSent, true, "f");
      console.info("\n");
      console.info(quark());
      console.info("\n\n\n");
      console.info(gluon());
    }
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      "READY",
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.READY,
      __classPrivateFieldGet(this, _EventHandler_initialGuilds, "f"),
    );
  }
  RESUMED(data) {
    __classPrivateFieldGet(this, _EventHandler_shard, "f").resetRetries();
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      "RESUMED",
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.RESUMED,
    );
  }
  GUILD_CREATE(data) {
    let guild;
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_CREATE ${data.id}`,
    );
    if (
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.id,
      )?.unavailable == true &&
      data.unavailable != true
    ) {
      guild = new Guild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data,
      );
      return;
    } else
      guild = new Guild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data,
      );
    if (
      !__classPrivateFieldGet(this, _EventHandler_initialGuilds, "f").includes(
        data.id,
      )
    )
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.GUILD_CREATE,
        guild,
      );
    else
      __classPrivateFieldGet(this, _EventHandler_initialGuilds, "f").splice(
        __classPrivateFieldGet(this, _EventHandler_initialGuilds, "f").indexOf(
          data.id,
        ),
        1,
      );
    if (
      __classPrivateFieldGet(this, _EventHandler_initialGuilds, "f").length ==
        0 &&
      __classPrivateFieldGet(this, _EventHandler_initialisedSent, "f") == false
    ) {
      __classPrivateFieldSet(this, _EventHandler_initialisedSent, true, "f");
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.INITIALISED,
      );
      __classPrivateFieldGet(this, _EventHandler__client, "f").setInitialized();
    }
  }
  GUILD_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_UPDATE ${data.id}`,
    );
    const oldGuild = getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.id,
    );
    const newGuild = new Guild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_UPDATE,
      oldGuild,
      newGuild,
    );
  }
  GUILD_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_DELETE ${data.id}`,
    );
    if (data.unavailable != true) {
      const guild = getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.id,
      );
      __classPrivateFieldGet(this, _EventHandler__client, "f").guilds.delete(
        data.id,
      );
      if (!guild) return;
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.GUILD_DELETE,
        guild,
      );
    }
  }
  GUILD_ROLE_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_CREATE ${data.guild_id}`,
    );
    const role = new Role(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.role,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_ROLE_CREATE,
      role,
    );
  }
  GUILD_ROLE_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_UPDATE ${data.guild_id}`,
    );
    const oldRole = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.roles.get(data.role.id);
    const newRole = new Role(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.role,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_ROLE_UPDATE,
      oldRole ?? null,
      newRole,
    );
  }
  GUILD_ROLE_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_ROLE_DELETE ${data.guild_id}`,
    );
    const role = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.roles.get(data.role_id);
    getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    )?.roles.delete(data.role_id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_ROLE_DELETE,
      role ?? null,
    );
  }
  CHANNEL_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_CREATE ${data.guild_id}`,
    );
    const channel = cacheChannel(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      data.guild_id,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.CHANNEL_CREATE,
      channel,
    );
  }
  CHANNEL_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_UPDATE ${data.guild_id}`,
    );
    const oldChannel = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.channels.get(data.id);
    const newChannel = cacheChannel(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      data.guild_id,
      true,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.CHANNEL_UPDATE,
      oldChannel ?? null,
      newChannel,
    );
  }
  CHANNEL_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_DELETE ${data.guild_id}`,
    );
    const channel = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.channels.get(data.id);
    getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    )?.channels.delete(data.id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.CHANNEL_DELETE,
      channel ?? null,
    );
  }
  CHANNEL_PINS_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `CHANNEL_PINS_UPDATE ${data.guild_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.CHANNEL_PINS_UPDATE,
      data,
    );
  }
  THREAD_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_CREATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const thread = new Thread(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      { guildId: data.guild_id },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.THREAD_CREATE,
      thread,
    );
  }
  THREAD_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_UPDATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const oldThread = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.channels.get(data.id);
    const newThread = new Thread(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.THREAD_UPDATE,
      oldThread ?? null,
      newThread,
    );
  }
  THREAD_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_DELETE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const thread = __classPrivateFieldGet(this, _EventHandler__client, "f")
      .guilds.get(data.guild_id)
      ?.channels.get(data.id);
    getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    )?.channels.delete(data.id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.THREAD_DELETE,
      thread,
    );
  }
  THREAD_LIST_SYNC(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `THREAD_LIST_SYNC ${data.guild_id}`,
    );
    const threads = [];
    for (let i = 0; i < data.threads.length; i++) {
      threads.push(
        new Thread(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data.threads[i],
          { guildId: data.guild_id },
        ),
      );
    }
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.THREAD_LIST_SYNC,
      threads,
    );
  }
  GUILD_MEMBER_ADD(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_ADD ${data.guild_id}`,
    );
    const member = new Member(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        userId: data.user.id,
        guildId: data.guild_id,
      },
    );
    if (!member.guild) {
      throw new Error(
        `GLUON: Guild ${data.guild_id} not found for member ${member.id}`,
      );
    }
    member.guild._incrementMemberCount();
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_MEMBER_ADD,
      member,
    );
  }
  GUILD_MEMBER_REMOVE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_REMOVE ${data.guild_id}`,
    );
    const cacheManager = GuildMemberManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    );
    cacheManager
      .fetchWithRules(data.user.id)
      .then((member) => {
        const guild = getGuild(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data.guild_id,
        );
        if (member) guild?.members.delete(data.user.id);
        else {
          // const user = new User(this.#_client, data.user, { nocache: true });
          // member = new Member(
          //   this.#_client,
          //   {},
          //   {
          //     userId: data.user.id,
          //     guildId: data.guild_id,
          //     user,
          //     nocache: true,
          //   },
          // );
          throw new Error("GLUON: NOT IMPLEMENTED");
        }
        if (!member.guild) {
          throw new Error(
            `GLUON: Guild ${data.guild_id} not found for member ${member.id}`,
          );
        }
        member.guild._decrementMemberCount();
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.GUILD_MEMBER_REMOVE,
          member,
        );
        return member;
      })
      .catch((error) => {
        console.error("Error fetching member:", error);
        throw error;
      });
  }
  GUILD_MEMBER_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBER_UPDATE ${data.guild_id}`,
    );
    const cacheManager = GuildMemberManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    );
    cacheManager
      .fetchWithRules(data.user.id)
      .then((oldMember) => {
        const newMember = new Member(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data,
          {
            userId: data.user.id,
            guildId: data.guild_id,
          },
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.GUILD_MEMBER_UPDATE,
          oldMember,
          newMember,
        );
        return newMember;
      })
      .catch((error) => {
        console.error("Error fetching member:", error);
        throw error;
      });
  }
  GUILD_MEMBERS_CHUNK(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_MEMBERS_CHUNK ${data.guild_id}`,
    );
    for (let i = 0; i < data.members.length; i++)
      new Member(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.members[i],
        {
          userId: data.members[i].user.id,
          guildId: data.guild_id,
        },
      );
  }
  GUILD_BAN_ADD(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_BAN_ADD ${data.guild_id}`,
    );
    const user = new User(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.user,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_BAN_ADD,
      user,
      data.guild_id,
    );
  }
  GUILD_BAN_REMOVE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_BAN_REMOVE ${data.guild_id}`,
    );
    const user = new User(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.user,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_BAN_REMOVE,
      user,
      data.guild_id,
    );
  }
  INVITE_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `INVITE_CREATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const invite = new Invite(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      { guildId: data.guild_id },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.INVITE_CREATE,
      invite,
    );
  }
  INVITE_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `INVITE_DELETE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const guild = getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    );
    const invite = guild?.invites?.get(data.code) || null;
    guild?.invites?.delete(data.code);
    const partialInvite = new Invite(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        guildId: data.guild_id,
        nocache: true,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.INVITE_DELETE,
      partialInvite,
      invite,
    );
  }
  VOICE_STATE_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `VOICE_STATE_UPDATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const oldVoiceState =
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.voiceStates.get(data.user_id) || null;
    let newVoiceState;
    if (data.channel_id) {
      newVoiceState = new VoiceState(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data,
        {
          guildId: data.guild_id,
        },
      );
    } else {
      newVoiceState = null;
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.voiceStates.delete(data.user_id);
    }
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.VOICE_STATE_UPDATE,
      oldVoiceState,
      newVoiceState,
    );
  }
  VOICE_CHANNEL_STATUS_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `VOICE_CHANNEL_STATUS_UPDATE ${data.guild_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.VOICE_CHANNEL_STATUS_UPDATE,
      data,
    );
  }
  MESSAGE_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_CREATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const message = new Message(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        channelId: data.channel_id,
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.MESSAGE_CREATE,
      message,
    );
  }
  MESSAGE_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_UPDATE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.id)
      .then((oldMessage) => {
        const newMessage = new Message(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data,
          {
            channelId: data.channel_id,
            guildId: data.guild_id, // valid as we check for guild_id above
          },
        );
        if (
          !(
            !newMessage.editedTimestamp ||
            newMessage.editedTimestamp * 1000 + 2000 < Date.now()
          )
        ) {
          __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
            Events.MESSAGE_EDIT,
            oldMessage,
            newMessage,
          );
        }
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_UPDATE,
          oldMessage,
          newMessage,
        );
        return newMessage;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
  MESSAGE_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_DELETE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.id)
      .then((message) => {
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_DELETE,
          message,
          data,
        );
        return message;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
  MESSAGE_DELETE_BULK(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_DELETE_BULK ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    const messages = [];
    for (let i = 0; i < data.ids.length; i++)
      messages.push(cacheManager.fetchWithRules(data.ids[i]));
    Promise.all(messages)
      .then((m) =>
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_DELETE_BULK,
          m.filter((a) => a != null),
        ),
      )
      .catch((error) => {
        console.error("Error fetching messages:", error);
        throw error;
      });
  }
  INTERACTION_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
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
              __classPrivateFieldGet(this, _EventHandler__client, "f"),
              data,
              {
                guildId: data.guild_id,
                channelId: data.channel.id,
              },
            );
            __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
              Events.BUTTON_CLICK,
              componentInteraction,
            );
            break;
          }
          case ComponentType.StringSelect:
          case ComponentType.UserSelect:
          case ComponentType.RoleSelect:
          case ComponentType.MentionableSelect:
          case ComponentType.ChannelSelect: {
            const componentInteraction = new OptionSelect(
              __classPrivateFieldGet(this, _EventHandler__client, "f"),
              data,
              {
                guildId: data.guild_id,
                channelId: data.channel.id,
              },
            );
            __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
              Events.MENU_SELECT,
              componentInteraction,
            );
            break;
          }
          default:
            break;
        }
        break;
      }
      case InteractionType.ApplicationCommand: {
        const commandInteraction = new SlashCommand(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data,
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.SLASH_COMMAND,
          commandInteraction,
        );
        break;
      }
      case InteractionType.ModalSubmit: {
        const componentInteraction = new ModalResponse(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data,
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MODAL_RESPONSE,
          componentInteraction,
        );
        break;
      }
      case InteractionType.ApplicationCommandAutocomplete: {
        const commandInteraction = new SlashCommand(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data,
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.SLASH_COMMAND_AUTOCOMPLETE,
          commandInteraction,
        );
        break;
      }
      default:
        break;
    }
  }
  GUILD_AUDIT_LOG_ENTRY_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_AUDIT_LOG_ENTRY_CREATE ${data.guild_id}`,
    );
    const auditLogEntry = new AuditLog(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_AUDIT_LOG_ENTRY_CREATE,
      auditLogEntry,
    );
  }
  ENTITLEMENT_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_CREATE ${data.user_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.ENTITLEMENT_CREATE,
      data,
    );
  }
  ENTITLEMENT_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_UPDATE ${data.user_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.ENTITLEMENT_UPDATE,
      data,
    );
  }
  ENTITLEMENT_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `ENTITLEMENT_DELETE ${data.user_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.ENTITLEMENT_DELETE,
      data,
    );
  }
  GUILD_SCHEDULED_EVENT_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_CREATE ${data.guild_id}`,
    );
    const scheduledEvent = new ScheduledEvent(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_SCHEDULED_EVENT_CREATE,
      scheduledEvent,
    );
  }
  GUILD_SCHEDULED_EVENT_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_UPDATE ${data.guild_id}`,
    );
    const oldScheduledEvent =
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.get(data.id) || null;
    const newScheduledEvent = new ScheduledEvent(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data,
      {
        guildId: data.guild_id,
      },
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_SCHEDULED_EVENT_UPDATE,
      oldScheduledEvent,
      newScheduledEvent,
    );
  }
  GUILD_SCHEDULED_EVENT_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_DELETE ${data.guild_id}`,
    );
    const scheduledEvent =
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.get(data.id) || null;
    getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    )?.scheduledEvents.delete(data.id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_SCHEDULED_EVENT_DELETE,
      scheduledEvent,
    );
  }
  GUILD_SCHEDULED_EVENT_USER_ADD(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_USER_ADD ${data.guild_id}`,
    );
    const scheduledEvent =
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.get(data.guild_scheduled_event_id) || null;
    if (scheduledEvent) {
      scheduledEvent._incrementUserCount();
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.set(data.guild_scheduled_event_id, scheduledEvent);
    }
    const user = __classPrivateFieldGet(
      this,
      _EventHandler__client,
      "f",
    ).users.get(data.user_id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_SCHEDULED_EVENT_USER_ADD,
      data,
      user,
    );
  }
  GUILD_SCHEDULED_EVENT_USER_REMOVE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_SCHEDULED_EVENT_USER_REMOVE ${data.guild_id}`,
    );
    const scheduledEvent =
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.get(data.guild_scheduled_event_id) || null;
    if (scheduledEvent) {
      scheduledEvent._decrementUserCount();
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.scheduledEvents.set(data.guild_scheduled_event_id, scheduledEvent);
    }
    const user = __classPrivateFieldGet(
      this,
      _EventHandler__client,
      "f",
    ).users.get(data.user_id);
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.GUILD_SCHEDULED_EVENT_USER_REMOVE,
      data,
      user,
    );
  }
  AUTO_MODERATION_RULE_CREATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_CREATE ${data.guild_id}`,
    );
    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.AUTO_MODERATION_RULE_CREATE,
      data,
    );
  }
  AUTO_MODERATION_RULE_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_UPDATE ${data.guild_id}`,
    );
    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.AUTO_MODERATION_RULE_CREATE,
      data,
    );
  }
  AUTO_MODERATION_RULE_DELETE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_RULE_DELETE ${data.guild_id}`,
    );
    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_RULE_CREATE' does not ex... Remove this comment to see the full error message
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.AUTO_MODERATION_RULE_CREATE,
      data,
    );
  }
  AUTO_MODERATION_ACTION_EXECUTION(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `AUTO_MODERATION_ACTION_EXECUTION ${data.guild_id}`,
    );
    // @ts-expect-error TS(2339): Property 'AUTO_MODERATION_ACTION_EXECUTION' does n... Remove this comment to see the full error message
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.AUTO_MODERATION_ACTION_EXECUTION,
      data,
    );
  }
  GUILD_EMOJIS_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `GUILD_EMOJIS_UPDATE ${data.guild_id}`,
    );
    const oldEmojis = getGuild(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
    )?.emojis;
    const newEmojis = data.emojis.map(
      (emoji) =>
        new Emoji(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          emoji,
          { guildId: data.guild_id },
        ),
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
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.GUILD_EMOJI_CREATE,
        addedEmoji,
      );
    } else if (oldEmojis.size > newEmojis.length) {
      // EMOJI DELETED
      let deletedId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oldIds = oldEmojis.map(([id, _]) => id);
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
      const deletedEmoji = oldEmojis.get(deletedId);
      getGuild(
        __classPrivateFieldGet(this, _EventHandler__client, "f"),
        data.guild_id,
      )?.emojis.delete(deletedId);
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.GUILD_EMOJI_DELETE,
        deletedEmoji,
      );
    } else {
      // EMOJI UPDATED
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oldEmojisArray = oldEmojis.map(([_, e]) => e);
      let newEmoji;
      let oldEmoji;
      for (let i = 0; i < oldEmojisArray.length; i++) {
        const correspondingNewEmoji = newEmojis.find(
          (e) => e.id == oldEmojisArray[i].id,
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
      __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
        Events.GUILD_EMOJI_UPDATE,
        oldEmoji ?? null,
        newEmoji ?? null,
      );
    }
  }
  WEBHOOKS_UPDATE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `WEBHOOKS_UPDATE ${data.guild_id}`,
    );
    __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
      Events.WEBHOOKS_UPDATE,
      data,
    );
  }
  MESSAGE_POLL_VOTE_ADD(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_POLL_VOTE_ADD ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.message_id)
      .then((message) => {
        if (message) {
          message.poll._results._addVote(data.user_id, data.answer_id);
        }
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_POLL_VOTE_ADD,
          data,
        );
        return data;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
  MESSAGE_POLL_VOTE_REMOVE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_POLL_VOTE_REMOVE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.message_id)
      .then((message) => {
        if (message) {
          message.poll._results._removeVote(data.user_id, data.answer_id);
        }
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_POLL_VOTE_REMOVE,
          data,
        );
        return data;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
  MESSAGE_REACTION_ADD(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_REACTION_ADD ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.message_id)
      .then((message) => {
        if (message) {
          message.reactions._addReaction(
            data.user_id,
            data.emoji.id ? data.emoji.id : data.emoji.name, // valid because one of them will always be present
            { ...data, burst_colors: data.burst_colors ?? [] },
          );
        }
        const emoji = new Emoji(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data.emoji,
          {
            guildId: data.guild_id, // valid as we check for guild_id above
          },
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_REACTION_ADD,
          { ...data, burst_colors: data.burst_colors ?? [] },
          emoji,
        );
        return data;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
  MESSAGE_REACTION_REMOVE(data) {
    __classPrivateFieldGet(this, _EventHandler__client, "f")._emitDebug(
      GLUON_DEBUG_LEVELS.INFO,
      `MESSAGE_REACTION_REMOVE ${data.guild_id}`,
    );
    if (!data.guild_id) {
      throw new Error("GLUON: Gluon does not support DMs.");
    }
    const cacheManager = ChannelMessageManager.getCacheManager(
      __classPrivateFieldGet(this, _EventHandler__client, "f"),
      data.guild_id,
      data.channel_id,
    );
    cacheManager
      .fetchWithRules(data.message_id)
      .then((message) => {
        if (message) {
          message.reactions._removeReaction(
            data.user_id,
            data.emoji.id ? data.emoji.id : data.emoji.name,
          );
        }
        const emoji = new Emoji(
          __classPrivateFieldGet(this, _EventHandler__client, "f"),
          data.emoji,
          {
            guildId: data.guild_id, // valid as we check for guild_id above
          },
        );
        __classPrivateFieldGet(this, _EventHandler__client, "f").emit(
          Events.MESSAGE_REACTION_REMOVE,
          data,
          emoji,
        );
        return data;
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        throw error;
      });
  }
}
(_EventHandler__client = new WeakMap()),
  (_EventHandler_shard = new WeakMap()),
  (_EventHandler_initialGuilds = new WeakMap()),
  (_EventHandler_initialisedSent = new WeakMap()),
  (_EventHandler_asciiArtSent = new WeakMap());
export default EventHandler;
//# sourceMappingURL=eventHandler.js.map
