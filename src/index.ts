import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { pipeline } from "./pipeline";
import { health } from "./routes/health";

const port = Number(process.env.PORT ?? 3000);

new Elysia({ adapter: node() })
  .use(pipeline)
  .group("/api/v1", (app) => app.use(health))
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
