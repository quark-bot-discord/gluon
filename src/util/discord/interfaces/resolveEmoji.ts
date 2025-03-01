import { Snowflake } from "src/interfaces/gluon.js";

export interface ResolvedEmoji {
  id: Snowflake | null;
  name: string;
  animated?: boolean;
}
