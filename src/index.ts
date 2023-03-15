// Importing Crap
import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

// Let's get into the nitty gritty (SO SIMPLE!!)

const client = new SapphireClient({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent], })

const main = async () => {
    try {
        client.logger.info("Logging in...")
        await client.login('MTA3MjcyMDgzOTMxMDU3MzYxOQ.Gabte2.fcf2RvVPYYNiKOf5qCm7NaDzfJfkYYUxBH_yLU')
    } catch (err) {
        client.logger.fatal(err);
		client.destroy();
		process.exit(1);
    }
}

main()