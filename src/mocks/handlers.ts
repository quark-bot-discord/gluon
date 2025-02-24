import { http } from "msw";
import endpoints from "../rest/endpoints.js";
import { API_BASE_URL, VERSION } from "../constants.js";

const handlers = Array.from(Object.values(endpoints)).map((endpoint) => {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return http[endpoint.method.toLowerCase()](
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 0.
    `${API_BASE_URL}/v${VERSION}${endpoint.path().split("undefined").join("*")}`,
    endpoint.mockResponse,
  );
});

export { handlers };
