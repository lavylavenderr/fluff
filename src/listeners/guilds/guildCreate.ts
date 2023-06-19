import { Listener } from "@sapphire/framework";
import { type Guild } from "discord.js";
import { container } from "@sapphire/framework";

export class GuildCreateListener extends Listener {
  public async run(guild: Guild) {
    const { id, name } = guild;

    await container.prisma.guild
      .create({
        data: { guildId: id },
      })
      .catch(() => {
        this.container.logger.info(
          `Failed to create record for added guild: ${name} (${id})`
        );
      });

    // Debugging
    this.container.logger.info(`Added to guild: ${name} (${id})`);
  }
}
