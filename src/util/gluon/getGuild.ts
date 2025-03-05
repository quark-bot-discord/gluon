import type {
  Client as ClientType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import { Snowflake } from "discord-api-types/globals";

export default function getGuild(
  client: ClientType,
  guildId: Snowflake,
): GuildType | null {
  if (!client) throw new TypeError("GLUON: Client must be a Client instance.");
  if (typeof guildId !== "string")
    throw new TypeError("GLUON: Guild ID must be a string.");
  return client.guilds.get(guildId);
}
