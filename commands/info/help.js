const { SlashCommandBuilder } = require('@discordjs/builders')
const { readdirSync, read } = require('fs')
const { MessageEmbed } = require('discord.js')
const array = require('../../index')

module.exports = {
    command: 'help',
    description: 'Learn about all of Fluff\'s commands here!',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Learn about all of Fluff\'s commands here!')
        .addStringOption(option =>
            option.setName('command').setDescription('The command you would like to fetch information about.')
        ),
    run: async (client, interaction) => {
        const dir = client.commandDir;
        const cmdArray = array.array;
        const commandName = interaction.options.getString('command')

        if (!commandName) {
            const categories = [];
            const categoryemoji = [
                {
                    name: 'actions',
                    value: ':person_standing:'
                },
                {
                    name: 'fun',
                    value: ':tada:'
                },
                {
                    name: 'info',
                    value: ':question:'
                },
                {
                    name: 'moderation',
                    value: ':shield:'
                },
                {
                    name: 'useful',
                    value: ':white_check_mark:'
                }
            ]

            readdirSync(dir).forEach((dirs, index) => {

                const commands = [];

                readdirSync(`${dir}${dirs}`).forEach((file) => {
                    const filteredfile = file.replace('.js', '')

                    commands.push(`/${filteredfile}`)
                })

                const catemoji = categoryemoji.find((c) => c.name && c.name.includes(dirs))
                const uppercase = dirs.charAt(0).toUpperCase() + dirs.slice(1);
                const correctedname = catemoji.value + ` ${uppercase}`

                categories.push({ name: correctedname, commands: commands })
            })

            console.log(categories)

            const Embed = new MessageEmbed()
                .setTitle("Help Menu")
                .setColor("#FFB6C1")
                .setDescription('Get started with Fluff by simply reading this message! This command provides all current commands along with the ability to view details of each individual command.\n\nDo `/help [command]` to fetch its detailed description.')


            categories.forEach((cat) => {
                const { name, commands } = cat;
                Embed.addField(name, commands.join(", "))
            })

            interaction.reply({ embeds: [Embed] })
        } else {
            const command = cmdArray.find((c) => c.name && c.name.includes(commandName)) || false;
            if (!command) {
                return interaction.reply({ content: 'Could not find that command' })
            }

            const Embed = new MessageEmbed()
                .setTitle(`Command: ${command.name}`)
                .setColor("#FFB6C1")
                .setDescription(command.description)

            interaction.reply({ embeds: [Embed] })
        }

    }
}