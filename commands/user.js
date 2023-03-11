const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(i) {
		const Embed = new EmbedBuilder()
		.setAuthor({
			name: `${i.user.username}`,
			iconURL: i.user.avatarURL(),
		})
		.setDescription(`${i.user.username} has joined on the ${i.member.joinedAt}.`);
		await i.reply({ embeds: [Embed] });
	},
};