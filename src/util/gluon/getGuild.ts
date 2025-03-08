import type {
  Client as ClientType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import { Snowflake } from "#typings/discord.js";

export default function getGuild(
  client: ClientType,
  guildId: Snowflake,
): GuildType | null {
  return client.guilds.get(guildId);
}
