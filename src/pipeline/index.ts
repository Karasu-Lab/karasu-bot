import { Elysia } from "elysia";
import { toEnvelope } from "./envelope";

const errorBody = (code: string | number, error: unknown) => ({
  code,
  message: error instanceof Error ? error.message : String(error),
});

/**
 * Error pipeline runs first and turns any error into a raw body with a status.
 * Global pipeline then wraps every response, including those errors.
 */
export const pipeline = new Elysia({ name: "pipeline" })
  .onError({ as: "global" }, ({ code, error, set }) => {
    if (code === "NOT_FOUND") set.status = 404;
    else if (code === "VALIDATION") set.status = 422;
    else if (code === "PARSE") set.status = 400;
    else if (typeof set.status !== "number" || set.status < 400)
      set.status = 500;

    return errorBody(code, error);
  })
  .mapResponse({ as: "global" }, ({ response, set }) => {
    if (response instanceof Response) return response;

    const status = typeof set.status === "number" ? set.status : 200;
    const headers = new Headers(set.headers as Record<string, string>);
    headers.set("content-type", "application/json; charset=utf-8");

    return new Response(JSON.stringify(toEnvelope(response, status >= 400)), {
      status,
      headers,
    });
  });
