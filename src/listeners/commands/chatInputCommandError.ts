import {
  Events,
  Listener,
  ChatInputCommandErrorPayload,
} from "@sapphire/framework";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class ChatInputCommandDenied extends Listener<
  typeof Events.ChatInputCommandError
> {
  public run(error: unknown, { interaction }: ChatInputCommandErrorPayload) {
    if (interaction.deferred) {
      interaction.editReply({
        embeds: [
          constructEmbed({
            author: {
              name: `| A fatal error has occured while processing your request, please try again later.`,
              iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          constructEmbed({
            author: {
              name: `| A fatal error has occured while processing your request, please try again later.`,
              iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    }
  }
}
