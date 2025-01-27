const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
	if (
		!client.welcomes.get(member.guild.id) ||
		!client.welcomes.get(member.guild.id).switch
	)
		return;

	const welcomeObj = client.welcomes.get(member.guild.id);

	const embed = new MessageEmbed();

	if (welcomeObj.authorName) {
		const authorNameEmbed = welcomeObj.authorName
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		if (welcomeObj.authorURL) {
			embed.setAuthor({ name: authorNameEmbed, iconURL: welcomeObj.authorURL });
		} else {
			embed.setAuthor({ name: authorNameEmbed });
		}
	}

	if (welcomeObj.title) {
		const titleEmbed = welcomeObj.title
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		embed.setTitle(titleEmbed);

		if (welcomeObj.titleURL) {
			embed.setURL(welcomeObj.titleURL);
		}
	}

	if (welcomeObj.color) {
		embed.setColor(welcomeObj.color);
	}

	if (welcomeObj.thumbnail) {
		embed.setThumbnail(welcomeObj.thumbnail);
	}

	if (welcomeObj.description) {
		const descriptionEmbed = welcomeObj.description
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{mention}", member.user)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		embed.setDescription(descriptionEmbed);
	}

	if (welcomeObj.image) {
		embed.setImage(welcomeObj.image);
	}

	if (welcomeObj.footerText) {
		const footerTextEmbed = welcomeObj.footerText
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		if (welcomeObj.footerURL) {
			embed.setFooter({ text: footerTextEmbed, iconURL: welcomeObj.footerURL });
		} else {
			embed.setFooter({ text: footerTextEmbed });
		}
	}

	const channel = await member.guild.channels.fetch(welcomeObj.channelID);

	if (!channel || !member.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
		return;

	channel.send({ embeds: [embed] });
};
