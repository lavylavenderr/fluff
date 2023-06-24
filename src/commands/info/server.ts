import {Command} from "@sapphire/framework";
import {type Message} from "discord.js";
import {constructEmbed} from "../../lib/EmbedBuilder";
import {capitalizeFirstLetter} from "../../lib/CapitalizeFirstLetter";

export class ServerInfoCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "serverinfo",
            description: "Get information about the current server!"
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
        )
    }

    public async messageRun(message: Message) {
        const guild = message.guild!
        const infoEmbed = constructEmbed({
            fields: [
                {
                    name: "Name:",
                    value: guild.name,
                    inline: true
                },
                {
                    name: "ID:",
                    value: guild.id,
                    inline: true
                },
                {
                    name: "Region:",
                    value: capitalizeFirstLetter(guild.preferredLocale),
                    inline: true
                },
                {
                    name: "Owner",
                    value: `<@${guild.ownerId}>`,
                    inline: true
                },
                {
                    name: "Channels",
                    value: String(guild.channels.cache.size),
                    inline: true
                },
                {
                    name: "Members:",
                    value: String(guild.memberCount),
                    inline: true
                }
            ]
        });

        return message.reply({
            embeds: [
                infoEmbed
            ]
        })
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const guild = interaction.guild!
        const infoEmbed = constructEmbed({
            fields: [
                {
                    name: "Name:",
                    value: guild.name,
                    inline: true
                },
                {
                    name: "ID:",
                    value: guild.id,
                    inline: true
                },
                {
                    name: "Region:",
                    value: capitalizeFirstLetter(guild.preferredLocale),
                    inline: true
                },
                {
                    name: "Owner",
                    value: `<@${guild.ownerId}>`,
                    inline: true
                },
                {
                    name: "Channels",
                    value: String(guild.channels.cache.size),
                    inline: true
                },
                {
                    name: "Members:",
                    value: String(guild.memberCount),
                    inline: true
                }
            ]
        });

        return interaction.reply({
            embeds: [
                infoEmbed
            ]
        })
    }
}