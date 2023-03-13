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

        const Embed = new EmbedBuilder()
		.setAuthor({
			name: `${i.user.username} throws ${dice}d${sides}`,
			iconURL: i.user.avatarURL(),
		})

        if(!isInteger(dice) || !isInteger(sides) || dice <= 0 || sides <= 0) {
            return i.reply('Only positive integers are allowed!');
        }

        let result = 0
        for(let i = 0; i < dice; i++) {
            let tmp = Math.floor(Math.random() * sides) + 1;
            result += tmp;
            Embed.addFields({name: `Dice ${i + 1}`, value: `${tmp}`, inline: true});
        }

		Embed.addFields({name: `Total dice throw`, value: `${result}`, inline: false})
		await i.reply({ embeds: [Embed] });
	},
};
