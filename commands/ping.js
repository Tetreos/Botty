const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(i) {
		if (i.type === 2) {
			await i.reply(`Latency is ${i.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(i.client.ws.ping)}ms`);
		}
		else {
			await i.reply(`Latency is ${i.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(i.client.ws.ping)}ms`);
		}
	},
};