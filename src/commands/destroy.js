module.exports = {
	name: '8ball',
	// eslint-disable-next-line no-unused-vars
	execute(message, args, client) {
		const content = message.content.split(`${client.config.prefix}8ball `);
		message.channel.send(`The bot will now begin destroying ${content}`).then(() => {
			message.channel.send(`**💣 Destruction!** Successfully destroyed ${content}`);
		});

	},
};