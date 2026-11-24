import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { env } from "./env";
import { pipeline } from "./pipeline";
import { health } from "./routes/health";
import { version } from "./routes/version";

new Elysia({ adapter: node() })
  .use(pipeline)
  .group("/api", (api) => api.use(version).group("/v1", (v1) => v1.use(health)))
  .listen(env.PORT);

console.log(`Listening on http://localhost:${env.PORT}`);
