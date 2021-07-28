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
        method: "GET"
    },
    postCreateMessage: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "POST"
    },
    patchEditMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "PATCH"
    },
    putCreateGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "PUT"
    },
    getGuildAuditLog: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/audit-logs`;
        },
        method: "GET"
    },
    getChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}`;
        },
        method: "GET"
    },
    getChannelMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "GET"
    },
    getChannelMessage: {
        path: ([channel_id, message_id]) => {
            return `/channels/${channel_id}/messages/${message_id}`;
        },
        method: "GET"
    },
    getGuildInvites: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/invites`;
        },
        method: "GET"
    },
    postInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/interactions/${interaction_id}/${interaction_token}/callback`;
        },
        method: "POST"
    },
    patchOriginalInteractionResponse: {
        path: ([interaction_id, interaction_token]) => {
            return `/webhooks/${interaction_id}/${interaction_token}/messages/@original`;
        },
        method: "PATCH"
    },
    postBulkDeleteMessages: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/messages/bulk-delete`;
        },
        method: "POST"
    },
    postExecuteWebhook: {
        path: ([webhook_id, webhook_token]) => {
            return `/webhooks/${webhook_id}/${webhook_token}`;
        },
        method: "POST"
    },
    getGuildChannels: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/channels`;
        },
        method: "GET"
    },
    postFollowNewsChannel: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/followers`;
        },
        method: "POST"
    },
    getGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "GET"
    },
    getGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "GET"
    },
    deleteGuildMember: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/members/${user_id}`;
        },
        method: "DELETE"
    },
    deleteRemoveGuildBan: {
        path: ([guild_id, user_id]) => {
            return `/guilds/${guild_id}/bans/${user_id}`;
        },
        method: "DELETE"
    },
    putAddGuildMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "PUT",
        useHeaders: true
    },
    deleteRemoveMemberRole: {
        path: ([guild_id, user_id, role_id]) => {
            return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
        },
        method: "DELETE",
        useHeaders: true
    },
    getUser: {
        path: ([user_id]) => {
            return `/users/${user_id}`;
        },
        method: "GET"
    },
    getChannelWebhooks: {
        path: ([channel_id]) => {
            return `/channels/${channel_id}/webhooks`;
        },
        method: "GET"
    },
    deleteWebhook: {
        path: ([webhook_id]) => {
            return `/webhooks/${webhook_id}`;
        },
        method: "DELETE"
    },
    getSearchGuildMembers: {
        path: ([guild_id]) => {
            return `/guilds/${guild_id}/members/search`;
        },
        method: "GET"
    }
};