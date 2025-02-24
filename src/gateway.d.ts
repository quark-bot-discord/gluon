export interface Heartbeat {
  op: GatewayOpcode.HEARTBEAT;
  d: number | null;
}

export interface Identify {
  op: GatewayOpcode.IDENTIFY;
  d: {
    token: string;
    compress?: boolean;
    properties: {
      os: string;
      browser: string;
      device: string;
    };
    large_threshold?: number;
    shard?: [number, number];
    presence?: {
      activities: {
        name: string;
        type: number;
      }[];
      status: string;
      since: null;
      afk: boolean;
    };
    intents: number;
  };
}

export interface Resume {
  op: GatewayOpcode.RESUME;
  d: {
    token: string;
    session_id: string;
    seq: number;
  };
}

export interface UpdatePresence {
  op: GatewayOpcode.PRESENCE_UPDATE;
  d: {
    since: number?;
    activities: {
      name: string;
      type: PresenceType;
      state?: string?;
      url?: string?;
    }[];
    status: PresenceStatus;
    afk: boolean;
  };
}

export type GatewayPayload = Heartbeat | Identify | Resume | UpdatePresence;

export type PresenceStatus = "online" | "idle" | "dnd" | "invisible";

export enum PresenceType {
  PLAYING = 0,
  STREAMING = 1,
  LISTENING = 2,
  WATCHING = 3,
  CUSTOM = 4,
  COMPETING = 5,
}

export enum GatewayOpcode {
  DISPATCH = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  PRESENCE_UPDATE = 3,
  VOICE_STATE_UPDATE = 4,
  RESUME = 6,
  RECONNECT = 7,
  REQUEST_GUILD_MEMBERS = 8,
  INVALID_SESSION = 9,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
}
