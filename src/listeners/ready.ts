import { Listener } from "@sapphire/framework";
import { ApplyOptions } from '@sapphire/decorators';
import { ActivityType } from "discord.js";
import chalk from "chalk";
import type { Client } from "discord.js";

@ApplyOptions<Listener.Options>({ once: true })
export class ReadyListener extends Listener {
  public run(client: Client) {
    const { username, id } = client.user!;
    this.container.logger.info(
      chalk.green(`Successfully logged in as ${username} (${id})`)
    );

    client.user?.setPresence({
      activities: [{ name: "Shawn Wasabi", type: ActivityType.Listening }],
      status: "online",
    });
  }
}
