const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(i) {
		if (i.type === 2) {
			await i.reply(`This server is ${i.guild.name} and has ${i.guild.memberCount} members.`);
		}
		else {
			await i.reply(`This server is ${i.guild.name} and has ${i.guild.memberCount} members.`);
		}
	},
};
