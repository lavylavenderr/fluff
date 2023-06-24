import {constructEmbed} from "../../lib/EmbedBuilder";
import {Subcommand} from "@sapphire/plugin-subcommands";
import {type Message, SlashCommandBuilder} from "discord.js";

export class SettingsCommand extends Subcommand {
    public constructor(context: Subcommand.Context, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "settings",
            description: "Configure server-specific settings for the bot!",
            subcommands: [
                {
                    name: 'nsfw',
                    chatInputRun: 'nsfwSlash',
                    default: true
                }
            ]
        });
    }

    public override registerApplicationCommands(registry: Subcommand.Registry) {
        registry.registerChatInputCommand((builder: SlashCommandBuilder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand(command =>
                    command
                        .setName("nsfw")
                        .setDescription("Enable/Disable NSFW commands for this server.")
                        .addStringOption(option =>
                            option
                                .setName("value")
                                .setDescription("Enable or disable?")
                                .setRequired(true)
                                .addChoices(
                                    { name: "Enable", value: "enable" },
                                    { name: "Disable", value: "disable" }
                                )
                        )
                ),
        )
    }

    public async nsfwSlash(interaction: Subcommand.ChatInputCommandInteraction) {
        const choice = interaction.options.getString("value")!

        if (choice == "enable") {
            await this.container.prisma.guild.upsert({
                where: {
                    guildId: interaction.guild!.id
                },
                update: {
                    nsfw: true
                },
                create: {
                    guildId: interaction.guild!.id
                }
            })

            return interaction.reply({
                embeds: [
                    constructEmbed({
                        description: "I've enabled NSFW commands for this server!",
                        color: 0x00FF00
                    })
                ], ephemeral: true
            })
        } else {
            await this.container.prisma.guild.upsert({
                where: {
                    guildId: interaction.guild!.id
                },
                update: {
                    nsfw: false
                },
                create: {
                    guildId: interaction.guild!.id
                }
            })

            return interaction.reply({
                embeds: [
                    constructEmbed({
                        description: "I've disabled NSFW commands for this server.",
                        color: 0xEE4B2B
                    })
                ], ephemeral: true
            })
        }
    }
}