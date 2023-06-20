import { container } from "@sapphire/pieces";
import { type Client } from "discord.js";

export async function updateBotStatistics(
  client: Client,
  newInteractions?: number
) {
  const [guilds, users] = await Promise.all([
    client.shard?.broadcastEval((client) => client.guilds.cache.size),
    client.shard?.broadcastEval((client) => client.users.cache.size),
  ]);

  const guildCount = guilds?.reduce((sum, count) => sum + count) || client.guilds.cache.size;
  const userCount = users?.reduce((sum, count) => sum + count) || client.users.cache.size;
  const latestStats = await container.prisma.botStats.findFirst({
    orderBy: { id: "desc" },
  });

  await container.prisma.botStats.create({
    data: {
      guilds: guildCount,
      users: userCount,
      totalCmds: latestStats?.totalCmds || 0 + newInteractions! || 0,
    },
  });
}
