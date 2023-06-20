import {
    Events,
    Listener,
    MessageCommandErrorPayload,
    type UserError,
  } from "@sapphire/framework";
  import { constructEmbed } from "../../lib/EmbedBuilder";
  
  export class MessageCommandDenied extends Listener<
    typeof Events.MessageCommandError
  > {
    public run(error: unknown, { message }: MessageCommandErrorPayload) {
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
  