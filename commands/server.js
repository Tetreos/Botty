const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(i) {
		const Embed = new EmbedBuilder()
		.setAuthor({
			name: `${i.guild.name}`,
			iconURL: i.guild.iconURL({ size: 2048 }),
		})
		.setDescription(`This server has ${i.guild.memberCount} Members.`);
		await i.reply({ embeds: [Embed] });
	},
};
