import type {
  Client as ClientType,
  Member as MemberType,
} from "#typings/index.d.ts";
import { Snowflake } from "discord-api-types/globals";
export default function getMember(
  client: ClientType,
  guildId: Snowflake,
  memberId: Snowflake,
): MemberType | null;
