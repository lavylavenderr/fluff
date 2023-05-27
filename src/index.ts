// Importing Crap
import "dotenv/config";

import { SapphireClient } from "@sapphire/framework";
import { cyclePresence } from "./lib/CyclePresence";
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";

// Let's get into the nitty gritty (SO SIMPLE!!)
// let's see if it dynamically updates
// come over to a listener with me

const prisma = new PrismaClient();

const client = new SapphireClient({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  loadMessageCommandListeners: true,
  fetchPrefix: async (message) => {
    let prefix = "-";

    const { guild } = message;

    if (guild)
      prefix =
        (
          await prisma.guild
            .findUnique({ where: { guildId: guild.id } })
            .catch(() => undefined)
        )?.prefix ?? "-";

    return prefix;
  },
});

(async () => {
  try {
    client.logger.info("Logging in...");
    await client.login();
    await cyclePresence(client);
  } catch (err) {
    client.logger.fatal(err);
    client.destroy();
    process.exit(1);
  }
})();

export { prisma };
