import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";
export const server = setupServer(...handlers);
//# sourceMappingURL=node.js.map
