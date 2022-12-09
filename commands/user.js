const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(i) {
		if (i.type === 2) {
			await i.reply(`This command was run by ${i.user.username}, who joined on ${i.member.joinedAt}.`);
		}
		else {
			await i.reply(`This command was run by ${i.author.username}.`);
		}
	},
};