const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clyde')
		.setDescription('Test interaction with Clyde'),
	async execute(i) {
		await i.reply('@Clyde ping');
	},
};
