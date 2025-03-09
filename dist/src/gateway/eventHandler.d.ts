import {
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
} from "#typings/discord.js";
import type { Client as ClientType } from "typings/index.d.ts";
declare class EventHandler {
  #private;
  constructor(client: ClientType, ws: any);
  READY(data: GatewayReadyDispatchData): void;
  RESUMED(data: GatewayResumeData): void;
  GUILD_CREATE(data: GatewayGuildCreateDispatchData): void;
  GUILD_UPDATE(data: GatewayGuildUpdateDispatchData): void;
  GUILD_DELETE(data: GatewayGuildDeleteDispatchData): void;
  GUILD_ROLE_CREATE(data: GatewayGuildRoleCreateDispatchData): void;
  GUILD_ROLE_UPDATE(data: GatewayGuildRoleUpdateDispatchData): void;
  GUILD_ROLE_DELETE(data: GatewayGuildRoleDeleteDispatchData): void;
  CHANNEL_CREATE(data: GatewayChannelCreateDispatchData): void;
  CHANNEL_UPDATE(data: GatewayChannelUpdateDispatchData): void;
  CHANNEL_DELETE(data: GatewayChannelDeleteDispatchData): void;
  CHANNEL_PINS_UPDATE(data: GatewayChannelPinsUpdateDispatchData): void;
  THREAD_CREATE(data: GatewayThreadCreateDispatchData): void;
  THREAD_UPDATE(data: GatewayThreadUpdateDispatchData): void;
  THREAD_DELETE(data: GatewayThreadDeleteDispatchData): void;
  THREAD_LIST_SYNC(data: GatewayThreadListSyncDispatchData): void;
  GUILD_MEMBER_ADD(data: GatewayGuildMemberAddDispatchData): void;
  GUILD_MEMBER_REMOVE(data: GatewayGuildMemberRemoveDispatchData): void;
  GUILD_MEMBER_UPDATE(data: GatewayGuildMemberUpdateDispatchData): void;
  GUILD_MEMBERS_CHUNK(data: GatewayGuildMembersChunkDispatchData): void;
  GUILD_BAN_ADD(data: GatewayGuildBanAddDispatchData): void;
  GUILD_BAN_REMOVE(data: GatewayGuildBanRemoveDispatchData): void;
  INVITE_CREATE(data: GatewayInviteCreateDispatchData): void;
  INVITE_DELETE(data: GatewayInviteDeleteDispatchData): void;
  VOICE_STATE_UPDATE(data: GatewayVoiceStateUpdateDispatchData): void;
  MESSAGE_CREATE(data: GatewayMessageCreateDispatchData): void;
  MESSAGE_UPDATE(data: GatewayMessageUpdateDispatchData): void;
  MESSAGE_DELETE(data: GatewayMessageDeleteDispatchData): void;
  MESSAGE_DELETE_BULK(data: GatewayMessageDeleteBulkDispatchData): void;
  INTERACTION_CREATE(data: GatewayInteractionCreateDispatchData): void;
  GUILD_AUDIT_LOG_ENTRY_CREATE(
    data: GatewayGuildAuditLogEntryCreateDispatchData,
  ): void;
  ENTITLEMENT_CREATE(data: GatewayEntitlementCreateDispatchData): void;
  ENTITLEMENT_UPDATE(data: GatewayEntitlementUpdateDispatchData): void;
  ENTITLEMENT_DELETE(data: GatewayEntitlementDeleteDispatchData): void;
  GUILD_SCHEDULED_EVENT_CREATE(
    data: GatewayGuildScheduledEventCreateDispatchData,
  ): void;
  GUILD_SCHEDULED_EVENT_UPDATE(
    data: GatewayGuildScheduledEventUpdateDispatchData,
  ): void;
  GUILD_SCHEDULED_EVENT_DELETE(
    data: GatewayGuildScheduledEventDeleteDispatchData,
  ): void;
  GUILD_SCHEDULED_EVENT_USER_ADD(
    data: GatewayGuildScheduledEventUserAddDispatchData,
  ): void;
  GUILD_SCHEDULED_EVENT_USER_REMOVE(
    data: GatewayGuildScheduledEventUserRemoveDispatchData,
  ): void;
  AUTO_MODERATION_RULE_CREATE(
    data: GatewayAutoModerationRuleCreateDispatchData,
  ): void;
  AUTO_MODERATION_RULE_UPDATE(
    data: GatewayAutoModerationRuleUpdateDispatchData,
  ): void;
  AUTO_MODERATION_RULE_DELETE(
    data: GatewayAutoModerationRuleDeleteDispatchData,
  ): void;
  AUTO_MODERATION_ACTION_EXECUTION(
    data: GatewayAutoModerationActionExecutionDispatchData,
  ): void;
  GUILD_EMOJIS_UPDATE(data: GatewayGuildEmojisUpdateDispatchData): void;
  WEBHOOKS_UPDATE(data: GatewayWebhooksUpdateDispatchData): void;
  MESSAGE_POLL_VOTE_ADD(data: GatewayMessagePollVoteDispatchData): void;
  MESSAGE_POLL_VOTE_REMOVE(data: GatewayMessagePollVoteDispatchData): void;
  MESSAGE_REACTION_ADD(data: GatewayMessageReactionAddDispatchData): void;
  MESSAGE_REACTION_REMOVE(data: GatewayMessageReactionRemoveDispatchData): void;
}
export default EventHandler;
