import {
  APIChatInputApplicationCommandGuildInteraction,
  APIEmoji,
  APIExtendedInvite,
  APIGuildMember,
  APIGuildTextChannel,
  APIMessage,
  APIMessageComponentGuildInteraction,
  APIRole,
  APIThreadChannel,
  APIUser,
  AuditLogOptionsType,
  ChannelType,
  GatewayGuildCreateDispatchData,
} from "#typings/discord.js";
import Client from "./Client.js";
import {
  ButtonClick,
  Emoji,
  Interaction,
  Invite,
  Member,
  Message,
  Role,
  ScheduledEvent,
  SlashCommand,
  Thread,
} from "./structures.js";
import CategoryChannel from "./structures/CategoryChannel.js";
import Guild from "./structures/Guild.js";
import TextChannel from "./structures/TextChannel.js";
import User from "./structures/User.js";
import VoiceChannel from "./structures/VoiceChannel.js";
import type { Client as ClientType } from "#typings/index.d.ts";
export declare const TEST_DATA: {
  GUILD_ID: string;
  TEXT_CHANNEL: {
    id: string;
    type: number;
    guild_id: string;
    name: string;
    position: number;
    permission_overwrites: never[];
    rate_limit_per_user: number;
    nsfw: boolean;
    topic: string;
    last_message_id: null;
    parent_id: string;
    last_pin_timestamp: null;
  };
  TEXT_CHANNEL_2: APIGuildTextChannel<ChannelType.GuildText>;
  VOICE_CHANNEL: {
    id: string;
    type: number;
    guild_id: string;
    name: string;
    position: number;
    permission_overwrites: never[];
    rate_limit_per_user: number;
    nsfw: boolean;
    topic: string;
    last_message_id: null;
    parent_id: string;
    last_pin_timestamp: null;
    bitrate: number;
    user_limit: number;
  };
  CATEGORY_CHANNEL: {
    id: string;
    type: number;
    guild_id: string;
    name: string;
    position: number;
    permission_overwrites: {
      id: string;
      type: number;
      allow: string;
      deny: string;
    }[];
    nsfw: boolean;
    parent_id: null;
  };
  GUILD: GatewayGuildCreateDispatchData;
  THREAD: APIThreadChannel;
  CHANNEL_ID: string;
  MESSAGE_ID: string;
  MESSAGE: APIMessage;
  MEMBER_ID: string;
  MEMBER_ID_2: string;
  MEMBER: {
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      bot: boolean;
      system: boolean;
      mfa_enabled: boolean;
      locale: string;
      verified: boolean;
      email: null;
      flags: number;
      premium_type: number;
      public_flags: number;
    };
    nick: null;
    roles: never[];
    joined_at: string;
    premium_since: null;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    flags: number;
  };
  MEMBER_ADMIN: {
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      bot: boolean;
      system: boolean;
      mfa_enabled: boolean;
      locale: string;
      verified: boolean;
      email: null;
      flags: number;
      premium_type: number;
      public_flags: number;
    };
    nick: null;
    roles: string[];
    joined_at: string;
    premium_since: null;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    flags: number;
  };
  EVENT_ID: string;
  ROLE_ID: string;
  ATTACHMENT: {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height: number;
    width: number;
  };
  FILE_NAME: string;
  AUDIT_LOG: {
    id: string;
    guild_id: string;
    user_id: string;
    target_id: string;
    action_type: number;
    changes: never[];
    options: {
      channel_id: string;
      id: string;
      type: AuditLogOptionsType;
    };
    reason: string;
    context: {
      id: string;
      type: number;
    };
    created_at: string;
  };
  BUTTON_CLICK: APIMessageComponentGuildInteraction;
  CLIENT_USER: APIUser;
  CLIENT_MEMBER: APIGuildMember;
  CLIENT_MEMBER_ADMIN: APIGuildMember;
  ROLE_OVERRIDES_MEMBER: {
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      bot: boolean;
      system: boolean;
      mfa_enabled: boolean;
      locale: string;
      verified: boolean;
      email: null;
      flags: number;
      premium_type: number;
      public_flags: number;
    };
    nick: null;
    roles: string[];
    joined_at: string;
    premium_since: null;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    flags: number;
  };
  ROLE_OVERRIDES_MEMBER_2: {
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      bot: boolean;
      system: boolean;
      mfa_enabled: boolean;
      locale: string;
      verified: boolean;
      email: null;
      flags: number;
      premium_type: number;
      public_flags: number;
    };
    nick: null;
    roles: string[];
    joined_at: string;
    premium_since: null;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
    flags: number;
  };
  ROLE_ADMIN: APIRole;
  ROLE_ADMIN_2: APIRole;
  ROLE_OVERRIDES: {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    icon: string;
  };
  ROLE_OVERRIDES_2: {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    icon: string;
  };
  EMOJI: APIEmoji;
  STANDARD_EMOJI: {
    id: null;
    name: string;
  };
  INTERACTION: APIChatInputApplicationCommandGuildInteraction;
  INVITE: APIExtendedInvite;
  MODAL_RESPONSE: {
    id: string;
    type: number;
    data: {
      custom_id: string;
      components: {
        type: number;
        components: {
          custom_id: string;
          type: number;
          value: string;
        }[];
      }[];
    };
    guild_id: string;
    channel_id: string;
    member: {
      avatar: null;
      flags: number;
      user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: null;
        bot: boolean;
      };
      roles: undefined;
      joined_at: string;
      premium_since: null;
      deaf: boolean;
      mute: boolean;
      pending: boolean;
      permissions: string;
    };
    token: string;
    version: number;
  };
  OPTION_SELECT: {
    application_id: string;
    id: string;
    type: number;
    data: {
      custom_id: string;
      component_type: number;
      values: string[];
    };
    guild_id: string;
    channel_id: string;
    member: {
      user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: null;
        bot: boolean;
        global_name: string;
      };
      roles: never[];
      joined_at: string;
      premium_since: null;
      deaf: boolean;
      mute: boolean;
      pending: boolean;
      permissions: string;
      avatar: null;
      flags: number;
    };
    message: {
      application_id: string;
      id: string;
      type: number;
      content: string;
      channel_id: string;
      author: {
        id: string;
        username: string;
        discriminator: string;
        avatar: null;
        bot: boolean;
        global_name: string;
      };
      attachments: never[];
      embeds: never[];
      mentions: never[];
      mention_roles: never[];
      mention_channels: never[];
      pinned: boolean;
      mention_everyone: boolean;
      tts: boolean;
      timestamp: string;
      edited_timestamp: null;
      flags: number;
    };
    token: string;
    version: number;
  };
  REACTION: {
    user_id: string;
    message_id: string;
    emoji: {
      id: null;
      name: string;
    };
    channel_id: string;
    guild_id: string;
    member: {
      user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: null;
        bot: boolean;
        system: boolean;
        mfa_enabled: boolean;
        locale: string;
        verified: boolean;
        email: null;
        flags: number;
        premium_type: number;
        public_flags: number;
      };
      roles: never[];
      joined_at: string;
      premium_since: null;
      deaf: boolean;
      mute: boolean;
      pending: boolean;
      permissions: string;
    };
    message_author_id: string;
    burst: boolean;
    type: number;
  };
  SLASH_COMMAND: APIChatInputApplicationCommandGuildInteraction;
  STICKER: {
    id: string;
    name: string;
    tags: string;
    type: number;
    format_type: number;
    description: string;
    asset: string;
    pack_id: string;
    sort_value: number;
  };
  USER: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    system: boolean;
    mfa_enabled: boolean;
    locale: string;
    verified: boolean;
    email: null;
    flags: number;
    premium_type: number;
    public_flags: number;
    global_name: string;
  };
  VOICE_STATE: {
    channel_id: string;
    user_id: string;
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    suppress: boolean;
    self_stream: boolean;
    self_video: boolean;
    request_to_speak_timestamp: string;
    joined: number;
  };
  SCHEDULED_EVENT: import("#typings/discord.js").APIVoiceGuildScheduledEvent;
  SCHEDULED_EVENT_EXTERNAL: import("#typings/discord.js").APIExternalGuildScheduledEvent;
  POLL: {
    question: {
      text: string;
    };
    answers: {
      answer_id: number;
      poll_media: {
        text: string;
        emoji: {
          id: string;
          name: string;
        };
      };
    }[];
    expiry: string;
    allow_multiselect: boolean;
    layout_type: number;
    results: {
      is_finalized: boolean;
      answer_counts: {
        id: number;
        count: number;
        me_voted: boolean;
      }[];
    };
  };
  PERMISSION_OVERWRITE: {
    id: string;
    type: number;
    allow: string;
    deny: string;
  };
  FOLLOWED_CHANNEL: {
    channel_id: string;
    webhook_id: string;
  };
  WEBHOOK: {
    id: string;
    type: number;
    guild_id: string;
    channel_id: string;
    name: string;
    avatar: null;
    application_id: null;
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      bot: boolean;
      global_name: string;
    };
  };
  BAN: {
    reason: string;
    user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: null;
      global_name: string;
      bot: boolean;
    };
  };
};
export declare const TEST_CLIENTS: {
  ALL_CACHES_ENABLED: () => Client;
  NO_CACHES_ENABLED: () => Client;
};
export declare const TEST_GUILDS: {
  ALL_CACHES_ENABLED: (client: ClientType) => Guild;
  NO_CACHES_ENABLED: (client: ClientType) => Guild;
};
export declare const TEST_CHANNELS: {
  TEXT_CHANNEL_ALL_CACHES_ENABLED: (client: ClientType) => TextChannel;
  TEXT_CHANNEL_2_ALL_CACHES_ENABLED: (client: ClientType) => TextChannel;
  VOICE_CHANNEL_ALL_CACHES_ENABLED: (client: ClientType) => VoiceChannel;
  CATEGORY_CHANNEL_ALL_CACHES_ENABLED: (client: ClientType) => CategoryChannel;
  THREAD_CHANNEL: (client: ClientType) => Thread;
};
export declare const TEST_MEMBERS: {
  CLIENT_MEMBER: (client: ClientType) => Member;
  THREAD_OWNER_MEMBER: (client: ClientType) => Member;
  GUILD_OWNER_MEMBER: (client: ClientType) => Member;
  GENERIC_MEMBER: (client: ClientType) => Member;
  VOICE_STATE_MEMBER: (client: ClientType) => Member;
  EXECUTOR_MEMBER: (client: ClientType) => Member;
  TARGET_MEMBER: (client: ClientType) => Member;
  CLIENT_MEMBER_1: (client: ClientType) => Member;
  ROLE_OVERRIDES_MEMBER: (client: ClientType) => Member;
  ROLE_OVERRIDES_MEMBER_2: (client: ClientType) => Member;
};
export declare const TEST_MESSAGES: {
  GENERIC_MESSAGE: (
    client: ClientType,
    {
      channelId,
    }?: {
      channelId?: string;
    },
  ) => Message;
};
export declare const TEST_ROLES: {
  GENERIC_ADMIN_ROLE: (client: ClientType) => Role;
  GENERIC_ADMIN_ROLE_2: (client: ClientType) => Role;
  GENERIC_ROLE: (client: ClientType) => Role;
  GENERIC_ROLE_2: (client: ClientType) => Role;
};
export declare const TEST_SCHEDULED_EVENTS: {
  GENERIC_SCHEDULED_EVENT: (client: ClientType) => ScheduledEvent;
  EXTERNAL_GENERIC_SCHEDULED_EVENT: (client: ClientType) => ScheduledEvent;
};
export declare const TEST_USERS: {
  GENERIC_USER: (client: ClientType) => User;
};
export declare const TEST_EMOJIS: {
  GENERIC_EMOJI: (client: ClientType) => Emoji;
};
export declare const TEST_INVITES: {
  GENERIC_INVITE: (client: ClientType) => Invite;
};
export declare const TEST_INTERACTIONS: {
  GENERIC_INTERACTION: (client: ClientType) => Interaction;
  SLASH_COMMAND: (client: ClientType) => SlashCommand;
  BUTTON_CLICK: (client: ClientType) => ButtonClick;
};
