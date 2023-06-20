import {
  AllFlowsPrecondition,
  ContextMenuCommand,
  MessageCommand,
  Piece,
  PreconditionContext,
  PreconditionResult,
} from "@sapphire/framework";
import {
  CacheType,
  CommandInteraction,
  ContextMenuCommandInteraction,
  type Message,
} from "discord.js";

export class ChannelPrecondition extends AllFlowsPrecondition {
  public constructor(
    context: Piece.Context,
    options: AllFlowsPrecondition.Options
  ) {
    super(context, {
      ...options,
      position: 20,
    });
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    if (!interaction.channel)
      return this.error({
        message: "You cannot run commands within a DM channel.",
      });
    return this.ok();
  }

  messageRun(
    message: Message<boolean>,
    command: MessageCommand,
    context: PreconditionContext
  ): PreconditionResult {
    return this.ok();
  }
  contextMenuRun(
    interaction: ContextMenuCommandInteraction<CacheType>,
    command: ContextMenuCommand,
    context: PreconditionContext
  ): PreconditionResult {
    return this.ok();
  }
}
