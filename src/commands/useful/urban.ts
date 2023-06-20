import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";
import { constructEmbed } from "../../lib/EmbedBuilder";
import trim from "../../lib/Trim";

export class UrbanCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "urban",
      description: "Look up something in the urban dictionary!",
      typing: true,
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("What would you like to search for?")
            .setRequired(true)
        )
    );
  }

  public async messageRun(message: Message) {
    const query = message.content.slice(8);
    const response = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent": "LavenderFoxxo/Fluff @ GitHub",
        },
      }
    ).then((response) => response.json());

    if (response.error) {
      return message.channel.send({
        embeds: [
          constructEmbed({
            color: 15548997,
            description:
              "<:error:495412525148405783> Oops! An error occured whilst fetching results. Please try again later.",
          }),
        ],
      });
    }

    // So the same result isn't returned each time
    const rand = Math.floor(Math.random() * response.list.length);
    const { definition, word, permalink, thumbs_up, thumbs_down, example } =
      response.list[rand];

    // I absolutely fucking suck at making embeds look nice, so thank you DJS Guide for the embed format :3
    return message.channel.send({
      embeds: [
        constructEmbed({
          title: word,
          URL: permalink,
          fields: [
            {
              name: "Definition",
              value: trim(definition, 1024),
              inline: false,
            },
            {
              name: "Example",
              value: trim(example, 1024),
              inline: false,
            },
            {
              name: "Rating",
              value: `${thumbs_up} thumbs up.\n${thumbs_down} thumbs down.`,
              inline: false,
            },
          ],
        }),
      ],
    });
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const query = interaction.options.getString("query")!;
    const response = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent": "LavenderFoxxo/Fluff @ GitHub",
        },
      }
    ).then((response) => response.json());

    if (response.error) {
      return interaction.editReply({
        embeds: [
          constructEmbed({
            color: 15548997,
            description:
              "<:error:495412525148405783> Oops! An error occured whilst fetching results. Please try again later.",
          }),
        ],
      });
    }

    // So the same result isn't returned each time
    const rand = Math.floor(Math.random() * response.list.length);
    const { definition, word, permalink, thumbs_up, thumbs_down, example } =
      response.list[rand];

    // I absolutely fucking suck at making embeds look nice, so thank you DJS Guide for the embed format :3
    return interaction.editReply({
      embeds: [
        constructEmbed({
          title: word,
          URL: permalink,
          fields: [
            {
              name: "Definition",
              value: trim(definition, 1024),
              inline: false,
            },
            {
              name: "Example",
              value: trim(example, 1024),
              inline: false,
            },
            {
              name: "Rating",
              value: `${thumbs_up} thumbs up.\n${thumbs_down} thumbs down.`,
              inline: false,
            },
          ],
        }),
      ],
    });
  }
}
