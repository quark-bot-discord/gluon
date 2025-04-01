/* of course, stick to this format of "methodPath1Path2" */
/* the arguments passed to the path() function should simply become the parameters of the request */

const HttpResponse =
  process.env.NODE_ENV === "testing" ? (await import("msw")).HttpResponse : {};
import { TEST_DATA } from "../testData.js";

/* for example, (guild_id) => { return `/guilds/${guild_id}` } */
export default {
  getGatewayBot: {
    path: () => {
      return "/gateway/bot";
    },
    method: "GET",
    majorParams: [],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json({
        url: "wss://gateway.discord.gg",
        shards: 1,
        session_start_limit: {
          total: 1000,
          remaining: 1000,
          reset_after: 14400000,
          max_concurrency: 1,
        },
      });
    },
  },
  postCreateMessage: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/messages`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: async ({ request }: { request: Request }) => {
      if (request.headers.get("content-type") !== "application/json")
        await request.formData();
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.MESSAGE);
    },
  },
  patchEditMessage: {
    path: (channel_id: string, message_id: string) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "PATCH",
    majorParams: [0],
    mockResponse: async ({ request }: { request: Request }) => {
      if (request.headers.get("content-type") !== "application/json")
        await request.formData();
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.MESSAGE);
    },
  },
  putCreateGuildBan: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "PUT",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  getGuildAuditLog: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/audit-logs`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json({ audit_log_entries: [TEST_DATA.AUDIT_LOG] });
    },
  },
  getChannelMessages: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/messages`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.MESSAGE]);
    },
  },
  getChannelMessage: {
    path: (channel_id: string, message_id: string) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.MESSAGE);
    },
  },
  getGuildInvites: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/invites`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.INVITE]);
    },
  },
  postInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => {
      return `/interactions/${interaction_id}/${interaction_token}/callback`;
    },
    method: "POST",
    majorParams: [],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  patchOriginalInteractionResponse: {
    path: (interaction_id: string, interaction_token: string) => {
      return `/webhooks/${interaction_id}/${interaction_token}/messages/@original`;
    },
    method: "PATCH",
    majorParams: [0, 1],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  deleteOriginalInteractionResponse: {
    path: (application_id: string, interaction_token: string) => {
      return `/webhooks/${application_id}/${interaction_token}/messages/@original`;
    },
    method: "DELETE",
    majorParams: [0, 1],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  postBulkDeleteMessages: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/messages/bulk-delete`;
    },
    method: "POST",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  postExecuteWebhook: {
    path: (webhook_id: string, webhook_token: string) => {
      return `/webhooks/${webhook_id}/${webhook_token}`;
    },
    method: "POST",
    majorParams: [0, 1],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  getGuildChannels: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/channels`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([
        TEST_DATA.TEXT_CHANNEL,
        TEST_DATA.CATEGORY_CHANNEL,
        TEST_DATA.VOICE_CHANNEL,
        TEST_DATA.TEXT_CHANNEL_2,
      ]);
    },
  },
  postFollowNewsChannel: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/followers`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.FOLLOWED_CHANNEL);
    },
  },
  getSearchGuildMembers: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/members/search`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.MEMBER]);
    },
  },
  getGuildMember: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.MEMBER);
    },
  },
  patchGuildMember: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "PATCH",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.MEMBER);
    },
  },
  getGuildBan: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.BAN);
    },
  },
  deleteChannelMessage: {
    path: (channel_id: string, message_id: string) => {
      return `/channels/${channel_id}/messages/${message_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  deleteGuildMember: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/members/${user_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  deleteRemoveGuildBan: {
    path: (guild_id: string, user_id: string) => {
      return `/guilds/${guild_id}/bans/${user_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  putAddGuildMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => {
      return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
    },
    method: "PUT",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  deleteRemoveMemberRole: {
    path: (guild_id: string, user_id: string, role_id: string) => {
      return `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`;
    },
    method: "DELETE",
    useHeaders: ["X-Audit-Log-Reason"],
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  getUser: {
    path: (user_id: string) => {
      return `/users/${user_id}`;
    },
    method: "GET",
    majorParams: [],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.USER);
    },
  },
  getChannelWebhooks: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/webhooks`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.WEBHOOK]);
    },
  },
  getWebhook: {
    path: (webhook_id: string) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "GET",
    majorParams: [],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.WEBHOOK);
    },
  },
  deleteWebhook: {
    path: (webhook_id: string) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "DELETE",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  postCreateWebhook: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/webhooks`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.WEBHOOK);
    },
  },
  patchModifyWebhook: {
    path: (webhook_id: string) => {
      return `/webhooks/${webhook_id}`;
    },
    method: "PATCH",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.WEBHOOK);
    },
  },
  deleteLeaveGuild: {
    path: (guild_id: string) => {
      return `/users/@me/guilds/${guild_id}`;
    },
    method: "DELETE",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2351): This expression is not constructable.
      return new HttpResponse(undefined, { status: 204 });
    },
  },
  getListGuildScheduledEvents: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/scheduled-events`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.SCHEDULED_EVENT]);
    },
  },
  getGuildScheduledEvent: {
    path: (guild_id: string, scheduled_event_id: string) => {
      return `/guilds/${guild_id}/scheduled-events/${scheduled_event_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.SCHEDULED_EVENT);
    },
  },
  bulkOverwriteGlobalApplicationCommands: {
    path: (application_id: string) => {
      return `/applications/${application_id}/commands`;
    },
    method: "PUT",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.SLASH_COMMAND]);
    },
  },
  getRoles: {
    path: (guild_id: string) => {
      return `/guilds/${guild_id}/roles`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.ROLE_ADMIN]);
    },
  },
  getEmoji: {
    path: (guild_id: string, emoji_id: string) => {
      return `/guilds/${guild_id}/emojis/${emoji_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.EMOJI);
    },
  },
  getChannelPins: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}/pins`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.MESSAGE]);
    },
  },
  getChannel: {
    path: (channel_id: string) => {
      return `/channels/${channel_id}`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.TEXT_CHANNEL);
    },
  },
  getClientEmojis: {
    path: (client_id: string) => {
      return `/applications/${client_id}/emojis`;
    },
    method: "GET",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json([TEST_DATA.EMOJI]);
    },
  },
  postAddClientEmoji: {
    path: (client_id: string) => {
      return `/applications/${client_id}/emojis`;
    },
    method: "POST",
    majorParams: [0],
    mockResponse: () => {
      // @ts-expect-error TS(2339): Property 'json' does not exist on type '{}'.
      return HttpResponse.json(TEST_DATA.EMOJI);
    },
  },
};
