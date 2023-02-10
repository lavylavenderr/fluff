const mongoose = require('mongoose')
require('dotenv').config()

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`)  
        client.user.setActivity(`fluffbot.xyz`, {type: "WATCHING"})

        if (!process.env.DB) {
            console.log('I could not find the DB string in the .env!')
            return;
        }

        mongoose.connect(process.env.DB).then(() => {
            console.log('Connected to the DB!')
        })
    }
}