import { http } from "msw";
import endpoints from "../rest/endpoints.js";
import { API_BASE_URL, VERSION } from "../constants.js";

const handlers = Array.from(Object.values(endpoints)).map((endpoint) => {
  return http[endpoint.method.toLowerCase()](
    `${API_BASE_URL}/v${VERSION}${endpoint.path().split("undefined").join("*")}`,
    endpoint.mockResponse,
  );
});
console.log(handlers);
export { handlers };
