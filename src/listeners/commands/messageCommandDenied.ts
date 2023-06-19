import {
  Events,
  Listener,
  MessageCommandDeniedPayload,
  type UserError,
} from "@sapphire/framework";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class MessageCommandDenied extends Listener<
  typeof Events.MessageCommandDenied
> {
  public run(error: UserError, { message }: MessageCommandDeniedPayload) {
    try {
      message.reply({
        embeds: [
          constructEmbed({
            author: {
              name: `| ${error.message}`,
              iconURL: message.author.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    } catch (err) {
      this.container.logger.fatal(err);
      message.reply({
        embeds: [
          constructEmbed({
            author: {
              name: `| A fatal error has occured while processing your request, please try again later.`,
              iconURL: message.author.displayAvatarURL({ size: 1024 }),
            },
            color: 15548997,
          }),
        ],
      });
    }
  }
}
