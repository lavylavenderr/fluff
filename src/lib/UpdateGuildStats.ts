import { container } from "@sapphire/pieces";

export async function updateGuildStatistics(
  totalCmds: number,
  guildId: string
) {
  const guild = await container.prisma.guild.findUnique({
    where: {
      guildId,
    },
  });

  if (!guild)
    await container.prisma.guild.create({
      data: {
        guildId,
      },
    });

  await container.prisma.guild.update({
    where: {
      guildId,
    },
    data: {
      totalCmds: totalCmds + guild?.totalCmds! || 0,
    },
  });
}
