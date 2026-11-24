import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { env } from "./env";
import { pipeline } from "./pipeline";
import { healthCheck } from "./api/v1/health-check";
import { version } from "./api/version";
import { startBot } from "./bot/bot";

new Elysia({ adapter: node() })
  .use(pipeline)
  .group("/api", (api) =>
    api.use(version).group("/v1", (v1) => v1.use(healthCheck)),
  )
  .listen(env.PORT);

console.log(`Listening on http://localhost:${env.PORT}`);

await startBot();
