import { createServer } from "node:http";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { loadBotEnv } from "../env";

const botEnv = loadBotEnv();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (ready) => {
  console.log(`Discord bot logged in as ${ready.user.tag}`);
});

createServer((_req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ ready: client.isReady() }));
}).listen(botEnv.BOT_PORT, "127.0.0.1", () => {
  console.log(`Bot internal server on http://127.0.0.1:${botEnv.BOT_PORT}`);
});

client.login(botEnv.BOT_TOKEN).catch((error) => {
  console.error("Discord bot login failed:", error);
});
