import { TextChannel, type CommandInteraction, type Message } from "discord.js";
import { Precondition } from "@sapphire/framework";

export class NSFWChecksPrecondition extends Precondition {
  public override async messageRun(message: Message) {
    if (!(await this.checkGuild(message.guild!.id)))
      return this.error({
        message:
          "This guild has NSFW commands disabled.",
      });
    return this.checkChannel(message.channel.id);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    if (!(await this.checkGuild(interaction.guild!.id)))
      return this.error({
        message:
          "This guild has NSFW commands disabled.",
      });
    return this.checkChannel(interaction.channel!.id);
  }

  private async checkGuild(guildId: string) {
    const guild = await this.container.prisma.guild.findUnique({
      where: {
        guildId,
      },
    });

    if (guild?.nsfw === false) return false;
    return true;
  } 

  private async checkChannel(channelId: string) {
    const channel = (await this.container.client.channels.cache.get(
      channelId
    )) as TextChannel;

    if (channel?.nsfw === true) return this.ok();
    else
      return this.error({
        message:
          "You cannot run this command outside of an age-restricted channel.",
      });
  }
}

declare module '@sapphire/framework' {
    interface Preconditions {
        NSFWChecks: never
    }
}