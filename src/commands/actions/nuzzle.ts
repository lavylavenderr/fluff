import { type Message } from "discord.js";
import cleanName from "../../lib/CleanName";
import { Command } from "@sapphire/framework";
import { addUserAction } from "../../lib/AddUserAction";

export class BarkCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "nuzzle",
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
          addUserAction("nuzzle", user.id);
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

      const nuzzles = [
        `gets up close to ${recievers} and nuzzles them!`,
        `softly nuzzles ${recievers}!`,
        `nuzzles ${recievers}!`,
        `nuzzles ${recievers} softly!`,
        `nuzzles ${recievers} gently!`,
        `quickly nuzzles ${recievers}!`,
        `sneakily nuzzles ${recievers}!`,
        `slowly nuzzles ${recievers}!`,
        `gets their nose up close to ${recievers} and nuzzles them!`,
        `nuzzles ${recievers} cheek :3`,
        `nuzzles ${recievers} chest :3`,
        `softly nuzzles ${recievers} warm and close`,
        `applies soft little nuzzles to ${recievers}`,
        `gets up close to ${recievers} and nuzzles them!`,
        `gets nice and close to ${recievers} for a soft nuzzle :3`,
      ];

      const rand = Math.floor(Math.random() * nuzzles.length);

      return message.channel.send(`**${giverName}** ${nuzzles[rand]}`);
    }

    return message.channel.send(
      `**${giverName}** nuzzles a pillow.. those are also soft.. i guess :c`
    );
  }
}
