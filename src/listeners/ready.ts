import { ApplyOptions } from '@sapphire/decorators';
import { Listener } from "@sapphire/framework";
import { type Client } from "discord.js";
import chalk from "chalk";

@ApplyOptions<Listener.Options>({ once: true })
export class ReadyListener extends Listener {
  public run(client: Client) {
    const { username, id } = client.user!;
    this.container.logger.info(
      chalk.green(`Successfully logged in as ${username} (${id})`)
    );
  }
}
