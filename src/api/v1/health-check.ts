import { Elysia } from "elysia";
import { env } from "../../env";

const isBotOnline = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:${env.BOT_PORT}/`, {
      signal: AbortSignal.timeout(2000),
    });
    const body = (await response.json()) as { ready?: boolean };
    return body.ready === true;
  } catch {
    return false;
  }
};

export const healthCheck = new Elysia().get(
  "/health/check",
  async ({ set }) => {
    const online = await isBotOnline();
    if (!online) set.status = 503;

    return { status: online ? "healthy" : "unhealthy" };
  },
);
