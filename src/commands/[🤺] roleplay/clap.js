const Discord = require("discord.js");
const { getMemberFromArguments } = require("../../utils/getters");
const Util = require("../../utils/Util");

module.exports = {
	name: "clap",
	description: "applause someone",
	category: "[🤺] roleplay",
	run: async (client, message, args) => {
		const url = await new Util().nekoapi(module.exports.name);

		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setAuthor({
					name: `${message.author.username} is ${module.exports.name}ping!`,
					iconURL: message.author.displayAvatarURL({ dynamic: true }),
				})
				.setImage(url)
				.setColor("#CD1C6C");

			return message.reply({ embeds: [embed] });
		}

		const target = await getMemberFromArguments(message, args.join(" "));

		if (!target) return message.reply("I didn't found the user with this name");

		if (target.id === message.author.id) {
			const embed = new Discord.MessageEmbed()
				.setAuthor({
					name: `${client.user.username} applauses ${target.user.username}!`,
					iconURL: client.user.displayAvatarURL(),
				})
				.setImage(url)
				.setColor("#CD1C6C");

			return message.reply({ embeds: [embed] });
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor({
				name: `${message.author.username} applauses ${target.user.username}`,
				iconURL: message.author.displayAvatarURL({ dynamic: true }),
			})
			.setImage(url)
			.setColor("#CD1C6C");

		message.reply({ embeds: [embed] });
	},
};
