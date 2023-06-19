import { Events, Listener } from "@sapphire/framework";
import { type Interaction } from "discord.js";
import { updateGuildStatistics } from "../../lib/UpdateGuildStats";
import { updateBotStatistics } from "../../lib/UpdateBotStats";
import { updateUserStatistics } from "../../lib/UpdateUserStats";
import addUser from "../../lib/AddUser";

const userMap = new Map<string, number>();
const interactionMap = new Map<string, number>();

export class interactionCreate extends Listener<
  typeof Events.InteractionCreate
> {
  public async run(interaction: Interaction) {
    const guildId = interaction.guild!.id;
    const guildCount = (interactionMap.get(guildId!) ?? 0) + 1;
    const userCount = (userMap.get(interaction.user.id) ?? 0) + 1;
    let commandCount = 0;

    commandCount++;

    await addUser(interaction.user.id)
    interactionMap.set(guildId!, guildCount);
    userMap.set(interaction.user.id, userCount);

    setTimeout(() => {
      const guildCommandCount = interactionMap.get(guildId) ?? 0;
      const userCommandCount = userMap.get(interaction.user.id) ?? 0;

      updateGuildStatistics(guildCommandCount, guildId);
      updateBotStatistics(interaction.client, commandCount);
      updateUserStatistics(interaction.user.id, userCommandCount)
    
      commandCount = 0;
      userMap.delete(interaction.user.id);
      interactionMap.delete(guildId);
    }, 30 * 60 * 1000);
  }
}
