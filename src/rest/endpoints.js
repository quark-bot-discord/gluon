/* of course, stick to this format of "methodPath1Path2" */
/* the arguments passed to the path() function should simply become the parameters of the request */
/* for example, (guild_id) => { return `/guilds/${guild_id}` } */
export default {
  getGatewayBot: {
    path: () => {
      return "/gateway/bot";
    },
    method: "GET",
    majorParams: [],
    mockResponse: ({ params } = {}) => {},
  },
  postCreateMessage: {
    path: (channel_id) => {
      return `/channels/${channel_id}/messages`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  patchEditMessage: {
    path: (channel_id, message_id) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "PATCH",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  putCreateGuildBan: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "PUT",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildAuditLog: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/audit-logs`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getChannel: {
    path: (channel_id) => {
      return `/channels/${channel_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getChannelMessages: {
    path: (channel_id) => {
      return `/channels/${channel_id}/messages`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getChannelMessage: {
    path: (channel_id, message_id) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildInvites: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/invites`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  postInteractionResponse: {
    path: (interaction_id, interaction_token) => {
      return `/interactions/${interaction_id}/${interaction_token}/callback`;
    },
    method: "POST",
    majorParams: [],
    mockResponse: ({ params } = {}) => {
      console.log(params);
    },
  },
  patchOriginalInteractionResponse: {
    path: (interaction_id, interaction_token) => {
      return `/webhooks/${interaction_id}/${interaction_token}/messages/@original`;
    },
    method: "PATCH",
    majorParams: [0, 1],
    mockResponse: ({ params } = {}) => {},
  },
  postBulkDeleteMessages: {
    path: (channel_id) => {
      return `/channels/${channel_id}/messages/bulk-delete`;
    },
    method: "POST",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  postExecuteWebhook: {
    path: (webhook_id, webhook_token) => {
      return `/webhooks/${webhook_id}/${webhook_token}`;
    },
    method: "POST",
    majorParams: [0, 1],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildChannels: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/channels`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  postFollowNewsChannel: {
    path: (channel_id) => {
      return `/channels/${channel_id}/followers`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildMember: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  patchGuildMember: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "PATCH",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildBan: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  deleteChannelMessage: {
    path: (channel_id, message_id) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  deleteGuildMember: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  deleteRemoveGuildBan: {
    path: (guild_id, user_id) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  putAddGuildMemberRole: {
    path: (guild_id, user_id, role_id) => {
      return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
    },
    method: "PUT",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  deleteRemoveMemberRole: {
    path: (guild_id, user_id, role_id) => {
      return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getUser: {
    path: (user_id) => {
      return `/users/${user_id}`;
    },
    method: "GET",
    majorParams: [],
    mockResponse: ({ params } = {}) => {},
  },
  getChannelWebhooks: {
    path: (channel_id) => {
      return `/channels/${channel_id}/webhooks`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getWebhook: {
    path: (webhook_id) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "GET",
    majorParams: [],
    mockResponse: ({ params } = {}) => {},
  },
  deleteWebhook: {
    path: (webhook_id) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "DELETE",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getSearchGuildMembers: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/members/search`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  postCreateWebhook: {
    path: (channel_id) => {
      return `/channels/${channel_id}/webhooks`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  patchModifyWebhook: {
    path: (webhook_id) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "PATCH",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  deleteLeaveGuild: {
    path: (guild_id) => {
      return `/users/@me/guilds/${guild_id}`;
    },
    method: "DELETE",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getListGuildScheduledEvents: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/scheduled-events`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getGuildScheduledEvent: {
    path: (guild_id, scheduled_event_id) => {
      return `/guilds/${guild_id}/scheduled-events/${scheduled_event_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  bulkOverwriteGlobalApplicationCommands: {
    path: (application_id) => {
      return `/applications/${application_id}/commands`;
    },
    method: "PUT",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getRoles: {
    path: (guild_id) => {
      return `/guilds/${guild_id}/roles`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getEmoji: {
    path: (guild_id, emoji_id) => {
      return `/guilds/${guild_id}/emojis/${emoji_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
  getPinned: {
    path: (channel_id) => {
      return `/channels/${channel_id}/pins`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: ({ params } = {}) => {},
  },
};
