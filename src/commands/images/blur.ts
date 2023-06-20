import { Command } from "@sapphire/framework";
import { AttachmentBuilder, type Message } from "discord.js";
import DIG from "discord-image-generation";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class BlurCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "blur",
      description: "Blur an avatar!",
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
            .setDescription("The user whos avatar you'd like to blur!")
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

    try {
      if (message.mentions.users.size === 0) {
        const image = await new DIG.Blur().getImage(
          message.author.displayAvatarURL({ extension: "png", size: 1024 })
        );
        const attachment = new AttachmentBuilder(image, {
          name: `${message.author.username}-blurred.png`,
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
        const image = await new DIG.Blur().getImage(
          message.mentions.users
            .first()!
            .displayAvatarURL({ extension: "png", size: 1024 })
        );
        const attachment = new AttachmentBuilder(image, {
          name: `${message.mentions.users.first()!.username}-blurred.png`,
        });

        msg.edit({
          files: [attachment],
          embeds: [],
        });
      }
    } catch (err) {
      this.container.sentry.captureException(err);

      msg.edit({
        embeds: [
          constructEmbed({
            author: {
              name: `| A error occured processing your request D:`,
              iconURL: message.author.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    }
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();

      const target = interaction.options.getUser("user") || interaction.user;
      const avatar = target.displayAvatarURL({ extension: "png", size: 1024 });

      const image = await new DIG.Blur().getImage(avatar);
      const attachment = new AttachmentBuilder(image, {
        name: `${target.username}-blurred.png`,
      });

      interaction.reply({
        files: [attachment],
      });
    } catch (err) {
      this.container.sentry.captureException(err);

      interaction.editReply({
        embeds: [
          constructEmbed({
            author: {
              name: `| A error occured processing your request D:`,
              iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    }
  }
}
