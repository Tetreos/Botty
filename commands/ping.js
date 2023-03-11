const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns roundtrip time and API latency'),
	async execute(i) {
		const Embed = new EmbedBuilder()
		.setAuthor({
			name: `${i.client.user.username}'s Ping`,
			iconURL: i.client.user.displayAvatarURL({ size: 2048 }),
		})
		.setColor('#fee75c')
		.setDescription(`
		**Latency:** ${i.createdTimestamp - Date.now())} ms
		**API:** ${Math.round(i.client.ws.ping)} ms
		`)
		await i.reply({ embeds: [Embed] });
	},
};
