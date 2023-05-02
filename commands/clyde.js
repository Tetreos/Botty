const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clyde')
		.setDescription('Test interaction with Clyde'),
	async execute(i) {
		const Embed = new EmbedBuilder()
		.setDescription(`@Clyde`)
		await i.reply({ embeds: [Embed] });
	},
};
