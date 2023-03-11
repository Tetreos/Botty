const { deploy } = require('./deploy-commands');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ActivityType, Events, Collection } = require('discord.js');

const dotenv = require("dotenv")
require('dotenv').config()
const TOKEN = process.env.TOKEN
const GUILDID = process.env.GUILDID

const prefix = '!'

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	client.user.setStatus('dnd');
	client.user.setActivity('JoJo\'s Bizarre Adventure', { type: ActivityType.Watching });
});

/*
client.on('messageCreate', async (message) => {
	if (message.content.toLowerCase().startsWith(prefix)) {
		try {
			const command = client.commands.get(message.content.slice(1));
			command.execute(message, client);
		} catch (error) {
			console.error(error);
			await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
*/

client.login(TOKEN);