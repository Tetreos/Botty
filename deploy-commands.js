const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

const dotenv = require("dotenv")
require('dotenv').config()
const TOKEN = process.env.TOKEN
const CLIENTID = process.env.CLIENTID

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

/* DELETE COMMANDS WHEN NEEDED
rest.put(Routes.applicationCommands(CLIENTID), { body: [] })
.then(() => console.log('Successfully deleted all application commands.'))
.catch(console.error);
*/

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await await rest.put(
            Routes.applicationCommands(CLIENTID),
            { body: commands },
        );        

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
