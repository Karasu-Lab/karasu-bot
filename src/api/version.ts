import { Elysia } from "elysia";
import { env } from "../env";

export const version = new Elysia().get("/version", () => ({
  version: env.COMMIT_HASH,
}));
