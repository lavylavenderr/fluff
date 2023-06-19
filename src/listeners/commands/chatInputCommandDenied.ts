import { EmbedBuilder } from "discord.js";
import {
  Events,
  Listener,
  type ChatInputCommandDeniedPayload,
  type UserError,
} from "@sapphire/framework";

export class ChatInputCommandDenied extends Listener<
  typeof Events.ChatInputCommandDenied
> {
  public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
    try {
      if (error.message == "1") {
        const message =
          "Sorry, this server is blacklisted from the bot. If the owner would like to appeal, join the support server.";
        return this.replyWithError(message, interaction);
      }

      if (error.message == "2") {
        const message = "Sorry, this command is available to developers only.";
        return this.replyWithError(message, interaction);
      }

      return this.replyWithError(error.message, interaction);
    } catch (err) {
      this.container.logger.fatal(err);
      return;
    }
  }

  private replyWithError(
    message: string,
    interaction: ChatInputCommandDeniedPayload["interaction"]
  ) {
    if (interaction.deferred || interaction.replied) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder().setDescription(message).setColor("#FF0000"),
        ],
      });
    }

    return interaction.reply({
      embeds: [new EmbedBuilder().setDescription(message).setColor("#FF0000")],
      ephemeral: true,
    });
  }
}
