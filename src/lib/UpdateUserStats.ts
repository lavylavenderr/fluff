import { container } from "@sapphire/framework";

export async function updateUserStatistics(userId: string, totalCmds: number) {
  const user = await container.prisma.user.findUnique({
    where: {
      discordId: userId,
    },
  });

  await container.prisma.user.update({
    where: {
      discordId: userId
    },
    data: {
      totalUsage: user!.totalUsage + totalCmds
    }
  })
}
