import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";
import { constructEmbed } from "../../lib/EmbedBuilder";

export class E621Command extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "e621",
      description: "Search up something on E621?",
      preconditions: ["NSFWChecks"],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("tags")
            .setDescription(
              "The tags you'd like to search. (Eg: tag1,tag2,tag3)"
            )
            .setRequired(true)
        )
    );
  }

  public async messageRun(message: Message) {
    const tagString = message.content.slice(7);
    const regexString = /^[\w\d\s]+(?:,\s*[\w\d\s]+)*$/;

    if (!regexString.test(tagString)) {
      return message.reply({
        embeds: [
          constructEmbed({
            description:
              "Your tags aren't formatted correctly, here's an example: `tag1,tag2,tag3`",
          }),
        ],
      });
    }

    const unfilteredTags = tagString.split(",");
    const filteredTags = [];

    for (const tag of unfilteredTags) {
      if (tag.includes(" ")) filteredTags.push(tag.replaceAll(" ", "_"));
      else filteredTags.push(tag);
    }

    const globalBlacklist = [
      "cub",
      "shota",
      "young",
      "loli",
      "scat",
      "vore",
      "rape",
    ];

    if (filteredTags.some((tag) => globalBlacklist.includes(tag))) {
      return message.reply({
        embeds: [
          constructEmbed({
            description:
              "Sorry! Your request contains blacklisted tags, feel free to submit another with different tags.",
          }),
        ],
      });
    }

    const request = await fetch(
      `https://e621.net/posts.json?login=FloofyLavender&api_key=${encodeURIComponent(
        process.env.E621KEY!
      )}&tags=${encodeURIComponent(
        filteredTags.join(" ")
      )}&limit=320 order:random`,
      {
        headers: {
          "User-Agent": "LavenderFoxxo/Fluff @ GitHub",
        },
      }
    ).then((response) => response.json());

    if (request.posts.length === 0) {
      return message.reply({
        embeds: [
          constructEmbed({
            description: "No posts were found for this query.",
          }),
        ],
      });
    }

    const rand = Math.floor(Math.random() * request.posts.length);
    let post = request.posts[rand];

    let description = `**Score:** ${post.score.total} | **Resolution: ** ${post.file.width} x ${post.file.height} | [**Link**](https://e621.net/posts/${post.id})`;
    let file = post.file.url;

    if (
      Object.values(post.tags).some((tagcat: any) =>
        tagcat.some((tag: string) => globalBlacklist.includes(tag))
      )
    ) {
      file = undefined;
      description = `**BLACKLISTED** - Global Bot Blacklist | [**Link**](https://e621.net/posts/${post.id})`;
    }

    if (file) {
      if (file.endsWith("webm") || file.endsWith("swf")) {
        description = `**Score:** ${post.score.total} | [**Link**](https://e621.net/post/show/${post.id})\n*This file (webm/swf) cannot be previewed or embedded.*`;
      }
    }

    return message.reply({
      embeds: [
        constructEmbed({
          author: {
            name: message.author.username.replace("#0", ""),
            iconURL: message.author.displayAvatarURL({
              size: 1024,
              extension: "png",
            }),
          },
          URL: "https://e621.net/posts/" + post.id,
          description: description,
          image: file,
          footer: {
            iconURL: "https://i.imgur.com/RrHrSOi.png",
            text: `e621 · ${rand + 1}` + "/" + request.posts.length,
          },
        }),
      ],
    });
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const tagString = interaction.options.getString("tags")!;
    const regexString = /^[\w\d\s]+(?:,\s*[\w\d\s]+)*$/;

    await interaction.deferReply();

    if (!regexString.test(tagString)) {
      return interaction.editReply({
        embeds: [
          constructEmbed({
            description:
              "Your tags aren't formatted correctly, here's an example: `tag1,tag2,tag3`",
          }),
        ],
      });
    }

    const unfilteredTags = tagString.split(",");
    const filteredTags = [];

    for (const tag of unfilteredTags) {
      if (tag.includes(" ")) filteredTags.push(tag.replaceAll(" ", "_"));
      else filteredTags.push(tag);
    }

    const globalBlacklist = [
      "cub",
      "shota",
      "young",
      "loli",
      "scat",
      "vore",
      "rape",
    ];

    if (filteredTags.some((tag) => globalBlacklist.includes(tag))) {
      return interaction.editReply({
        embeds: [
          constructEmbed({
            description:
              "Sorry! Your request contains blacklisted tags, feel free to submit another with different tags.",
          }),
        ],
      });
    }

    const request = await fetch(
      `https://e621.net/posts.json?login=FloofyLavender&api_key=${encodeURIComponent(
        process.env.E621KEY!
      )}&tags=${encodeURIComponent(
        filteredTags.join(" ")
      )}&limit=320 order:random`,
      {
        headers: {
          "User-Agent": "LavenderFoxxo/Fluff @ GitHub",
        },
      }
    ).then((response) => response.json());

    if (request.posts.length === 0) {
      return interaction.editReply({
        embeds: [
          constructEmbed({
            description: "No posts were found for this query.",
          }),
        ],
      });
    }

    const rand = Math.floor(Math.random() * request.posts.length);
    let post = request.posts[rand];

    let description = `**Score:** ${post.score.total} | **Resolution: ** ${post.file.width} x ${post.file.height} | [**Link**](https://e621.net/posts/${post.id})`;
    let file = post.file.url;

    if (
      Object.values(post.tags).some((tagcat: any) =>
        tagcat.some((tag: string) => globalBlacklist.includes(tag))
      )
    ) {
      file = undefined;
      description = `**BLACKLISTED** - Global Bot Blacklist | [**Link**](https://e621.net/posts/${post.id})`;
    }

    if (file) {
      if (file.endsWith("webm") || file.endsWith("swf")) {
        description = `**Score:** ${post.score.total} | [**Link**](https://e621.net/post/show/${post.id})\n*This file (webm/swf) cannot be previewed or embedded.*`;
      }
    }

    return interaction.editReply({
      embeds: [
        constructEmbed({
          author: {
            name: interaction.user.username.replace("#0", ""),
            iconURL: interaction.user.displayAvatarURL({
              size: 1024,
              extension: "png",
            }),
          },
          URL: "https://e621.net/posts/" + post.id,
          description: description,
          image: file,
          footer: {
            iconURL: "https://i.imgur.com/RrHrSOi.png",
            text: `e621 · ${rand + 1}` + "/" + request.posts.length,
          },
        }),
      ],
    });
  }
}
