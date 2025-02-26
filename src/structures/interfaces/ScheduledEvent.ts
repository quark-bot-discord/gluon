import {
  ISO8601Timestamp,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface ScheduledEventType {
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly name: string;
  readonly creatorId: Snowflake | null;
  readonly creator: User | null;
  readonly description: string;
  readonly _originalImageHash: string | null;
  readonly displayImageURL: string | null;
  readonly entityType: keyof typeof ScheduledEventRawEntityTypes;
  readonly status: keyof typeof ScheduledEventRawStatuses;
  readonly guild: GuildType | null;
  readonly scheduledStartTime: UnixTimestamp;
  readonly scheduledEndTime: UnixTimestamp | null;
  readonly userCount: number;
  readonly location: string | null;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ):
    | ScheduledEventCacheJSON
    | ScheduledEventStorageJSON
    | ScheduledEventDiscordJSON;
}

export interface ScheduledEventStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: User | null;
  scheduled_start_time: UnixMillisecondsTimestamp;
  scheduled_end_time: UnixMillisecondsTimestamp | null;
  image: string | null;
  user_count: number;
  entity_type: ScheduledEventRawEntityTypes;
  status: ScheduledEventRawStatuses;
  entity_metadata: {
    location: string | null;
  };
}

export interface ScheduledEventCacheJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: User | null;
  scheduled_start_time: UnixMillisecondsTimestamp;
  scheduled_end_time: UnixMillisecondsTimestamp | null;
  image: string | null;
  user_count: number;
  entity_type: ScheduledEventRawEntityTypes;
  status: ScheduledEventRawStatuses;
  entity_metadata: {
    location: string | null;
  };
}

export interface ScheduledEventDiscordJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  description?: string;
  creator_id?: Snowflake;
  creator: User | null;
  scheduled_start_time: UnixMillisecondsTimestamp;
  scheduled_end_time: UnixMillisecondsTimestamp | null;
  image: string | null;
  user_count: number;
  entity_type: ScheduledEventRawEntityTypes;
  status: ScheduledEventRawStatuses;
  entity_metadata: {
    location: string | null;
  };
}

export interface ScheduledEventRaw {
  id: Snowflake;
  guild_id: Snowflake;
  channel_id: Snowflake | null;
  creator_id?: Snowflake | null;
  name: string;
  description?: string | null;
  scheduled_start_time: ISO8601Timestamp;
  scheduled_end_time: ISO8601Timestamp | null;
  privacy_level: ScheduledEventRawPrivacyLevels;
  status: ScheduledEventRawStatuses;
  entity_type: ScheduledEventRawEntityTypes;
  entity_id: Snowflake | null;
  entity_metadata: {
    location?: string;
  } | null;
  creator?: any;
  user_count?: number;
  image?: string | null;
  recurrence_rule: ScheduledEventRawRecurrenceRule | null;
}

export enum ScheduledEventRawEntityTypes {
  STAGE_INSTANCE = 1,
  VOICE = 2,
  EXTERNAL = 3,
}

export enum ScheduledEventRawStatuses {
  SCHEDULED = 1,
  ACTIVE = 2,
  COMPLETED = 3,
  CANCELED = 4,
}

export enum ScheduledEventRawPrivacyLevels {
  GUILD_ONLY = 2,
}

export interface ScheduledEventRawRecurrenceRule {
  start: ISO8601Timestamp;
  end: ISO8601Timestamp | null;
  frequency: ScheduledEventRawRecurrenceRuleFrequency;
  interval: number;
  by_weekday: ScheduledEventRawRecurrenceRuleWeekday[] | null;
  by_n_weekday: ScheduledEventRawRecurrenceRuleNWeekday[] | null;
  by_month: ScheduledEventRawRecurrenceRuleMonth[] | null;
  by_month_day: number[] | null;
  by_year_day: number[] | null;
  count: number | null;
}

export enum ScheduledEventRawRecurrenceRuleFrequency {
  YEARLY = 0,
  MONTHLY = 1,
  WEEKLY = 2,
  DAILY = 3,
}

export enum ScheduledEventRawRecurrenceRuleWeekday {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export interface ScheduledEventRawRecurrenceRuleNWeekday {
  n: number;
  weekday: ScheduledEventRawRecurrenceRuleWeekday;
}

export enum ScheduledEventRawRecurrenceRuleMonth {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}
