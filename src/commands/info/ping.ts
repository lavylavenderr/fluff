import { type Message } from "discord.js";
import { Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      description: "Check the bot's ping!"
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) { 
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  // TODO: Extract common code
  // TODO: this is a mess...

  public async messageRun(message: Message) { 
    const msg = await message.channel.send("Ping?");

    const content = `Pong 🏓! (Round trip took: ${Math.round(
      msg.createdTimestamp - message.createdTimestamp
    )}ms. Heartbeat: ${Math.round(this.container.client.ws.ping)}ms.)`;

    return msg.edit(content);
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      content: `Ping?`,
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      return interaction.editReply(
        `Pong 🏓! (Round trip took: ${
          msg.createdTimestamp - interaction.createdTimestamp
        }ms. Heartbeat: ${Math.round(this.container.client.ws.ping)}ms.)`
      );
    } else {
      return interaction.editReply("Failed to retrieve ping D:");
    }
  }
}
