import { type Message } from "discord.js";
import cleanName from "../../lib/CleanName";
import { Command } from "@sapphire/framework";
import { addUserAction } from "../../lib/AddUserAction";

export class BarkCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "bark",
    });
  }

  public async messageRun(message: Message) {
    const giverName = cleanName(message.author.username);
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
    }

    const barks = [
      `barks at ${recievers}!`,
      `yips at ${recievers}!`,
      `lets out a few barks at ${recievers}!`,
      `scoots over to ${recievers} and barks at them!`,
      `bark bark barks at ${recievers}!`,
      `yaps and barks at ${recievers}!`,
      `pokes ${recievers} and barks at them!`,
      `barks loudly at ${recievers}!`,
      `barks a whole lot at ${recievers}!`,
      `casually barks at ${recievers}!`,
      `tries to get the attention of ${recievers} by barking at them!`,
      `barks at ${recievers} from a distance!`,
      `lets out a sharp bark at ${recievers}!`,
      `happily barks at ${recievers}!`,
      `barks a couple of times at ${recievers}!`,
      `boofs at ${recievers}!`,
      `wants attention so they bark at ${recievers}!`,
      `barks once at ${recievers}!`,
      `runs towards ${recievers}, barking the whole way!`,
      `continually barks at ${recievers}!`,
      `doesn't stop barking at ${recievers}!`,
    ];

    const rand = Math.floor(Math.random() * barks.length);

    return message.channel.send(`**${giverName}** ${barks[rand]}`)
  }
}
