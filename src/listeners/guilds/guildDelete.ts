import { Listener } from "@sapphire/framework";
import { type Guild } from "discord.js";
import { prisma } from "../../index";

export class GuildDeleteListener extends Listener {
  public async run(guild: Guild) {
    const { name, id } = guild;

    await prisma.guild.delete({
      where: { guildId: id },
    }).catch(() => {
        this.container.logger.info(`Failed to delete record for removed guild: ${name} (${id})`)
    });

    // Debugging
    this.container.logger.info(`Removed from guild: ${name} (${id})`);
  }
}
