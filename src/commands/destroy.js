module.exports = {
	name: 'senkotank',
	// eslint-disable-next-line no-unused-vars
	execute(message, args, client) {
		const content = args.join(' ');
		message.channel.send(`The bot will now begin destroying ${content}`).then(() => {
			message.channel.send(`**💣 Destruction!** Successfully destroyed ${content}`);
		});

	},
};