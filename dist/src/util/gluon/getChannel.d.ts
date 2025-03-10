import type {
  Client as ClientType,
  AllChannels,
} from "../../../typings/index.d.ts";
export default function getChannel(
  client: ClientType,
  guildId: string,
  channelId: string,
): AllChannels | null;
