// Importing Crap
import { config } from "dotenv";
import { cyclePresence } from "./lib/CyclePresence";
import { BotClient } from "./lib/BotClient";
import { updateBotStatistics } from "./lib/UpdateBotStats";

const client = new BotClient();

config();

(async () => {
  try {
    client.logger.info("Logging in...");
    await client.login();
    await cyclePresence(client);
    updateBotStatistics(client);
    setInterval(() => cyclePresence(client), 25000);
  } catch (err) {
    client.logger.fatal(err);
    client.destroy();
    process.exit(1);
  }
})();
