import type {
  Client as ClientType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import { Snowflake } from "discord-api-types/globals";
export default function getGuild(
  client: ClientType,
  guildId: Snowflake,
): GuildType | null;
