import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

export class DeveloperCheck extends Precondition {
  public override chatInputRun(interaction: CommandInteraction) {
  if (interaction.user.id == "988801425196867644" || interaction.user.id == "337024000330956811") return this.ok();
	else return this.error({ message: "2" });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    DeveloperCheck: never;
  }
}
