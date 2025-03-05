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
  if (!client) throw new TypeError("GLUON: Client must be a Client instance.");
  if (typeof guildId !== "string")
    throw new TypeError("GLUON: Guild ID must be a string.");
  if (typeof memberId !== "string")
    throw new TypeError("GLUON: Member ID must be a string.");
  const guild = client.guilds.get(guildId);
  if (!guild) return null;
  return guild.members.get(memberId);
}
