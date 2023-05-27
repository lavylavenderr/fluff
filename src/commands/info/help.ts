import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";

@ApplyOptions<Command.Options>({
    description: "this is like helping or something"
})
export class HelpCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    interaction.reply(
      "HAI HAI HAI https://e621.net/ ASFIJHNAEIOWFHJIOW)EQGJFLOUEWHGUIOEWNGJKMOEWcfjx./8odfuvs9dfgrsetdhrthjrtyejrtyejkrtyejt5rejrtejtrejrtjrteejrtejrtSOP:ADJKFO:DESWJGIPEWNGIOUEWIOGMWEIOPGMIKOWEGIOUEWGIPWEGIJKP"
    );
  }
}
