/* of course, stick to this format of "methodPath1Path2" */
/* the arguments passed to the path() function should simply become the parameters of the request */
/* for example, (guild_id) => { return `/guilds/${guild_id}` } */
/* though in terms of ratelimiting, we may need to figure something out since i think the bucket id can even change depending on what exactly the request is doing? */
/* as in, deleting older messages has a lower ratelimit (and therefore different bucket id) compared with deleting newer messages, or so i have heard */
/* will need to verify and figure something out if this is the case */
/* perhaps could just have some function which takes this into account? /shrug */
module.exports = {
    getGatewayBot: {
        path: () => {
            return "/gateway/bot";
        },
        method: "GET",
        bucket: null
    },
    postCreateMessage: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "POST",
        bucket: null
    },
    patchEditMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "PATCH",
        bucket: null
    },
    putCreateGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "PUT",
        bucket: null
    },
    getGuildAuditLog: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/audit-logs`;
        },
        method: "GET",
        bucket: null
    },
    getChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}`;
        },
        method: "GET",
        bucket: null
    },
    getChannelMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "GET",
        bucket: null
    },
    getChannelMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "GET",
        bucket: null
    },
    getGuildInvites: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/invites`;
        },
        method: "GET",
        bucket: null
    },
    postInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/interactions/${interaction_id}/${interaction_token}/callback`;
        },
        method: "POST",
        bucket: null
    },
    patchOriginalInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/webhooks/${interaction_id}/${interaction_token}/messages/@original`;
        },
        method: "PATCH",
        bucket: null
    },
    postBulkDeleteMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages/bulk-delete`;
        },
        method: "POST",
        bucket: null
    },
    postExecuteWebhook: {
        path: ([webhook_id, webhook_token]) => {
            return `/webhooks/${webhook_id}/${webhook_token}`;
        },
        method: "POST",
        bucket: null
    },
    getGuildChannels: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/channels`;
        },
        method: "GET",
        bucket: null
    },
    postFollowNewsChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/followers`;
        },
        method: "POST",
        bucket: null
    },
    getGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "GET",
        bucket: null
    },
    getGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "GET",
        bucket: null
    },
    deleteGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "DELETE",
        bucket: null
    },
    deleteRemoveGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "DELETE",
        bucket: null
    },
    putAddGuildMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "PUT",
        useHeaders: true,
        bucket: null
    },
    deleteRemoveMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "DELETE",
        useHeaders: true,
        bucket: null
    },
    getUser: {
        path: ([user_id]) => {
            return `/users/${user_id}`;
        },
        method: "GET",
        bucket: null
    },
    getChannelWebhooks: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/webhooks`;
        },
        method: "GET",
        bucket: null
    },
    deleteWebhook: {
        path: ([webhook_id]) => {
            return `/webhooks/${webhook_id}`;
        },
        method: "DELETE",
        bucket: null
    },
    getSearchGuildMembers: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/members/search`;
        },
        method: "GET",
        bucket: null
    }
};