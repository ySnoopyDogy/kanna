const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
	if (
		!client.leaves.get(member.guild.id) ||
		!client.leaves.get(member.guild.id).switch
	)
		return;

	const leaveObj = client.leaves.get(member.guild.id);

	const embed = new MessageEmbed();

	if (leaveObj.authorName) {
		const authorNameEmbed = leaveObj.authorName
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		if (leaveObj.authorURL) {
			embed.setAuthor({ name: authorNameEmbed, iconURL: leaveObj.authorURL });
		} else {
			embed.setAuthor({ name: authorNameEmbed });
		}
	}

	if (leaveObj.title) {
		const titleEmbed = leaveObj.title
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		embed.setTitle(titleEmbed);

		if (leaveObj.titleURL) {
			embed.setURL(leaveObj.titleURL);
		}
	}

	if (leaveObj.color) {
		embed.setColor(leaveObj.color);
	}

	if (leaveObj.thumbnail) {
		embed.setThumbnail(leaveObj.thumbnail);
	}

	if (leaveObj.description) {
		const descriptionEmbed = leaveObj.description
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{mention}", member.user)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		embed.setDescription(descriptionEmbed);
	}

	if (leaveObj.image) {
		embed.setImage(leaveObj.image);
	}

	if (leaveObj.footerText) {
		const footerTextEmbed = leaveObj.footerText
			.replace("{username}", member.user.username)
			.replace("{tag}", member.user.tag)
			.replace("{server}", member.guild.name)
			.replace("{membercount}", member.guild.memberCount);

		if (leaveObj.footerURL) {
			embed.setFooter({ text: footerTextEmbed, iconURL: leaveObj.footerURL });
		} else {
			embed.setFooter({ text: footerTextEmbed });
		}
	}

	const channel = await member.guild.channels.fetch(leaveObj.channelID);

	if (!channel || !member.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
		return;

	channel.send({ embeds: [embed] });
};
