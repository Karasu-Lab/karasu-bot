import { Elysia } from "elysia";
import { env } from "../env";

export const version = new Elysia({ prefix: "/version" }).get("/", () => ({
  version: env.COMMIT_HASH,
}));
