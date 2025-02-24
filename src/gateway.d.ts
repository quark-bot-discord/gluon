export interface Heartbeat {
  op: 1;
  d: number | null;
}

export interface Identify {
  op: 2;
  d: {
    token: string;
    properties: {
      os: string;
      browser: string;
      device: string;
    };
    large_threshold: number;
    shard: number[];
    presence: {
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
  op: 6;
  d: {
    token: string;
    session_id: string;
    seq: number;
  };
}

export interface UpdatePresence {
  op: 3;
  d: {
    since: number | null;
    activities: {
      name: string;
      type: number;
      state?: string;
    }[];
    status: string;
    afk: boolean;
  };
}

export type GatewayPayload = Heartbeat | Identify | Resume | UpdatePresence;

export type PresenceStatus = "online" | "idle" | "dnd" | "invisible";

export type PresenceType = 0 | 1 | 2 | 3 | 4;
