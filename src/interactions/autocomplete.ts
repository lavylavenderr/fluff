import {
  InteractionHandler,
  InteractionHandlerTypes,
  Option,
  PieceContext,
} from "@sapphire/framework";
import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
} from "discord.js";
import { type Command } from "@sapphire/framework";
import { capitalizeFirstLetter } from "../lib/CapitalizeFirstLetter";

export interface CommandInfo {
  name: string;
}

export class AutocompleteHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Autocomplete,
    });
  }

  public override async run(
    interaction: AutocompleteInteraction,
    result: InteractionHandler.ParseResult<this>
  ) {
    return interaction.respond(result);
  }

  public override async parse(
    interaction: AutocompleteInteraction
  ): Promise<Option.Some<ApplicationCommandOptionChoiceData[]> | Option.None> {
    if (interaction.commandId === "1111974057550815252") {
      const focusedOption = interaction.options.getFocused(true);
      const commandStore = this.container.stores.get("commands");
      const commands: string[] = [];

      commandStore.forEach((command: Command) => {
        if (!command.applicationCommandRegistry) return;

        const { name } = command;

        commands.push(name);
      });

      if (focusedOption.name === "command") {
        return this.some(
            commands.map((command) => ({
                name: capitalizeFirstLetter(command),
                value: command
            }))
        );
      }
    }

    return this.none();
  }
}
