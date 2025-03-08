import type {
  Client as ClientType,
  Member as MemberType,
} from "#typings/index.d.ts";
import { Snowflake } from "#typings/discord.js";

export default function getMember(
  client: ClientType,
  guildId: Snowflake,
  memberId: Snowflake,
): MemberType | null {
  const guild = client.guilds.get(guildId);
  if (!guild) {
    throw new Error("GLUON: Guild not found in cache.");
  }
  return guild.members.get(memberId);
}
