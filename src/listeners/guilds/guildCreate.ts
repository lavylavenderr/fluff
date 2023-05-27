import { Listener } from "@sapphire/framework";
import { type Guild } from "discord.js";
import { prisma } from "../../index";

export class GuildCreateListener extends Listener {
  public async run(guild: Guild) {
    const { id, name } = guild;

    await prisma.guild
      .create({
        data: { guildId: id },
      })
      .catch(() => {
        this.container.logger.info(
          `Failed to create record for added guild: ${name} (${id})`
        );
      })

    // Debugging
    this.container.logger.info(`Added to guild: ${name} (${id})`);
  }
}
