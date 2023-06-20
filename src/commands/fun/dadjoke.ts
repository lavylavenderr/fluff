import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class DadJokeCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "dadjoke",
      description: "Crack a laugh with a random dad joke!",
      aliases: ["joke"],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );
  }

  public async messageRun(message: Message) {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "Fluff (https://github.com/LavenderFoxxo/Fluff",
      },
    }).then((response) => response.json());

    if (res.status !== 200)
      return message.reply({
        embeds: [
          constructEmbed({
            description: "An error occured attempting to fetch a joke.",
            color: 15548997,
          }),
        ],
      });

    return message.reply({
      embeds: [
        constructEmbed({
          description: res.joke,
        }),
      ],
    });
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "Fluff (https://github.com/LavenderFoxxo/Fluff",
      },
    }).then((response) => response.json());

    if (res.status !== 200)
      return interaction.reply({
        embeds: [
          constructEmbed({
            description: "An error occured attempting to fetch a joke.",
            color: 15548997,
          }),
        ],
      });

    return interaction.reply({
      embeds: [
        constructEmbed({
          description: res.joke,
        }),
      ],
    });
  }
}
