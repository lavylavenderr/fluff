import { PrismaClient } from "@prisma/client";
import { ApplyOptions } from "@sapphire/decorators";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ChatInputCommand } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import type { Client } from "discord.js";
import chalk from "chalk";

const prisma = new PrismaClient();

@ApplyOptions<Subcommand.Options>({
  name: "blacklist",
  description: "Manage the bot blacklist",
  preconditions: ["DeveloperCheck"],
  subcommands: [
    {
      name: "info",
      chatInputRun: "chatInputInfo",
    },
    {
      name: "add",
      chatInputRun: "chatInputAdd",
    },
    {
      name: "remove",
      chatInputRun: "chatInputRemove",
    },
  ],
})

export class PingCommand extends Subcommand {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName("blacklist")
        .setDescription("Manage the bot blacklist")
        .addSubcommand((command) =>
          command
            .setName("info")
            .setDescription("Fetches info about a banned guild.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "The ID of the guild you would like to fetch information for."
                )
                .setRequired(true)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("add")
            .setDescription("Adds a banned guild.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "The ID of the guild you would like to add to the blacklist."
                )
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("reason")
                .setDescription("The reason why this guild is blacklisted.")
                .setRequired(false)
            )
        )
        .addSubcommand((command) =>
          command
            .setName("remove")
            .setDescription("Removes a banned guild.")
            .addStringOption((option) =>
              option
                .setName("id")
                .setDescription(
                  "The ID of the guild you would like to remove from the blacklist."
                )
                .setRequired(true)
            )
        );
    });
  }

  public async chatInputInfo(
    interaction: Subcommand.ChatInputCommandInteraction
  ) {
    try {
      interaction.deferReply({ ephemeral: true });

      const guild = interaction.options.getString("id");

      const guildinfo = await prisma.blacklist.findUnique({
        where: {
          guild_id: String(guild),
        },
      });

      if (guildinfo === null) {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                "I could not find a server with that ID in the database."
              )
              .setColor("Red"),
          ],
        });
      }

      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription("Here is information about the requested guild.")
            .addFields([
              {
                name: "Name",
                value: String(guildinfo.name),
                inline: true,
              },
              {
                name: "ID",
                value: String(guildinfo.guild_id),
                inline: true,
              },
              {
                name: "Reason",
                value: String(guildinfo.reason),
                inline: false,
              },
            ]),
        ],
      });
    } catch (err) {
      this.container.logger.info(chalk.red(`${err}`));

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `An error has occured. The relevant information has been sent to the developers, please try again later!`
            )
            .setColor("#FF0000"),
        ],
      });
    }
  }

  public async chatInputAdd(
    interaction: Subcommand.ChatInputCommandInteraction,
    client: Client
  ) {
    try {
      interaction.deferReply({ ephemeral: true });

      const id = interaction.options.getString("id");
      const reason = interaction.options.getString("reason");

      const guildinfo = await prisma.blacklist.findUnique({
        where: {
          guild_id: String(id),
        },
      });

      if (guildinfo !== null) {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription("This guild is already in the database.")
              .setColor("Red"),
          ],
        });
      }

      await prisma.blacklist.create({
        data: {
          guild_id: String(id),
          reason: String(reason || "No reason given."),
        },
      });

      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `The server "${id}" has been successfully added to the blacklist.`
            )
            .setColor("Green"),
        ],
      });
    } catch (err) {
      this.container.logger.info(chalk.red(`${err}`));

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `An error has occured. The relevant information has been sent to the developers, please try again later!`
            )
            .setColor("#FF0000"),
        ],
      });
    }
  }

  public async chatInputRemove(
    interaction: Subcommand.ChatInputCommandInteraction
  ) {
    try {
      interaction.deferReply({ ephemeral: true });

      const id = interaction.options.getString("id");

      const guildinfo = await prisma.blacklist.findUnique({
        where: {
          guild_id: String(id),
        },
      });

      if (guildinfo === null) {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription("This guild is **NOT** in the database.")
              .setColor("Red"),
          ],
        });
      }

      await prisma.blacklist.delete({
        where: {
          guild_id: String(id),
        },
      });

      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `The server "${id}" has been successfully been removed from the blacklist.`
            )
            .setColor("Green"),
        ],
      });
    } catch (err) {
      this.container.logger.info(chalk.red(`${err}`));

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `An error has occured. The relevant information has been sent to the developers, please try again later!`
            )
            .setColor("#FF0000"),
        ],
      });
    }
  }
}
