declare const _default: {
  getGatewayBot: {
    path: () => string;
    method: string;
    majorParams: never[];
    mockResponse: ({ params }?: any) => any;
  };
  postCreateMessage: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params, request }?: any) => Promise<any>;
  };
  patchEditMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params, request }?: any) => Promise<any>;
  };
  putCreateGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildAuditLog: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getChannelMessages: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getChannelMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildInvites: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: ({ params }?: any) => any;
  };
  patchOriginalInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteOriginalInteractionResponse: {
    path: (application_id: string, interaction_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postBulkDeleteMessages: {
    path: (channel_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postExecuteWebhook: {
    path: (webhook_id: string, webhook_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildChannels: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postFollowNewsChannel: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getSearchGuildMembers: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  patchGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteChannelMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteRemoveGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  putAddGuildMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteRemoveMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getUser: {
    path: (user_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: ({ params }?: any) => any;
  };
  getChannelWebhooks: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postCreateWebhook: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  patchModifyWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  deleteLeaveGuild: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getListGuildScheduledEvents: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getGuildScheduledEvent: {
    path: (guild_id: string, scheduled_event_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  bulkOverwriteGlobalApplicationCommands: {
    path: (application_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getRoles: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getEmoji: {
    path: (guild_id: string, emoji_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getChannelPins: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getChannel: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  getClientEmojis: {
    path: (client_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
  postAddClientEmoji: {
    path: (client_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ params }?: any) => any;
  };
};
export default _default;
