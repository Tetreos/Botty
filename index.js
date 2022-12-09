// getting all required files
require('./deploy-commands.js');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ActivityType, Events, Collection } = require('discord.js');
const { token } = require('./config.json');
const prefix = '!'

// setup client
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
	// Set a new item in the Collection with the key as the command name and the value as the exported module
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
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	client.user.setStatus('dnd');
	client.user.setActivity('JoJo\'s Bizarre Adventure', { type: ActivityType.Watching });
});

client.on('messageCreate', async (message) => {
	if (checkCommand(message, 'help')) {
	const reply = await message.reply({ content : 'You triggered the help command!', allowedMentions : { parse: []}})
	}
	if (checkCommand(message, 'ping')) {
	const reply = await message.channel.send(`Latency is ${message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
	}
	if (checkCommand(message, 'test')) {
	const reply = await message.reply({ embeds : [exampleEmbed] })
	}
});

client.login(token);

function checkCommand(message, commandName) {
  return message.content.toLowerCase().startsWith(prefix + commandName);
}