import { container } from "@sapphire/framework";

export default async function addUser(id: string) {
    await container.prisma.user.upsert({
        where: {
            discordId: id
        },
        update: {},
        create: {
            discordId: id
        }
    })
}