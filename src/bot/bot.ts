import { createServer } from "node:http";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { env } from "../env";

export const startBot = async () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, (ready) => {
    console.log(`Discord bot logged in as ${ready.user.tag}`);
  });

  createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ready: client.isReady() }));
  }).listen(env.BOT_PORT, "127.0.0.1", () => {
    console.log(`Bot internal server on http://127.0.0.1:${env.BOT_PORT}`);
  });

  await client.login(env.BOT_TOKEN);
};
