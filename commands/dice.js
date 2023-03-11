const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Roll a dice')
        .addStringOption(option =>
            option.setName('dice')
                .setDescription('The amount of dice you want to throw')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sides')
                .setDescription('The amount of sides the dice should have')
                .setRequired(true)),
	async execute(i) {
        const dice = i.options.getString('dice');
        const sides = i.options.getString('sides');

        if(isNaN(dice) && isNaN(sides)) {
            return i.reply('Not a number!');
        }

        let result = 0
        for(let i = 0; i < dice; i++) {
            result += Math.floor(Math.random() * sides) + 1;
        }

		const Embed = new EmbedBuilder()
		.setAuthor({
			name: `${i.user.username} throws ${dice}d${sides}`,
			iconURL: i.user.avatarURL(),
		})
		.setDescription(`Result is ${result}`)
		await i.reply({ embeds: [Embed] });
	},
};
