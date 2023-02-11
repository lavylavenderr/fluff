const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    command: 'clear',
    description: 'Clears messages sent in a channel. or by a user.',
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages sent in a channel or by a user.')
        .addNumberOption(option =>
            option.setName('amount').setDescription('The amount of messages you would like to clear.').setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user').setDescription('User who\'s messages you\'d like to clear.')
        ),
    run: async (client, interaction) => {
        const { channel } = interaction;

        if (interaction.guild === null) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Please run this command in a server!').setColor("RED")] })

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [new MessageEmbed().setDescription('You cannot run this command!').setColor("RED")] })

        const Amount = interaction.options.getNumber('amount')
        const Target = interaction.options.getUser('user')
        const Messages = await interaction.channel.messages.fetch()
        const Response = new MessageEmbed()

        if (Amount >= 101) {
            return interaction.reply({ embeds: [new MessageEmbed().setDescription('You can only delete 100 messages at a time!').setColor("RED")], ephemeral: true })
        }

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then((messages) => {
                Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}.`);
                interaction.reply({ embeds: [Response], ephemeral: true });
            });
        } else {
            await channel.bulkDelete(Amount, true).then((messages) => {
                Response.setDescription(
                  `🧹 Cleared ${messages.size} from this channel.`
                );
                interaction.reply({ embeds: [Response], ephemeral: true });
             });
        }
    }
}