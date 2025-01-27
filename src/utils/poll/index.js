const { MessageEmbed } = require("discord.js");

const defEmojiList = [
	"\u0031\u20E3",
	"\u0032\u20E3",
	"\u0033\u20E3",
	"\u0034\u20E3",
	"\u0035\u20E3",
	"\u0036\u20E3",
	"\u0037\u20E3",
	"\u0038\u20E3",
	"\u0039\u20E3",
	"\uD83D\uDD1F",
];

const pollEmbed = async (
	msg,
	title,
	options,
	emojiList = defEmojiList.slice()
) => {
	if (!msg && !msg.channel) return msg.channel.send("Channel is inaccessible.");
	if (!title) return msg.channel.send("Poll title is not given.");
	if (!options) return msg.channel.send("Poll options are not given.");
	if (options.length < 2)
		return msg.channel.send("Please provide more than one choice.");
	if (options.length > emojiList.length)
		return msg.channel.send(
			`Please provide ${emojiList.length} or less choices.`
		);

	let text = "*To vote, react using the correspoding emoji.*\n\n";
	const emojiInfo = {};
	for (const option of options) {
		const emoji = emojiList.splice(0, 1);
		emojiInfo[emoji] = { option: option, votes: 0 };
		text += `${emoji} : \`${option}\`\n\n`;
	}
	const usedEmojis = Object.keys(emojiInfo);

	const poll = await msg.channel.send({
		embeds: [embedBuilder(title, msg.author.tag, text)],
	});
	for (const emoji of usedEmojis) await poll.react(emoji);
};

const embedBuilder = (title, author, text) => {
	return new MessageEmbed()
		.setColor("#CD1C6C")
		.setTitle(`Poll - ${title}`)
		.setFooter({ text: `Poll created by ${author}` })
		.setDescription(text);
};

module.exports = pollEmbed;
