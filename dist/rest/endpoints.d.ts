declare namespace _default {
    namespace getGatewayBot {
        function path(): string;
        let method: string;
        let majorParams: any[];
        function mockResponse({ params }?: {}): any;
    }
    namespace postCreateMessage {
        export function path_1(channel_id: any): string;
        export { path_1 as path };
        let method_1: string;
        export { method_1 as method };
        let majorParams_1: number[];
        export { majorParams_1 as majorParams };
        export function mockResponse_1({ params, request }?: {}): Promise<any>;
        export { mockResponse_1 as mockResponse };
    }
    namespace patchEditMessage {
        export function path_2(channel_id: any, message_id: any): string;
        export { path_2 as path };
        let method_2: string;
        export { method_2 as method };
        let majorParams_2: number[];
        export { majorParams_2 as majorParams };
        export function mockResponse_2({ params, request }?: {}): Promise<any>;
        export { mockResponse_2 as mockResponse };
    }
    namespace putCreateGuildBan {
        export function path_3(guild_id: any, user_id: any): string;
        export { path_3 as path };
        let method_3: string;
        export { method_3 as method };
        export let useHeaders: string[];
        let majorParams_3: number[];
        export { majorParams_3 as majorParams };
        export function mockResponse_3({ params }?: {}): any;
        export { mockResponse_3 as mockResponse };
    }
    namespace getGuildAuditLog {
        export function path_4(guild_id: any): string;
        export { path_4 as path };
        let method_4: string;
        export { method_4 as method };
        let majorParams_4: number[];
        export { majorParams_4 as majorParams };
        export function mockResponse_4({ params }?: {}): any;
        export { mockResponse_4 as mockResponse };
    }
    namespace getChannelMessages {
        export function path_5(channel_id: any): string;
        export { path_5 as path };
        let method_5: string;
        export { method_5 as method };
        let majorParams_5: number[];
        export { majorParams_5 as majorParams };
        export function mockResponse_5({ params }?: {}): any;
        export { mockResponse_5 as mockResponse };
    }
    namespace getChannelMessage {
        export function path_6(channel_id: any, message_id: any): string;
        export { path_6 as path };
        let method_6: string;
        export { method_6 as method };
        let majorParams_6: number[];
        export { majorParams_6 as majorParams };
        export function mockResponse_6({ params }?: {}): any;
        export { mockResponse_6 as mockResponse };
    }
    namespace getGuildInvites {
        export function path_7(guild_id: any): string;
        export { path_7 as path };
        let method_7: string;
        export { method_7 as method };
        let majorParams_7: number[];
        export { majorParams_7 as majorParams };
        export function mockResponse_7({ params }?: {}): any;
        export { mockResponse_7 as mockResponse };
    }
    namespace postInteractionResponse {
        export function path_8(interaction_id: any, interaction_token: any): string;
        export { path_8 as path };
        let method_8: string;
        export { method_8 as method };
        let majorParams_8: any[];
        export { majorParams_8 as majorParams };
        export function mockResponse_8({ params }?: {}): any;
        export { mockResponse_8 as mockResponse };
    }
    namespace patchOriginalInteractionResponse {
        export function path_9(interaction_id: any, interaction_token: any): string;
        export { path_9 as path };
        let method_9: string;
        export { method_9 as method };
        let majorParams_9: number[];
        export { majorParams_9 as majorParams };
        export function mockResponse_9({ params }?: {}): any;
        export { mockResponse_9 as mockResponse };
    }
    namespace postBulkDeleteMessages {
        export function path_10(channel_id: any): string;
        export { path_10 as path };
        let method_10: string;
        export { method_10 as method };
        let useHeaders_1: string[];
        export { useHeaders_1 as useHeaders };
        let majorParams_10: number[];
        export { majorParams_10 as majorParams };
        export function mockResponse_10({ params }?: {}): any;
        export { mockResponse_10 as mockResponse };
    }
    namespace postExecuteWebhook {
        export function path_11(webhook_id: any, webhook_token: any): string;
        export { path_11 as path };
        let method_11: string;
        export { method_11 as method };
        let majorParams_11: number[];
        export { majorParams_11 as majorParams };
        export function mockResponse_11({ params }?: {}): any;
        export { mockResponse_11 as mockResponse };
    }
    namespace getGuildChannels {
        export function path_12(guild_id: any): string;
        export { path_12 as path };
        let method_12: string;
        export { method_12 as method };
        let majorParams_12: number[];
        export { majorParams_12 as majorParams };
        export function mockResponse_12({ params }?: {}): any;
        export { mockResponse_12 as mockResponse };
    }
    namespace postFollowNewsChannel {
        export function path_13(channel_id: any): string;
        export { path_13 as path };
        let method_13: string;
        export { method_13 as method };
        let majorParams_13: number[];
        export { majorParams_13 as majorParams };
        export function mockResponse_13({ params }?: {}): any;
        export { mockResponse_13 as mockResponse };
    }
    namespace getSearchGuildMembers {
        export function path_14(guild_id: any): string;
        export { path_14 as path };
        let method_14: string;
        export { method_14 as method };
        let majorParams_14: number[];
        export { majorParams_14 as majorParams };
        export function mockResponse_14({ params }?: {}): any;
        export { mockResponse_14 as mockResponse };
    }
    namespace getGuildMember {
        export function path_15(guild_id: any, user_id: any): string;
        export { path_15 as path };
        let method_15: string;
        export { method_15 as method };
        let majorParams_15: number[];
        export { majorParams_15 as majorParams };
        export function mockResponse_15({ params }?: {}): any;
        export { mockResponse_15 as mockResponse };
    }
    namespace patchGuildMember {
        export function path_16(guild_id: any, user_id: any): string;
        export { path_16 as path };
        let method_16: string;
        export { method_16 as method };
        let useHeaders_2: string[];
        export { useHeaders_2 as useHeaders };
        let majorParams_16: number[];
        export { majorParams_16 as majorParams };
        export function mockResponse_16({ params }?: {}): any;
        export { mockResponse_16 as mockResponse };
    }
    namespace getGuildBan {
        export function path_17(guild_id: any, user_id: any): string;
        export { path_17 as path };
        let method_17: string;
        export { method_17 as method };
        let majorParams_17: number[];
        export { majorParams_17 as majorParams };
        export function mockResponse_17({ params }?: {}): any;
        export { mockResponse_17 as mockResponse };
    }
    namespace deleteChannelMessage {
        export function path_18(channel_id: any, message_id: any): string;
        export { path_18 as path };
        let method_18: string;
        export { method_18 as method };
        let useHeaders_3: string[];
        export { useHeaders_3 as useHeaders };
        let majorParams_18: number[];
        export { majorParams_18 as majorParams };
        export function mockResponse_18({ params }?: {}): any;
        export { mockResponse_18 as mockResponse };
    }
    namespace deleteGuildMember {
        export function path_19(guild_id: any, user_id: any): string;
        export { path_19 as path };
        let method_19: string;
        export { method_19 as method };
        let useHeaders_4: string[];
        export { useHeaders_4 as useHeaders };
        let majorParams_19: number[];
        export { majorParams_19 as majorParams };
        export function mockResponse_19({ params }?: {}): any;
        export { mockResponse_19 as mockResponse };
    }
    namespace deleteRemoveGuildBan {
        export function path_20(guild_id: any, user_id: any): string;
        export { path_20 as path };
        let method_20: string;
        export { method_20 as method };
        let useHeaders_5: string[];
        export { useHeaders_5 as useHeaders };
        let majorParams_20: number[];
        export { majorParams_20 as majorParams };
        export function mockResponse_20({ params }?: {}): any;
        export { mockResponse_20 as mockResponse };
    }
    namespace putAddGuildMemberRole {
        export function path_21(guild_id: any, user_id: any, role_id: any): string;
        export { path_21 as path };
        let method_21: string;
        export { method_21 as method };
        let useHeaders_6: string[];
        export { useHeaders_6 as useHeaders };
        let majorParams_21: number[];
        export { majorParams_21 as majorParams };
        export function mockResponse_21({ params }?: {}): any;
        export { mockResponse_21 as mockResponse };
    }
    namespace deleteRemoveMemberRole {
        export function path_22(guild_id: any, user_id: any, role_id: any): string;
        export { path_22 as path };
        let method_22: string;
        export { method_22 as method };
        let useHeaders_7: string[];
        export { useHeaders_7 as useHeaders };
        let majorParams_22: number[];
        export { majorParams_22 as majorParams };
        export function mockResponse_22({ params }?: {}): any;
        export { mockResponse_22 as mockResponse };
    }
    namespace getUser {
        export function path_23(user_id: any): string;
        export { path_23 as path };
        let method_23: string;
        export { method_23 as method };
        let majorParams_23: any[];
        export { majorParams_23 as majorParams };
        export function mockResponse_23({ params }?: {}): any;
        export { mockResponse_23 as mockResponse };
    }
    namespace getChannelWebhooks {
        export function path_24(channel_id: any): string;
        export { path_24 as path };
        let method_24: string;
        export { method_24 as method };
        let majorParams_24: number[];
        export { majorParams_24 as majorParams };
        export function mockResponse_24({ params }?: {}): any;
        export { mockResponse_24 as mockResponse };
    }
    namespace getWebhook {
        export function path_25(webhook_id: any): string;
        export { path_25 as path };
        let method_25: string;
        export { method_25 as method };
        let majorParams_25: any[];
        export { majorParams_25 as majorParams };
        export function mockResponse_25({ params }?: {}): any;
        export { mockResponse_25 as mockResponse };
    }
    namespace deleteWebhook {
        export function path_26(webhook_id: any): string;
        export { path_26 as path };
        let method_26: string;
        export { method_26 as method };
        let majorParams_26: number[];
        export { majorParams_26 as majorParams };
        export function mockResponse_26({ params }?: {}): any;
        export { mockResponse_26 as mockResponse };
    }
    namespace postCreateWebhook {
        export function path_27(channel_id: any): string;
        export { path_27 as path };
        let method_27: string;
        export { method_27 as method };
        let majorParams_27: number[];
        export { majorParams_27 as majorParams };
        export function mockResponse_27({ params }?: {}): any;
        export { mockResponse_27 as mockResponse };
    }
    namespace patchModifyWebhook {
        export function path_28(webhook_id: any): string;
        export { path_28 as path };
        let method_28: string;
        export { method_28 as method };
        let majorParams_28: number[];
        export { majorParams_28 as majorParams };
        export function mockResponse_28({ params }?: {}): any;
        export { mockResponse_28 as mockResponse };
    }
    namespace deleteLeaveGuild {
        export function path_29(guild_id: any): string;
        export { path_29 as path };
        let method_29: string;
        export { method_29 as method };
        let majorParams_29: number[];
        export { majorParams_29 as majorParams };
        export function mockResponse_29({ params }?: {}): any;
        export { mockResponse_29 as mockResponse };
    }
    namespace getListGuildScheduledEvents {
        export function path_30(guild_id: any): string;
        export { path_30 as path };
        let method_30: string;
        export { method_30 as method };
        let majorParams_30: number[];
        export { majorParams_30 as majorParams };
        export function mockResponse_30({ params }?: {}): any;
        export { mockResponse_30 as mockResponse };
    }
    namespace getGuildScheduledEvent {
        export function path_31(guild_id: any, scheduled_event_id: any): string;
        export { path_31 as path };
        let method_31: string;
        export { method_31 as method };
        let majorParams_31: number[];
        export { majorParams_31 as majorParams };
        export function mockResponse_31({ params }?: {}): any;
        export { mockResponse_31 as mockResponse };
    }
    namespace bulkOverwriteGlobalApplicationCommands {
        export function path_32(application_id: any): string;
        export { path_32 as path };
        let method_32: string;
        export { method_32 as method };
        let majorParams_32: number[];
        export { majorParams_32 as majorParams };
        export function mockResponse_32({ params }?: {}): any;
        export { mockResponse_32 as mockResponse };
    }
    namespace getRoles {
        export function path_33(guild_id: any): string;
        export { path_33 as path };
        let method_33: string;
        export { method_33 as method };
        let majorParams_33: number[];
        export { majorParams_33 as majorParams };
        export function mockResponse_33({ params }?: {}): any;
        export { mockResponse_33 as mockResponse };
    }
    namespace getEmoji {
        export function path_34(guild_id: any, emoji_id: any): string;
        export { path_34 as path };
        let method_34: string;
        export { method_34 as method };
        let majorParams_34: number[];
        export { majorParams_34 as majorParams };
        export function mockResponse_34({ params }?: {}): any;
        export { mockResponse_34 as mockResponse };
    }
    namespace getChannelPins {
        export function path_35(channel_id: any): string;
        export { path_35 as path };
        let method_35: string;
        export { method_35 as method };
        let majorParams_35: number[];
        export { majorParams_35 as majorParams };
        export function mockResponse_35({ params }?: {}): any;
        export { mockResponse_35 as mockResponse };
    }
    namespace getChannel {
        export function path_36(channel_id: any): string;
        export { path_36 as path };
        let method_36: string;
        export { method_36 as method };
        let majorParams_36: number[];
        export { majorParams_36 as majorParams };
        export function mockResponse_36({ params }?: {}): any;
        export { mockResponse_36 as mockResponse };
    }
}
export default _default;
//# sourceMappingURL=endpoints.d.ts.map