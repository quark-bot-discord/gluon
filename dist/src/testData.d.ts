export namespace TEST_DATA {
    let GUILD_ID: string;
    namespace TEXT_CHANNEL {
        let id: string;
        let type: number;
        let guild_id: string;
        let name: string;
        let position: number;
        let permission_overwrites: any[];
        let rate_limit_per_user: number;
        let nsfw: boolean;
        let topic: string;
        let last_message_id: any;
        let parent_id: string;
        let last_pin_timestamp: any;
    }
    namespace TEXT_CHANNEL_2 {
        let id_1: string;
        export { id_1 as id };
        let type_1: number;
        export { type_1 as type };
        let guild_id_1: string;
        export { guild_id_1 as guild_id };
        let name_1: string;
        export { name_1 as name };
        let position_1: number;
        export { position_1 as position };
        let permission_overwrites_1: ({
            id: string;
            type: number;
            allow: number;
            deny: string;
        } | {
            id: string;
            type: number;
            allow: string;
            deny: number;
        })[];
        export { permission_overwrites_1 as permission_overwrites };
        let rate_limit_per_user_1: number;
        export { rate_limit_per_user_1 as rate_limit_per_user };
        let nsfw_1: boolean;
        export { nsfw_1 as nsfw };
        let topic_1: string;
        export { topic_1 as topic };
        let last_message_id_1: any;
        export { last_message_id_1 as last_message_id };
        let parent_id_1: string;
        export { parent_id_1 as parent_id };
        let last_pin_timestamp_1: any;
        export { last_pin_timestamp_1 as last_pin_timestamp };
    }
    namespace VOICE_CHANNEL {
        let id_2: string;
        export { id_2 as id };
        let type_2: number;
        export { type_2 as type };
        let guild_id_2: string;
        export { guild_id_2 as guild_id };
        let name_2: string;
        export { name_2 as name };
        let position_2: number;
        export { position_2 as position };
        let permission_overwrites_2: any[];
        export { permission_overwrites_2 as permission_overwrites };
        let rate_limit_per_user_2: number;
        export { rate_limit_per_user_2 as rate_limit_per_user };
        let nsfw_2: boolean;
        export { nsfw_2 as nsfw };
        let topic_2: string;
        export { topic_2 as topic };
        let last_message_id_2: any;
        export { last_message_id_2 as last_message_id };
        let parent_id_2: string;
        export { parent_id_2 as parent_id };
        let last_pin_timestamp_2: any;
        export { last_pin_timestamp_2 as last_pin_timestamp };
        export let bitrate: number;
        export let user_limit: number;
    }
    namespace CATEGORY_CHANNEL {
        let id_3: string;
        export { id_3 as id };
        let type_3: number;
        export { type_3 as type };
        let guild_id_3: string;
        export { guild_id_3 as guild_id };
        let name_3: string;
        export { name_3 as name };
        let position_3: number;
        export { position_3 as position };
        let permission_overwrites_3: {
            id: string;
            type: number;
            allow: string;
            deny: string;
        }[];
        export { permission_overwrites_3 as permission_overwrites };
        let nsfw_3: boolean;
        export { nsfw_3 as nsfw };
        let parent_id_3: any;
        export { parent_id_3 as parent_id };
    }
    namespace GUILD {
        let id_4: string;
        export { id_4 as id };
        let name_4: string;
        export { name_4 as name };
        export let icon: any;
        export let splash: any;
        export let discovery_splash: any;
        export let owner_id: string;
        export let region: string;
        export let afk_channel_id: any;
        export let afk_timeout: number;
        export let verification_level: number;
        export let default_message_notifications: number;
        export let explicit_content_filter: number;
        export let roles: any[];
        export let emojis: any[];
        export let features: any[];
        export let mfa_level: number;
        export let application_id: any;
        export let system_channel_id: string;
        export let system_channel_flags: number;
        export let rules_channel_id: string;
        export let joined_at: string;
        export let large: boolean;
        export let unavailable: boolean;
        export let member_count: number;
        export let voice_states: any[];
        export let members: any[];
        export let channels: ({
            id: string;
            type: number;
            guild_id: string;
            name: string;
            position: number;
            permission_overwrites: any[];
            rate_limit_per_user: number;
            nsfw: boolean;
            topic: any;
            last_message_id: any;
            parent_id: any;
            last_pin_timestamp: any;
            bitrate?: undefined;
            user_limit?: undefined;
        } | {
            id: string;
            type: number;
            guild_id: string;
            name: string;
            position: number;
            permission_overwrites: any[];
            rate_limit_per_user: number;
            nsfw: boolean;
            topic: any;
            last_message_id: any;
            parent_id: any;
            last_pin_timestamp: any;
            bitrate: number;
            user_limit: number;
        })[];
        export let threads: any[];
        export let presences: any[];
        export let max_presences: number;
        export let max_members: number;
        export let vanity_url_code: any;
        export let description: any;
        export let banner: any;
        export let premium_progress_bar_enabled: boolean;
        export let premium_tier: number;
        export let premium_subscription_count: number;
        export let preferred_locale: string;
        export let public_updates_channel_id: any;
        export let max_video_channel_users: number;
        export let approximate_member_count: number;
        export let approximate_presence_count: number;
        export let welcome_screen: any;
        export let nsfw_level: number;
        export let stage_instances: any[];
        export let stickers: any[];
    }
    namespace THREAD {
        let id_5: string;
        export { id_5 as id };
        let type_4: number;
        export { type_4 as type };
        let guild_id_4: string;
        export { guild_id_4 as guild_id };
        let name_5: string;
        export { name_5 as name };
        let position_4: number;
        export { position_4 as position };
        let permission_overwrites_4: any[];
        export { permission_overwrites_4 as permission_overwrites };
        let rate_limit_per_user_3: number;
        export { rate_limit_per_user_3 as rate_limit_per_user };
        let nsfw_4: boolean;
        export { nsfw_4 as nsfw };
        let topic_3: string;
        export { topic_3 as topic };
        let last_message_id_3: any;
        export { last_message_id_3 as last_message_id };
        let parent_id_4: string;
        export { parent_id_4 as parent_id };
        let last_pin_timestamp_3: any;
        export { last_pin_timestamp_3 as last_pin_timestamp };
        let owner_id_1: string;
        export { owner_id_1 as owner_id };
    }
    let CHANNEL_ID: string;
    let MESSAGE_ID: string;
    namespace MESSAGE {
        let id_6: string;
        export { id_6 as id };
        let type_5: number;
        export { type_5 as type };
        export let content: string;
        export let channel_id: string;
        export namespace author {
            let id_7: string;
            export { id_7 as id };
            export let username: string;
            export let discriminator: string;
            export let avatar: any;
            export let bot: boolean;
            export let system: boolean;
            export let mfa_enabled: boolean;
            export let locale: string;
            export let verified: boolean;
            export let email: any;
            export let flags: number;
            export let premium_type: number;
            export let public_flags: number;
            export let _cached: number;
        }
        export let edited_timestamp: string;
        export let mention_everyone: boolean;
        export let mentions: {
            id: string;
            username: string;
            discriminator: string;
            avatar: any;
            bot: boolean;
            system: boolean;
            mfa_enabled: boolean;
            locale: string;
            verified: boolean;
            flags: number;
            premium_type: number;
            public_flags: number;
        }[];
        export let mention_roles: string[];
        export let mention_channels: string[];
        export let attachments: {
            id: string;
            filename: string;
            size: number;
            url: string;
            proxy_url: string;
            height: number;
            width: number;
        }[];
        export let embeds: {
            title: string;
            description: string;
            url: string;
            timestamp: string;
            color: number;
            footer: {
                text: string;
                icon_url: any;
                proxy_icon_url: any;
            };
            image: {
                url: string;
                proxy_url: string;
                height: number;
                width: number;
            };
            thumbnail: {
                url: string;
                proxy_url: string;
                height: number;
                width: number;
            };
            video: {
                url: string;
            };
            fields: {
                name: string;
                value: string;
                inline: boolean;
            }[];
        }[];
        export let reactions: {
            count: number;
            me: boolean;
            emoji: {
                id: string;
                name: string;
            };
        }[];
        export let pinned: boolean;
        export let webhook_id: any;
        export namespace message_reference {
            export let message_id: string;
            let channel_id_1: string;
            export { channel_id_1 as channel_id };
            let guild_id_5: string;
            export { guild_id_5 as guild_id };
        }
        export let message_snapshots: {
            id: string;
            type: number;
            content: string;
            channel_id: string;
        }[];
        export namespace referenced_message {
            let id_8: string;
            export { id_8 as id };
            let type_6: number;
            export { type_6 as type };
            let content_1: string;
            export { content_1 as content };
            let channel_id_2: string;
            export { channel_id_2 as channel_id };
        }
        export let sticker_items: {
            id: string;
            name: string;
            format_type: number;
        }[];
        export namespace poll {
            let id_9: string;
            export { id_9 as id };
            let channel_id_3: string;
            export { channel_id_3 as channel_id };
            export let question: string;
            export let options: {
                id: string;
                option: string;
            }[];
            export let votes: {
                user_id: string;
                option_id: string;
            }[];
            export let expiry: string;
        }
    }
    let MEMBER_ID: string;
    let MEMBER_ID_2: string;
    namespace MEMBER {
        export namespace user {
            let id_10: string;
            export { id_10 as id };
            let username_1: string;
            export { username_1 as username };
            let discriminator_1: string;
            export { discriminator_1 as discriminator };
            let avatar_1: any;
            export { avatar_1 as avatar };
            let bot_1: boolean;
            export { bot_1 as bot };
            let system_1: boolean;
            export { system_1 as system };
            let mfa_enabled_1: boolean;
            export { mfa_enabled_1 as mfa_enabled };
            let locale_1: string;
            export { locale_1 as locale };
            let verified_1: boolean;
            export { verified_1 as verified };
            let email_1: any;
            export { email_1 as email };
            let flags_1: number;
            export { flags_1 as flags };
            let premium_type_1: number;
            export { premium_type_1 as premium_type };
            let public_flags_1: number;
            export { public_flags_1 as public_flags };
        }
        export let nick: any;
        let roles_1: any[];
        export { roles_1 as roles };
        let joined_at_1: string;
        export { joined_at_1 as joined_at };
        export let premium_since: any;
        export let deaf: boolean;
        export let mute: boolean;
        export let pending: boolean;
        export let permissions: string;
        let flags_2: number;
        export { flags_2 as flags };
    }
    namespace MEMBER_ADMIN {
        export namespace user_1 {
            let id_11: string;
            export { id_11 as id };
            let username_2: string;
            export { username_2 as username };
            let discriminator_2: string;
            export { discriminator_2 as discriminator };
            let avatar_2: any;
            export { avatar_2 as avatar };
            let bot_2: boolean;
            export { bot_2 as bot };
            let system_2: boolean;
            export { system_2 as system };
            let mfa_enabled_2: boolean;
            export { mfa_enabled_2 as mfa_enabled };
            let locale_2: string;
            export { locale_2 as locale };
            let verified_2: boolean;
            export { verified_2 as verified };
            let email_2: any;
            export { email_2 as email };
            let flags_3: number;
            export { flags_3 as flags };
            let premium_type_2: number;
            export { premium_type_2 as premium_type };
            let public_flags_2: number;
            export { public_flags_2 as public_flags };
        }
        export { user_1 as user };
        let nick_1: any;
        export { nick_1 as nick };
        let roles_2: string[];
        export { roles_2 as roles };
        let joined_at_2: string;
        export { joined_at_2 as joined_at };
        let premium_since_1: any;
        export { premium_since_1 as premium_since };
        let deaf_1: boolean;
        export { deaf_1 as deaf };
        let mute_1: boolean;
        export { mute_1 as mute };
        let pending_1: boolean;
        export { pending_1 as pending };
        let permissions_1: string;
        export { permissions_1 as permissions };
        let flags_4: number;
        export { flags_4 as flags };
    }
    let EVENT_ID: string;
    let ROLE_ID: string;
    namespace ATTACHMENT {
        let id_12: string;
        export { id_12 as id };
        export let filename: string;
        export let size: number;
        export let url: string;
        export let proxy_url: string;
        export let height: number;
        export let width: number;
    }
    let FILE_NAME: string;
    namespace AUDIT_LOG {
        let id_13: string;
        export { id_13 as id };
        let guild_id_6: string;
        export { guild_id_6 as guild_id };
        export let user_id: string;
        export let target_id: string;
        export let action_type: number;
        export let changes: any[];
        export namespace options_1 {
            let channel_id_4: string;
            export { channel_id_4 as channel_id };
            let id_14: string;
            export { id_14 as id };
            let type_7: number;
            export { type_7 as type };
        }
        export { options_1 as options };
        export let reason: string;
        export namespace context {
            let id_15: string;
            export { id_15 as id };
            let type_8: number;
            export { type_8 as type };
        }
        export let created_at: string;
    }
    namespace BUTTON_CLICK {
        let id_16: string;
        export { id_16 as id };
        let type_9: number;
        export { type_9 as type };
        export namespace data {
            let custom_id: string;
            let component_type: number;
        }
        let guild_id_7: string;
        export { guild_id_7 as guild_id };
        let channel_id_5: string;
        export { channel_id_5 as channel_id };
        export namespace member {
            export namespace user_2 {
                let id_17: string;
                export { id_17 as id };
                let username_3: string;
                export { username_3 as username };
                let discriminator_3: string;
                export { discriminator_3 as discriminator };
                let avatar_3: any;
                export { avatar_3 as avatar };
                let bot_3: boolean;
                export { bot_3 as bot };
                let system_3: boolean;
                export { system_3 as system };
                let mfa_enabled_3: boolean;
                export { mfa_enabled_3 as mfa_enabled };
                let locale_3: string;
                export { locale_3 as locale };
                let verified_3: boolean;
                export { verified_3 as verified };
                let email_3: any;
                export { email_3 as email };
                let flags_5: number;
                export { flags_5 as flags };
                let premium_type_3: number;
                export { premium_type_3 as premium_type };
                let public_flags_3: number;
                export { public_flags_3 as public_flags };
            }
            export { user_2 as user };
            let roles_3: any[];
            export { roles_3 as roles };
            let joined_at_3: string;
            export { joined_at_3 as joined_at };
            let premium_since_2: any;
            export { premium_since_2 as premium_since };
            let deaf_2: boolean;
            export { deaf_2 as deaf };
            let mute_2: boolean;
            export { mute_2 as mute };
            let pending_2: boolean;
            export { pending_2 as pending };
            let permissions_2: string;
            export { permissions_2 as permissions };
        }
        export let token: string;
        export let version: number;
        export namespace message {
            let id_18: string;
            export { id_18 as id };
            let type_10: number;
            export { type_10 as type };
            let content_2: string;
            export { content_2 as content };
            let channel_id_6: string;
            export { channel_id_6 as channel_id };
        }
        let custom_id_1: string;
        export { custom_id_1 as custom_id };
    }
    namespace CLIENT_USER {
        let id_19: string;
        export { id_19 as id };
        let username_4: string;
        export { username_4 as username };
        let discriminator_4: string;
        export { discriminator_4 as discriminator };
        let avatar_4: any;
        export { avatar_4 as avatar };
        let bot_4: boolean;
        export { bot_4 as bot };
        let system_4: boolean;
        export { system_4 as system };
        let mfa_enabled_4: boolean;
        export { mfa_enabled_4 as mfa_enabled };
        let locale_4: string;
        export { locale_4 as locale };
        let verified_4: boolean;
        export { verified_4 as verified };
        let email_4: any;
        export { email_4 as email };
        let flags_6: number;
        export { flags_6 as flags };
        let premium_type_4: number;
        export { premium_type_4 as premium_type };
        let public_flags_4: number;
        export { public_flags_4 as public_flags };
    }
    namespace CLIENT_MEMBER {
        export namespace user_3 {
            let id_20: string;
            export { id_20 as id };
            let username_5: string;
            export { username_5 as username };
            let discriminator_5: string;
            export { discriminator_5 as discriminator };
            let avatar_5: any;
            export { avatar_5 as avatar };
            let bot_5: boolean;
            export { bot_5 as bot };
            let system_5: boolean;
            export { system_5 as system };
            let mfa_enabled_5: boolean;
            export { mfa_enabled_5 as mfa_enabled };
            let locale_5: string;
            export { locale_5 as locale };
            let verified_5: boolean;
            export { verified_5 as verified };
            let email_5: any;
            export { email_5 as email };
            let flags_7: number;
            export { flags_7 as flags };
            let premium_type_5: number;
            export { premium_type_5 as premium_type };
            let public_flags_5: number;
            export { public_flags_5 as public_flags };
        }
        export { user_3 as user };
        let nick_2: any;
        export { nick_2 as nick };
        let roles_4: string[];
        export { roles_4 as roles };
        let joined_at_4: string;
        export { joined_at_4 as joined_at };
        let premium_since_3: any;
        export { premium_since_3 as premium_since };
        let deaf_3: boolean;
        export { deaf_3 as deaf };
        let mute_3: boolean;
        export { mute_3 as mute };
        let pending_3: boolean;
        export { pending_3 as pending };
    }
    namespace CLIENT_MEMBER_ADMIN {
        export namespace user_4 {
            let id_21: string;
            export { id_21 as id };
            let username_6: string;
            export { username_6 as username };
            let discriminator_6: string;
            export { discriminator_6 as discriminator };
            let avatar_6: any;
            export { avatar_6 as avatar };
            let bot_6: boolean;
            export { bot_6 as bot };
            let system_6: boolean;
            export { system_6 as system };
            let mfa_enabled_6: boolean;
            export { mfa_enabled_6 as mfa_enabled };
            let locale_6: string;
            export { locale_6 as locale };
            let verified_6: boolean;
            export { verified_6 as verified };
            let email_6: any;
            export { email_6 as email };
            let flags_8: number;
            export { flags_8 as flags };
            let premium_type_6: number;
            export { premium_type_6 as premium_type };
            let public_flags_6: number;
            export { public_flags_6 as public_flags };
        }
        export { user_4 as user };
        let nick_3: any;
        export { nick_3 as nick };
        let roles_5: string[];
        export { roles_5 as roles };
        let joined_at_5: string;
        export { joined_at_5 as joined_at };
        let premium_since_4: any;
        export { premium_since_4 as premium_since };
        let deaf_4: boolean;
        export { deaf_4 as deaf };
        let mute_4: boolean;
        export { mute_4 as mute };
        let pending_4: boolean;
        export { pending_4 as pending };
    }
    namespace ROLE_OVERRIDES_MEMBER {
        export namespace user_5 {
            let id_22: string;
            export { id_22 as id };
            let username_7: string;
            export { username_7 as username };
            let discriminator_7: string;
            export { discriminator_7 as discriminator };
            let avatar_7: any;
            export { avatar_7 as avatar };
            let bot_7: boolean;
            export { bot_7 as bot };
            let system_7: boolean;
            export { system_7 as system };
            let mfa_enabled_7: boolean;
            export { mfa_enabled_7 as mfa_enabled };
            let locale_7: string;
            export { locale_7 as locale };
            let verified_7: boolean;
            export { verified_7 as verified };
            let email_7: any;
            export { email_7 as email };
            let flags_9: number;
            export { flags_9 as flags };
            let premium_type_7: number;
            export { premium_type_7 as premium_type };
            let public_flags_7: number;
            export { public_flags_7 as public_flags };
        }
        export { user_5 as user };
        let nick_4: any;
        export { nick_4 as nick };
        let roles_6: string[];
        export { roles_6 as roles };
        let joined_at_6: string;
        export { joined_at_6 as joined_at };
        let premium_since_5: any;
        export { premium_since_5 as premium_since };
        let deaf_5: boolean;
        export { deaf_5 as deaf };
        let mute_5: boolean;
        export { mute_5 as mute };
        let pending_5: boolean;
        export { pending_5 as pending };
        let permissions_3: string;
        export { permissions_3 as permissions };
        let flags_10: number;
        export { flags_10 as flags };
    }
    namespace ROLE_OVERRIDES_MEMBER_2 {
        export namespace user_6 {
            let id_23: string;
            export { id_23 as id };
            let username_8: string;
            export { username_8 as username };
            let discriminator_8: string;
            export { discriminator_8 as discriminator };
            let avatar_8: any;
            export { avatar_8 as avatar };
            let bot_8: boolean;
            export { bot_8 as bot };
            let system_8: boolean;
            export { system_8 as system };
            let mfa_enabled_8: boolean;
            export { mfa_enabled_8 as mfa_enabled };
            let locale_8: string;
            export { locale_8 as locale };
            let verified_8: boolean;
            export { verified_8 as verified };
            let email_8: any;
            export { email_8 as email };
            let flags_11: number;
            export { flags_11 as flags };
            let premium_type_8: number;
            export { premium_type_8 as premium_type };
            let public_flags_8: number;
            export { public_flags_8 as public_flags };
        }
        export { user_6 as user };
        let nick_5: any;
        export { nick_5 as nick };
        let roles_7: string[];
        export { roles_7 as roles };
        let joined_at_7: string;
        export { joined_at_7 as joined_at };
        let premium_since_6: any;
        export { premium_since_6 as premium_since };
        let deaf_6: boolean;
        export { deaf_6 as deaf };
        let mute_6: boolean;
        export { mute_6 as mute };
        let pending_6: boolean;
        export { pending_6 as pending };
        let permissions_4: string;
        export { permissions_4 as permissions };
        let flags_12: number;
        export { flags_12 as flags };
    }
    namespace ROLE_ADMIN {
        let id_24: string;
        export { id_24 as id };
        let name_6: string;
        export { name_6 as name };
        export let color: number;
        export let hoist: boolean;
        let position_5: number;
        export { position_5 as position };
        let permissions_5: string;
        export { permissions_5 as permissions };
        export let managed: boolean;
        export let mentionable: boolean;
        export namespace tags {
            let bot_id: string;
            let integration_id: any;
            let premium_subscriber: any;
        }
        let icon_1: string;
        export { icon_1 as icon };
    }
    namespace ROLE_ADMIN_2 {
        let id_25: string;
        export { id_25 as id };
        let name_7: string;
        export { name_7 as name };
        let color_1: number;
        export { color_1 as color };
        let hoist_1: boolean;
        export { hoist_1 as hoist };
        let position_6: number;
        export { position_6 as position };
        let permissions_6: string;
        export { permissions_6 as permissions };
        let managed_1: boolean;
        export { managed_1 as managed };
        let mentionable_1: boolean;
        export { mentionable_1 as mentionable };
        export namespace tags_1 {
            let bot_id_1: string;
            export { bot_id_1 as bot_id };
            let integration_id_1: any;
            export { integration_id_1 as integration_id };
            let premium_subscriber_1: any;
            export { premium_subscriber_1 as premium_subscriber };
        }
        export { tags_1 as tags };
        let icon_2: string;
        export { icon_2 as icon };
    }
    namespace ROLE_OVERRIDES {
        let id_26: string;
        export { id_26 as id };
        let name_8: string;
        export { name_8 as name };
        let color_2: number;
        export { color_2 as color };
        let hoist_2: boolean;
        export { hoist_2 as hoist };
        let position_7: number;
        export { position_7 as position };
        let permissions_7: string;
        export { permissions_7 as permissions };
        let managed_2: boolean;
        export { managed_2 as managed };
        let mentionable_2: boolean;
        export { mentionable_2 as mentionable };
        let icon_3: string;
        export { icon_3 as icon };
    }
    namespace ROLE_OVERRIDES_2 {
        let id_27: string;
        export { id_27 as id };
        let name_9: string;
        export { name_9 as name };
        let color_3: number;
        export { color_3 as color };
        let hoist_3: boolean;
        export { hoist_3 as hoist };
        let position_8: number;
        export { position_8 as position };
        let permissions_8: string;
        export { permissions_8 as permissions };
        let managed_3: boolean;
        export { managed_3 as managed };
        let mentionable_3: boolean;
        export { mentionable_3 as mentionable };
        let icon_4: string;
        export { icon_4 as icon };
    }
    namespace EMOJI {
        let id_28: string;
        export { id_28 as id };
        let name_10: string;
        export { name_10 as name };
        let guild_id_8: string;
        export { guild_id_8 as guild_id };
        export let animated: boolean;
    }
    namespace STANDARD_EMOJI {
        let id_29: any;
        export { id_29 as id };
        let name_11: string;
        export { name_11 as name };
    }
    namespace INTERACTION {
        let id_30: string;
        export { id_30 as id };
        let type_11: number;
        export { type_11 as type };
        export namespace data_1 {
            let name_12: string;
            export { name_12 as name };
            let options_2: any[];
            export { options_2 as options };
        }
        export { data_1 as data };
        let guild_id_9: string;
        export { guild_id_9 as guild_id };
        let channel_id_7: string;
        export { channel_id_7 as channel_id };
        export namespace member_1 {
            export namespace user_7 {
                let id_31: string;
                export { id_31 as id };
                let username_9: string;
                export { username_9 as username };
                let discriminator_9: string;
                export { discriminator_9 as discriminator };
                let avatar_9: any;
                export { avatar_9 as avatar };
                let bot_9: boolean;
                export { bot_9 as bot };
                let system_9: boolean;
                export { system_9 as system };
                let mfa_enabled_9: boolean;
                export { mfa_enabled_9 as mfa_enabled };
                let locale_9: string;
                export { locale_9 as locale };
                let verified_9: boolean;
                export { verified_9 as verified };
                let email_9: any;
                export { email_9 as email };
                let flags_13: number;
                export { flags_13 as flags };
                let premium_type_9: number;
                export { premium_type_9 as premium_type };
                let public_flags_9: number;
                export { public_flags_9 as public_flags };
            }
            export { user_7 as user };
            let roles_8: any[];
            export { roles_8 as roles };
            let joined_at_8: string;
            export { joined_at_8 as joined_at };
            let premium_since_7: any;
            export { premium_since_7 as premium_since };
            let deaf_7: boolean;
            export { deaf_7 as deaf };
            let mute_7: boolean;
            export { mute_7 as mute };
            let pending_7: boolean;
            export { pending_7 as pending };
            let permissions_9: string;
            export { permissions_9 as permissions };
        }
        export { member_1 as member };
        let token_1: string;
        export { token_1 as token };
        let version_1: number;
        export { version_1 as version };
    }
    namespace INVITE {
        export let code: string;
        let guild_id_10: string;
        export { guild_id_10 as guild_id };
        export namespace channel {
            let id_32: string;
            export { id_32 as id };
            let name_13: string;
            export { name_13 as name };
            let type_12: number;
            export { type_12 as type };
            let nsfw_5: boolean;
            export { nsfw_5 as nsfw };
            let parent_id_5: string;
            export { parent_id_5 as parent_id };
            let topic_4: string;
            export { topic_4 as topic };
        }
        export namespace inviter {
            let id_33: string;
            export { id_33 as id };
            let username_10: string;
            export { username_10 as username };
            let discriminator_10: string;
            export { discriminator_10 as discriminator };
            let avatar_10: any;
            export { avatar_10 as avatar };
            let bot_10: boolean;
            export { bot_10 as bot };
            let system_10: boolean;
            export { system_10 as system };
            let mfa_enabled_10: boolean;
            export { mfa_enabled_10 as mfa_enabled };
            let locale_10: string;
            export { locale_10 as locale };
            let verified_10: boolean;
            export { verified_10 as verified };
            let email_10: any;
            export { email_10 as email };
            let flags_14: number;
            export { flags_14 as flags };
            let premium_type_10: number;
            export { premium_type_10 as premium_type };
            let public_flags_10: number;
            export { public_flags_10 as public_flags };
        }
        export let target_user_id: any;
        export let target_user_type: number;
        let approximate_presence_count_1: number;
        export { approximate_presence_count_1 as approximate_presence_count };
        let approximate_member_count_1: number;
        export { approximate_member_count_1 as approximate_member_count };
        export let expires_at: string;
        export let uses: number;
        export let max_uses: number;
        export let max_age: number;
        export let temporary: boolean;
        let created_at_1: string;
        export { created_at_1 as created_at };
    }
    namespace MODAL_RESPONSE {
        let id_34: string;
        export { id_34 as id };
        let type_13: number;
        export { type_13 as type };
        export namespace data_2 {
            let components: {
                type: number;
                components: {
                    custom_id: string;
                    type: number;
                    value: string;
                }[];
            }[];
        }
        export { data_2 as data };
        let guild_id_11: string;
        export { guild_id_11 as guild_id };
        let channel_id_8: string;
        export { channel_id_8 as channel_id };
        export namespace member_2 {
            let avatar_11: any;
            export { avatar_11 as avatar };
            let flags_15: number;
            export { flags_15 as flags };
            export namespace user_8 {
                let id_35: string;
                export { id_35 as id };
                let username_11: string;
                export { username_11 as username };
                let discriminator_11: string;
                export { discriminator_11 as discriminator };
                let avatar_12: any;
                export { avatar_12 as avatar };
                let bot_11: boolean;
                export { bot_11 as bot };
            }
            export { user_8 as user };
            let roles_9: any;
            export { roles_9 as roles };
            let joined_at_9: string;
            export { joined_at_9 as joined_at };
            let premium_since_8: any;
            export { premium_since_8 as premium_since };
            let deaf_8: boolean;
            export { deaf_8 as deaf };
            let mute_8: boolean;
            export { mute_8 as mute };
            let pending_8: boolean;
            export { pending_8 as pending };
            let permissions_10: string;
            export { permissions_10 as permissions };
        }
        export { member_2 as member };
        let token_2: string;
        export { token_2 as token };
        let version_2: number;
        export { version_2 as version };
    }
    namespace OPTION_SELECT {
        let application_id_1: string;
        export { application_id_1 as application_id };
        let id_36: string;
        export { id_36 as id };
        let type_14: number;
        export { type_14 as type };
        export namespace data_3 {
            let custom_id_2: string;
            export { custom_id_2 as custom_id };
            let component_type_1: number;
            export { component_type_1 as component_type };
            export let values: string[];
        }
        export { data_3 as data };
        let guild_id_12: string;
        export { guild_id_12 as guild_id };
        let channel_id_9: string;
        export { channel_id_9 as channel_id };
        export namespace member_3 {
            export namespace user_9 {
                let id_37: string;
                export { id_37 as id };
                let username_12: string;
                export { username_12 as username };
                let discriminator_12: string;
                export { discriminator_12 as discriminator };
                let avatar_13: any;
                export { avatar_13 as avatar };
                let bot_12: boolean;
                export { bot_12 as bot };
                export let global_name: string;
            }
            export { user_9 as user };
            let roles_10: any[];
            export { roles_10 as roles };
            let joined_at_10: string;
            export { joined_at_10 as joined_at };
            let premium_since_9: any;
            export { premium_since_9 as premium_since };
            let deaf_9: boolean;
            export { deaf_9 as deaf };
            let mute_9: boolean;
            export { mute_9 as mute };
            let pending_9: boolean;
            export { pending_9 as pending };
            let permissions_11: string;
            export { permissions_11 as permissions };
            let avatar_14: any;
            export { avatar_14 as avatar };
            let flags_16: number;
            export { flags_16 as flags };
        }
        export { member_3 as member };
        export namespace message_1 {
            let application_id_2: string;
            export { application_id_2 as application_id };
            let id_38: string;
            export { id_38 as id };
            let type_15: number;
            export { type_15 as type };
            let content_3: string;
            export { content_3 as content };
            let channel_id_10: string;
            export { channel_id_10 as channel_id };
            export namespace author_1 {
                let id_39: string;
                export { id_39 as id };
                let username_13: string;
                export { username_13 as username };
                let discriminator_13: string;
                export { discriminator_13 as discriminator };
                let avatar_15: any;
                export { avatar_15 as avatar };
                let bot_13: boolean;
                export { bot_13 as bot };
                let global_name_1: string;
                export { global_name_1 as global_name };
            }
            export { author_1 as author };
            let attachments_1: any[];
            export { attachments_1 as attachments };
            let embeds_1: any[];
            export { embeds_1 as embeds };
            let mentions_1: any[];
            export { mentions_1 as mentions };
            let mention_roles_1: any[];
            export { mention_roles_1 as mention_roles };
            let mention_channels_1: any[];
            export { mention_channels_1 as mention_channels };
            let pinned_1: boolean;
            export { pinned_1 as pinned };
            let mention_everyone_1: boolean;
            export { mention_everyone_1 as mention_everyone };
            export let tts: boolean;
            export let timestamp: string;
            let edited_timestamp_1: any;
            export { edited_timestamp_1 as edited_timestamp };
            let flags_17: number;
            export { flags_17 as flags };
        }
        export { message_1 as message };
        let token_3: string;
        export { token_3 as token };
        let version_3: number;
        export { version_3 as version };
    }
    namespace REACTION {
        let user_id_1: string;
        export { user_id_1 as user_id };
        let message_id_1: string;
        export { message_id_1 as message_id };
        export namespace emoji {
            let id_40: any;
            export { id_40 as id };
            let name_14: string;
            export { name_14 as name };
        }
        let channel_id_11: string;
        export { channel_id_11 as channel_id };
        let guild_id_13: string;
        export { guild_id_13 as guild_id };
        export namespace member_4 {
            export namespace user_10 {
                let id_41: string;
                export { id_41 as id };
                let username_14: string;
                export { username_14 as username };
                let discriminator_14: string;
                export { discriminator_14 as discriminator };
                let avatar_16: any;
                export { avatar_16 as avatar };
                let bot_14: boolean;
                export { bot_14 as bot };
                let system_11: boolean;
                export { system_11 as system };
                let mfa_enabled_11: boolean;
                export { mfa_enabled_11 as mfa_enabled };
                let locale_11: string;
                export { locale_11 as locale };
                let verified_11: boolean;
                export { verified_11 as verified };
                let email_11: any;
                export { email_11 as email };
                let flags_18: number;
                export { flags_18 as flags };
                let premium_type_11: number;
                export { premium_type_11 as premium_type };
                let public_flags_11: number;
                export { public_flags_11 as public_flags };
            }
            export { user_10 as user };
            let roles_11: any[];
            export { roles_11 as roles };
            let joined_at_11: string;
            export { joined_at_11 as joined_at };
            let premium_since_10: any;
            export { premium_since_10 as premium_since };
            let deaf_10: boolean;
            export { deaf_10 as deaf };
            let mute_10: boolean;
            export { mute_10 as mute };
            let pending_10: boolean;
            export { pending_10 as pending };
            let permissions_12: string;
            export { permissions_12 as permissions };
        }
        export { member_4 as member };
        export let message_author_id: string;
        export let burst: boolean;
        let type_16: number;
        export { type_16 as type };
    }
    namespace SLASH_COMMAND {
        let id_42: string;
        export { id_42 as id };
        let type_17: number;
        export { type_17 as type };
        export namespace data_4 {
            let name_15: string;
            export { name_15 as name };
            let description_1: string;
            export { description_1 as description };
            let options_3: any[];
            export { options_3 as options };
        }
        export { data_4 as data };
        let guild_id_14: string;
        export { guild_id_14 as guild_id };
        let channel_id_12: string;
        export { channel_id_12 as channel_id };
        export namespace member_5 {
            export namespace user_11 {
                let id_43: string;
                export { id_43 as id };
                let username_15: string;
                export { username_15 as username };
                let discriminator_15: string;
                export { discriminator_15 as discriminator };
                let avatar_17: any;
                export { avatar_17 as avatar };
                let bot_15: boolean;
                export { bot_15 as bot };
                let system_12: boolean;
                export { system_12 as system };
                let mfa_enabled_12: boolean;
                export { mfa_enabled_12 as mfa_enabled };
                let locale_12: string;
                export { locale_12 as locale };
                let verified_12: boolean;
                export { verified_12 as verified };
                let email_12: any;
                export { email_12 as email };
                let flags_19: number;
                export { flags_19 as flags };
                let premium_type_12: number;
                export { premium_type_12 as premium_type };
                let public_flags_12: number;
                export { public_flags_12 as public_flags };
            }
            export { user_11 as user };
            let roles_12: any[];
            export { roles_12 as roles };
            let joined_at_12: string;
            export { joined_at_12 as joined_at };
            let premium_since_11: any;
            export { premium_since_11 as premium_since };
            let deaf_11: boolean;
            export { deaf_11 as deaf };
            let mute_11: boolean;
            export { mute_11 as mute };
            let pending_11: boolean;
            export { pending_11 as pending };
            let permissions_13: string;
            export { permissions_13 as permissions };
        }
        export { member_5 as member };
        let token_4: string;
        export { token_4 as token };
        let version_4: number;
        export { version_4 as version };
    }
    namespace STICKER {
        let id_44: string;
        export { id_44 as id };
        let name_16: string;
        export { name_16 as name };
        let tags_2: string;
        export { tags_2 as tags };
        let type_18: number;
        export { type_18 as type };
        export let format_type: number;
        let description_2: string;
        export { description_2 as description };
        export let asset: string;
        export let pack_id: string;
        export let sort_value: number;
    }
    namespace USER {
        let id_45: string;
        export { id_45 as id };
        let username_16: string;
        export { username_16 as username };
        let discriminator_16: string;
        export { discriminator_16 as discriminator };
        let avatar_18: string;
        export { avatar_18 as avatar };
        let bot_16: boolean;
        export { bot_16 as bot };
        let system_13: boolean;
        export { system_13 as system };
        let mfa_enabled_13: boolean;
        export { mfa_enabled_13 as mfa_enabled };
        let locale_13: string;
        export { locale_13 as locale };
        let verified_13: boolean;
        export { verified_13 as verified };
        let email_13: any;
        export { email_13 as email };
        let flags_20: number;
        export { flags_20 as flags };
        let premium_type_13: number;
        export { premium_type_13 as premium_type };
        let public_flags_13: number;
        export { public_flags_13 as public_flags };
        let global_name_2: string;
        export { global_name_2 as global_name };
    }
    namespace VOICE_STATE {
        let channel_id_13: string;
        export { channel_id_13 as channel_id };
        let user_id_2: string;
        export { user_id_2 as user_id };
        export let session_id: string;
        let deaf_12: boolean;
        export { deaf_12 as deaf };
        let mute_12: boolean;
        export { mute_12 as mute };
        export let self_deaf: boolean;
        export let self_mute: boolean;
        export let suppress: boolean;
        export let self_stream: boolean;
        export let self_video: boolean;
        export let request_to_speak_timestamp: string;
        export let joined: number;
    }
    namespace SCHEDULED_EVENT {
        let id_46: string;
        export { id_46 as id };
        let guild_id_15: string;
        export { guild_id_15 as guild_id };
        let channel_id_14: string;
        export { channel_id_14 as channel_id };
        export let creator_id: string;
        let name_17: string;
        export { name_17 as name };
        let description_3: string;
        export { description_3 as description };
        export let scheduled_start_time: string;
        export let scheduled_end_time: string;
        export let privacy_level: number;
        export let status: number;
        export let entity_type: number;
        export let entity_id: string;
        export namespace entity_metadata {
            let location: any;
        }
        export namespace creator {
            let id_47: string;
            export { id_47 as id };
            let username_17: string;
            export { username_17 as username };
            let discriminator_17: string;
            export { discriminator_17 as discriminator };
            let avatar_19: any;
            export { avatar_19 as avatar };
            let bot_17: boolean;
            export { bot_17 as bot };
            let system_14: boolean;
            export { system_14 as system };
            let mfa_enabled_14: boolean;
            export { mfa_enabled_14 as mfa_enabled };
            let locale_14: string;
            export { locale_14 as locale };
            let verified_14: boolean;
            export { verified_14 as verified };
            let email_14: any;
            export { email_14 as email };
            let flags_21: number;
            export { flags_21 as flags };
            let premium_type_14: number;
            export { premium_type_14 as premium_type };
            let public_flags_14: number;
            export { public_flags_14 as public_flags };
        }
        export let user_count: number;
        export let image: string;
    }
    namespace SCHEDULED_EVENT_EXTERNAL {
        let id_48: string;
        export { id_48 as id };
        let guild_id_16: string;
        export { guild_id_16 as guild_id };
        let channel_id_15: string;
        export { channel_id_15 as channel_id };
        let creator_id_1: string;
        export { creator_id_1 as creator_id };
        let name_18: string;
        export { name_18 as name };
        let description_4: string;
        export { description_4 as description };
        let scheduled_start_time_1: string;
        export { scheduled_start_time_1 as scheduled_start_time };
        let scheduled_end_time_1: string;
        export { scheduled_end_time_1 as scheduled_end_time };
        let privacy_level_1: number;
        export { privacy_level_1 as privacy_level };
        let status_1: number;
        export { status_1 as status };
        let entity_type_1: number;
        export { entity_type_1 as entity_type };
        let entity_id_1: string;
        export { entity_id_1 as entity_id };
        export namespace entity_metadata_1 {
            let location_1: string;
            export { location_1 as location };
        }
        export { entity_metadata_1 as entity_metadata };
        export namespace creator_1 {
            let id_49: string;
            export { id_49 as id };
            let username_18: string;
            export { username_18 as username };
            let discriminator_18: string;
            export { discriminator_18 as discriminator };
            let avatar_20: any;
            export { avatar_20 as avatar };
            let bot_18: boolean;
            export { bot_18 as bot };
            let system_15: boolean;
            export { system_15 as system };
            let mfa_enabled_15: boolean;
            export { mfa_enabled_15 as mfa_enabled };
            let locale_15: string;
            export { locale_15 as locale };
            let verified_15: boolean;
            export { verified_15 as verified };
            let email_15: any;
            export { email_15 as email };
            let flags_22: number;
            export { flags_22 as flags };
            let premium_type_15: number;
            export { premium_type_15 as premium_type };
            let public_flags_15: number;
            export { public_flags_15 as public_flags };
        }
        export { creator_1 as creator };
        let user_count_1: number;
        export { user_count_1 as user_count };
        let image_1: string;
        export { image_1 as image };
    }
    namespace POLL {
        let question_1: string;
        export { question_1 as question };
        export let answers: {
            answer_id: number;
            poll_media: {
                text: string;
                emoji: {
                    id: string;
                    name: string;
                };
            };
        }[];
        let expiry_1: string;
        export { expiry_1 as expiry };
        export let allow_multiselect: boolean;
        export let layout_type: number;
        export namespace results {
            let is_finalized: boolean;
            let answer_counts: {
                id: number;
                count: number;
                me_voted: boolean;
            }[];
        }
    }
    namespace PERMISSION_OVERWRITE {
        let id_50: string;
        export { id_50 as id };
        let type_19: number;
        export { type_19 as type };
        export let allow: string;
        export let deny: string;
    }
    namespace FOLLOWED_CHANNEL {
        let channel_id_16: string;
        export { channel_id_16 as channel_id };
        let webhook_id_1: string;
        export { webhook_id_1 as webhook_id };
    }
    namespace WEBHOOK {
        let id_51: string;
        export { id_51 as id };
        let type_20: number;
        export { type_20 as type };
        let guild_id_17: string;
        export { guild_id_17 as guild_id };
        let channel_id_17: string;
        export { channel_id_17 as channel_id };
        let name_19: string;
        export { name_19 as name };
        let avatar_21: any;
        export { avatar_21 as avatar };
        let application_id_3: any;
        export { application_id_3 as application_id };
        export namespace user_12 {
            let id_52: string;
            export { id_52 as id };
            let username_19: string;
            export { username_19 as username };
            let discriminator_19: string;
            export { discriminator_19 as discriminator };
            let avatar_22: any;
            export { avatar_22 as avatar };
            let bot_19: boolean;
            export { bot_19 as bot };
            let global_name_3: string;
            export { global_name_3 as global_name };
        }
        export { user_12 as user };
    }
    namespace BAN {
        let reason_1: string;
        export { reason_1 as reason };
        export namespace user_13 {
            let id_53: string;
            export { id_53 as id };
            let username_20: string;
            export { username_20 as username };
            let discriminator_20: string;
            export { discriminator_20 as discriminator };
            let avatar_23: any;
            export { avatar_23 as avatar };
            let global_name_4: string;
            export { global_name_4 as global_name };
            let bot_20: boolean;
            export { bot_20 as bot };
        }
        export { user_13 as user };
    }
}
export namespace TEST_CLIENTS {
    function ALL_CACHES_ENABLED(): Client;
    function NO_CACHES_ENABLED(): Client;
}
export namespace TEST_GUILDS {
    export function ALL_CACHES_ENABLED_1(client: any): Guild;
    export { ALL_CACHES_ENABLED_1 as ALL_CACHES_ENABLED };
    export function NO_CACHES_ENABLED_1(client: any): Guild;
    export { NO_CACHES_ENABLED_1 as NO_CACHES_ENABLED };
}
export namespace TEST_CHANNELS {
    function TEXT_CHANNEL_ALL_CACHES_ENABLED(client: any): TextChannel;
    function TEXT_CHANNEL_2_ALL_CACHES_ENABLED(client: any): TextChannel;
    function VOICE_CHANNEL_ALL_CACHES_ENABLED(client: any): VoiceChannel;
    function CATEGORY_CHANNEL_ALL_CACHES_ENABLED(client: any): CategoryChannel;
}
export namespace TEST_MEMBERS {
    export function CLIENT_MEMBER_1(client: any): Member;
    export { CLIENT_MEMBER_1 as CLIENT_MEMBER };
    export function THREAD_OWNER_MEMBER(client: any): Member;
    export function GUILD_OWNER_MEMBER(client: any): Member;
    export function GENERIC_MEMBER(client: any): Member;
    export function VOICE_STATE_MEMBER(client: any): Member;
    export function EXECUTOR_MEMBER(client: any): Member;
    export function TARGET_MEMBER(client: any): Member;
    export function CLIENT_MEMBER_1_1(client: any): Member;
    export { CLIENT_MEMBER_1_1 as CLIENT_MEMBER_1 };
    export function ROLE_OVERRIDES_MEMBER_1(client: any): Member;
    export { ROLE_OVERRIDES_MEMBER_1 as ROLE_OVERRIDES_MEMBER };
    export function ROLE_OVERRIDES_MEMBER_2_1(client: any): Member;
    export { ROLE_OVERRIDES_MEMBER_2_1 as ROLE_OVERRIDES_MEMBER_2 };
}
export namespace TEST_MESSAGES {
    function GENERIC_MESSAGE(client: any): Message;
}
export namespace TEST_ROLES {
    function GENERIC_ADMIN_ROLE(client: any): Role;
    function GENERIC_ADMIN_ROLE_2(client: any): Role;
    function GENERIC_ROLE(client: any): Role;
    function GENERIC_ROLE_2(client: any): Role;
}
export namespace TEST_SCHEDULED_EVENTS {
    function GENERIC_SCHEDULED_EVENT(client: any): ScheduledEvent;
    function EXTERNAL_GENERIC_SCHEDULED_EVENT(client: any): ScheduledEvent;
}
export namespace TEST_USERS {
    function GENERIC_USER(client: any): User;
}
export namespace TEST_EMOJIS {
    function GENERIC_EMOJI(client: any): Emoji;
}
import Client from "./Client.js";
import Guild from "./structures/Guild.js";
import TextChannel from "./structures/TextChannel.js";
import VoiceChannel from "./structures/VoiceChannel.js";
import CategoryChannel from "./structures/CategoryChannel.js";
import { Member } from "./structures.js";
import { Message } from "./structures.js";
import { Role } from "./structures.js";
import { ScheduledEvent } from "./structures.js";
import User from "./structures/User.js";
import { Emoji } from "./structures.js";
//# sourceMappingURL=testData.d.ts.map