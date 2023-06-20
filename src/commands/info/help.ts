import { type Message } from "discord.js";
import { Command } from "@sapphire/framework";
import { constructEmbed } from "../../lib/EmbedBuilder";
import { capitalizeFirstLetter } from "../../lib/CapitalizeFirstLetter";

export interface CommandInfo {
  name: string;
  description: string;
  category: string;
}

export class HelpCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "help",
      description: "Shows all available commands."
    });
  }
 
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription(
              "Want a overview of the commands in a specific category?"
            )
            .addChoices(
              { name: "Actions", value: "actions" },
              { name: "Fun", value: "fun" },
              { name: "Images", value: "images" },
              { name: "Info", value: "info" },
              { name: "Moderation", value: "moderation" },
              { name: "Useful", value: "useful" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("command")
            .setDescription("Want information on a specific command?")
            .setAutocomplete(true)
        )
    );
  }

  public async messageRun(message: Message) {
    const commandStore = this.container.stores.get("commands");
    const filteredCommands = commandStore.filter(
      (cmd) => cmd.name === message.content.slice(7)
    );
    const commandInfo = filteredCommands.get(message.content.slice(7));
    const categories: string[] = [];

    commandStore.forEach((command: Command) => {
      categories.push(command.fullCategory[0]);
    });

    if (commandInfo) {
      return message.reply({
        embeds: [
          constructEmbed({
            author: {
              name: "Command Info",
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            title: capitalizeFirstLetter(commandInfo.name),
            description:
              commandInfo?.description ||
              "This command has no description set.",
          }),
        ],
      });
    } else if (categories.includes(message.content.slice(7))) {
      let categoryDesc = "";

      switch (message.content.slice(7)) {
        case "actions":
          categoryDesc =
            "These commands allow you to interact with the users in the server!";
          break;
        case "fun":
          categoryDesc = "Goof off with your friends!";
          break;
        default:
          categoryDesc = "This category has no description set.";
          break;
      }

      const commandStore = this.container.stores.get("commands");
      const commands: string[] = [];

      commandStore.forEach((command: Command) => {
        const { name, category: cmdcat } = command as CommandInfo;

        if (cmdcat != message.content.slice(7)) return;
        commands.push(name);
      });

      return message.reply({
        embeds: [
          constructEmbed({
            author: {
              name: capitalizeFirstLetter(message.content.slice(7)),
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            description: categoryDesc,
            fields: [
              {
                name: "Commands",
                value: commands.join(", ") || "This category has no commands.",
                inline: false,
              },
            ],
          }),
        ],
      });
    } else {
      const commandsByCategory: Record<string, string[]> = {};

      commandStore.forEach((command: Command) => {
        if (!command.typing === true) return;

        const { name, category } = command as CommandInfo;

        if (!commandsByCategory[category]) {
          commandsByCategory[category] = [];
        }

        const categoryCommands = commandsByCategory[category];
        categoryCommands.push(name);
      });

      const categoryArray = Object.entries(commandsByCategory).map(
        ([category, commands]) => ({
          name: category,
          commands,
        })
      );

      return message.reply({
        embeds: [
          constructEmbed({
            author: {
              name: "Fluff's Commands",
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            description: `Here are the current commands available! If you'd like information on a specific command, run **f!help <command>** or to view information about a specific category, you can run **f!help <category>**.`,
            fields: categoryArray.map((category) => ({
              name: capitalizeFirstLetter(category.name),
              value: category.commands.join(", "),
              inline: false,
            })),
            footer: {
              text: `Requested by: ${message.author.tag.replace("#0", "")}`,
            },
          }),
        ],
      });
    }
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const command = interaction.options.getString("command") || " ";
    const category = interaction.options.getString("category") || " ";

    if (command.length < 1 || category.length > 1) {
      let categoryDesc = "";

      switch (category) {
        case "actions":
          categoryDesc =
            "These commands allow you to interact with the users in the server";
          break;
        case "fun":
          categoryDesc = "Goof off with your friends!";
          break;
        default:
          categoryDesc = "This category has no description set.";
          break;
      }

      const commandStore = this.container.stores.get("commands");
      const commands: string[] = [];

      commandStore.forEach((command: Command) => {
        const { name, category: cmdcat } = command as CommandInfo;

        if (cmdcat != category) return;
        commands.push(name);
      });

      return interaction.reply({
        embeds: [
          constructEmbed({
            author: {
              name: capitalizeFirstLetter(category),
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            description: categoryDesc,
            fields: [
              {
                name: "Commands",
                value: commands.join(", ") || "This category has no commands.",
                inline: false,
              },
            ],
          }),
        ],
      });
    } else if (category.length < 1 || command.length > 1) {
      const commandStore = this.container.stores.get("commands");
      const filteredCommands = commandStore.filter(
        (cmd) => cmd.name === command
      );
      const commandInfo = filteredCommands.get(command);

      return interaction.reply({
        embeds: [
          constructEmbed({
            author: {
              name: "Command Info",
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            title: capitalizeFirstLetter(command),
            description:
              commandInfo?.description ||
              "This command has no description set.",
          }),
        ],
      });
    } else {
      const commandStore = this.container.stores.get("commands");
      const commandsByCategory: Record<string, string[]> = {};

      commandStore.forEach((command: Command) => {
        if (!command.applicationCommandRegistry) return;

        const { name, category } = command as CommandInfo;

        if (!commandsByCategory[category]) {
          commandsByCategory[category] = [];
        }

        const categoryCommands = commandsByCategory[category];
        categoryCommands.push(name);
      });

      const categoryArray = Object.entries(commandsByCategory).map(
        ([category, commands]) => ({
          name: category,
          commands,
        })
      );

      return interaction.reply({
        embeds: [
          constructEmbed({
            author: {
              name: "Fluff's Commands",
              iconURL: this.container.client.user?.displayAvatarURL({
                size: 1024,
              }),
            },
            description:
              "Here are the current commands available! If you'd like information on a specific command, pick it when running the slash command. However, do note that since you ran the slash command for help, this will only show available slash commands.",
            fields: categoryArray.map((category) => ({
              name: capitalizeFirstLetter(category.name),
              value:
                category.commands.join(", ") ||
                "This category has no commands.",
              inline: false,
            })),
          }),
        ],
      });
    }
  }
}
