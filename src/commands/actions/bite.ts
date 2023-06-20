import { type Message } from "discord.js";
import cleanName from "../../lib/CleanName";
import { Command } from "@sapphire/framework";
import { addUserAction } from "../../lib/AddUserAction";

export class BarkCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "bite",
      description: "Nom nom",
    });
  }

  public async messageRun(message: Message) {
    const giverName = cleanName(
      message.member?.displayName || message.author.username
    );
    const recieverArray: string[] = [];
    let recievers = "";

    if (message.mentions.users.size !== 0) {
      message.mentions.users.map((user) => {
        if (user !== message.author && !user.bot) {
          addUserAction("bark", user.id);
          recieverArray.push(`**${cleanName(user.username)}**`);
        }
      });
    }

    if (recieverArray.length !== 0) {
      if (recieverArray.length <= 2) {
        recievers = recieverArray.join(" and ");
      }

      if (recieverArray.length >= 3) {
        recievers =
          recieverArray.slice(0, -1).join(", ") +
          " and " +
          recieverArray[recieverArray.length - 1];
      }

      const bites = [
        `slowly gets closer to ${recievers} and bites them!`,
        `softly nibbles on the ears of ${recievers} :3`,
        `gently nips ${recievers} :3`,
        `softly nibbles ${recievers} :3`,
        `gives ${recievers} a couple of soft bites :3`,
        `gently nibbles ${recievers} :3`,
        `bites ${recievers} :3`,
        `gets all bitey with ${recievers}, run!`,
        `chomps ${recievers}!`,
        `monches on ${recievers} :3`,
        `munchmunchmunches on ${recievers} :3`,
        `slides over to ${recievers} and monches them! :3`,
        `sinks their teeth into ${recievers}! Ouch!`,
        `chases after ${recievers} and bites them!`,
        `pokes ${recievers} and does a soft nibble :3`,
        `opens wide and chomps ${recievers}.. chomp chomp..`,
        `surprises ${recievers} with some surprise nibbles!`,
        `monches and cronches ${recievers}.. i swear this is not vore!`,
        `gives ${recievers} a firm neck-bite!`,
        `monches on the ears of ${recievers} softly!`,
        `bites ${recievers} multiple times!`,
        `can't resist to bite ${recievers}!`,
        `bites into their yummy target(s): ${recievers} :3`,
      ];

      const rand = Math.floor(Math.random() * bites.length);

      return message.channel.send(`**${giverName}** ${bites[rand]}`);
    }
    return message.channel.send(
      `**${giverName}** bites their own arm for no reason. What a weirdo!`
    );
  }
}
