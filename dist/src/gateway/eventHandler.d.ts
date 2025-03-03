import {
  GatewayMessageDeleteBulkDispatchData,
  GatewayMessageDeleteDispatchData,
  GatewayMessageReactionRemoveDispatchData,
  GatewayMessageUpdateDispatchData,
} from "discord-api-types/v10";
import { GatewayMessageReactionAddDispatchData } from "discord-api-types/v9";
declare class EventHandler {
  #private;
  constructor(client: any, ws: any);
  READY(data: any): void;
  RESUMED(data: any): void;
  GUILD_CREATE(data: any): void;
  GUILD_UPDATE(data: any): void;
  GUILD_DELETE(data: any): void;
  GUILD_ROLE_CREATE(data: any): void;
  GUILD_ROLE_UPDATE(data: any): void;
  GUILD_ROLE_DELETE(data: any): void;
  CHANNEL_CREATE(data: any): void;
  CHANNEL_UPDATE(data: any): void;
  CHANNEL_DELETE(data: any): void;
  CHANNEL_PINS_UPDATE(data: any): void;
  THREAD_CREATE(data: any): void;
  THREAD_UPDATE(data: any): void;
  THREAD_DELETE(data: any): void;
  THREAD_LIST_SYNC(data: any): void;
  GUILD_MEMBER_ADD(data: any): void;
  GUILD_MEMBER_REMOVE(data: any): void;
  GUILD_MEMBER_UPDATE(data: any): void;
  GUILD_MEMBERS_CHUNK(data: any): void;
  GUILD_BAN_ADD(data: any): void;
  GUILD_BAN_REMOVE(data: any): void;
  INVITE_CREATE(data: any): void;
  INVITE_DELETE(data: any): void;
  VOICE_STATE_UPDATE(data: any): void;
  VOICE_CHANNEL_STATUS_UPDATE(data: any): void;
  MESSAGE_CREATE(data: any): void;
  MESSAGE_UPDATE(data: GatewayMessageUpdateDispatchData): void;
  MESSAGE_DELETE(data: GatewayMessageDeleteDispatchData): void;
  MESSAGE_DELETE_BULK(data: GatewayMessageDeleteBulkDispatchData): void;
  INTERACTION_CREATE(data: any): void;
  GUILD_AUDIT_LOG_ENTRY_CREATE(data: any): void;
  ENTITLEMENT_CREATE(data: any): void;
  ENTITLEMENT_UPDATE(data: any): void;
  ENTITLEMENT_DELETE(data: any): void;
  GUILD_SCHEDULED_EVENT_CREATE(data: any): void;
  GUILD_SCHEDULED_EVENT_UPDATE(data: any): void;
  GUILD_SCHEDULED_EVENT_DELETE(data: any): void;
  GUILD_SCHEDULED_EVENT_USER_ADD(data: any): void;
  GUILD_SCHEDULED_EVENT_USER_REMOVE(data: any): void;
  AUTO_MODERATION_RULE_CREATE(data: any): void;
  AUTO_MODERATION_RULE_UPDATE(data: any): void;
  AUTO_MODERATION_RULE_DELETE(data: any): void;
  AUTO_MODERATION_ACTION_EXECUTION(data: any): void;
  GUILD_EMOJIS_UPDATE(data: any): void;
  WEBHOOKS_UPDATE(data: any): void;
  MESSAGE_POLL_VOTE_ADD(data: any): void;
  MESSAGE_POLL_VOTE_REMOVE(data: any): void;
  MESSAGE_REACTION_ADD(data: GatewayMessageReactionAddDispatchData): void;
  MESSAGE_REACTION_REMOVE(data: GatewayMessageReactionRemoveDispatchData): void;
}
export default EventHandler;
