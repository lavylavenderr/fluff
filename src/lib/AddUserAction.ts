import { container } from "@sapphire/framework";

export async function addUserAction(action: string, reciever: string) {
  const actionList = [
    "bark",
    "bite",
    "boop",
    "hug",
    "kiss",
    "lick",
    "meow",
    "nuzzle",
    "pet",
    "poke",
    "shoot",
    "slap",
    "spank",
  ];

  if (!actionList.includes(action))
    throw new Error(`Invalid action: ${action}`);

  await container.prisma.user.upsert({
    where: {
      discordId: reciever,
    },
    update: {},
    create: {
      discordId: reciever,
    },
  });

  await container.prisma.action.create({
    data: {
      type: action,
      discordId: reciever,
    },
  });
}
