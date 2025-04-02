declare const _default: {
  getGatewayBot: {
    path: () => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  postCreateMessage: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ request }: { request: Request }) => Promise<any>;
  };
  patchEditMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: ({ request }: { request: Request }) => Promise<any>;
  };
  putCreateGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildAuditLog: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getChannelMessages: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getChannelMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildInvites: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  postInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  patchOriginalInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  deleteOriginalInteractionResponse: {
    path: (application_id: string, interaction_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  postBulkDeleteMessages: {
    path: (channel_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  postExecuteWebhook: {
    path: (webhook_id: string, webhook_token: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildChannels: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  postFollowNewsChannel: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getSearchGuildMembers: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  patchGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  deleteChannelMessage: {
    path: (channel_id: string, message_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  deleteGuildMember: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  deleteRemoveGuildBan: {
    path: (guild_id: string, user_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  putAddGuildMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  deleteRemoveMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => string;
    method: string;
    useHeaders: string[];
    majorParams: number[];
    mockResponse: () => any;
  };
  getUser: {
    path: (user_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  getChannelWebhooks: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  deleteWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  postCreateWebhook: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  patchModifyWebhook: {
    path: (webhook_id: string) => string;
    method: string;
    majorParams: never[];
    mockResponse: () => any;
  };
  deleteLeaveGuild: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getListGuildScheduledEvents: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getGuildScheduledEvent: {
    path: (guild_id: string, scheduled_event_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  bulkOverwriteGlobalApplicationCommands: {
    path: (application_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getRoles: {
    path: (guild_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getEmoji: {
    path: (guild_id: string, emoji_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getChannelPins: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getChannel: {
    path: (channel_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  getClientEmojis: {
    path: (client_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
  postAddClientEmoji: {
    path: (client_id: string) => string;
    method: string;
    majorParams: number[];
    mockResponse: () => any;
  };
};
export default _default;
