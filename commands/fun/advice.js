const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    command: 'advice',
    description: 'We all need some advice now and then.',
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('We all need some advice now and then.'),
    run: async (client, interaction) => {
        try {
            const request = await (await axios.get('http://api.adviceslip.com/advice')).data;

            interaction.reply({ embeds: [new MessageEmbed().setDescription(request.slip.advice).setColor("#FFB6C1")]})
        } catch (err) {
            console.log(err);

            const ErrorEmbed = new MessageEmbed();

            ErrorEmbed.setColor("RED");
            ErrorEmbed.setDescription(
                "Oops... The API might be down, try again later."
            );

            interaction.reply({ embeds: [ErrorEmbed] });
        }
    }
}