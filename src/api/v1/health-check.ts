import { Elysia } from "elysia";
import { isBotOnline } from "../../bot/bot";

export const healthCheck = new Elysia().get("/health/check", ({ set }) => {
  const online = isBotOnline();
  if (!online) set.status = 503;

  return { status: online ? "healthy" : "unhealthy" };
});
