import DIG from "discord-image-generation";
import { Command } from "@sapphire/framework";
import { AttachmentBuilder, type Message } from "discord.js";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class DeleteCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "beautiful",
      description: "Use this command to show someone that they're a work of art!"
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user whos avatar you'd like to use!")
        );
    });
  }

  public async messageRun(message: Message) {
    const msg = await message.channel.send({
      embeds: [
        constructEmbed({
          description: "Hold on! I'm working on your request :3",
        }),
      ],
    });

    if (message.mentions.users.size === 0) {
      const image = await new DIG.Beautiful().getImage(
        message.author.displayAvatarURL({ extension: "png", size: 1024 })
      );
      const attachment = new AttachmentBuilder(image, {
        name: `${message.author.username}-beautiful.png`,
      });

      msg.edit({
        files: [attachment],
        embeds: [],
      });
    } else if (message.mentions.users.size > 1) {
      return msg.edit({
        embeds: [
          constructEmbed({
            description: "Oops! You can only mention one user at a time!",
          }),
        ],
      });
    } else {
      const image = await new DIG.Beautiful().getImage(
        message.mentions.users
          .first()!
          .displayAvatarURL({ extension: "png", size: 1024 })
      );
      const attachment = new AttachmentBuilder(image, {
        name: `${message.mentions.users.first()!.username}-beautiful.png`,
      });

      msg.edit({
        files: [attachment],
        embeds: [],
      });
    }
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const target = interaction.options.getUser("user") || interaction.user;
    const avatar = target.displayAvatarURL({ extension: "png", size: 1024 });

    const image = await new DIG.Beautiful().getImage(avatar);
    const attachment = new AttachmentBuilder(image, {
      name: `${target.username}-beautiful.png`,
    });

    interaction.editReply({
      files: [attachment],
    });
  }
}
