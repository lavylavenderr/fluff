import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";
import responses from '../../lib/8Ball'
import { constructEmbed } from "../../lib/EmbedBuilder";

export class EightBallCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "8ball",
      description:
        "Ask the all mighty 8-Ball any question your heart desires :3",
        typing: true
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );
  }

  public async messageRun(message: Message) {
    const rand = Math.floor(Math.random() * responses.length)
    const response = responses[rand];

    return message.channel.send({
        embeds: [
            constructEmbed({
                description: String(response)
            })
        ]
    })
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const rand = Math.floor(Math.random() * responses.length)
    const response = responses[rand];

    return interaction.reply({
        embeds: [
            constructEmbed({
                description: String(response)
            })
        ]
    })
  }
}
