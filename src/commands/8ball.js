module.exports = {
	name: '8ball',
	// eslint-disable-next-line no-unused-vars
	execute(message, args, client) {
		message.content.split(`${client.config.prefix}8ball `);
		if (message.content === 'Steal the spice trade ') message.channel.send('Not a question but the Dutch did it anyway.');
		message.content.split(args);
		const options = ['Yes', 'No', 'H', 'Probably', 'Probably Not'];
		message.channel.send(`**🎱 8Ball!** ${options[Math.floor(Math.random() * options.length)]}`);
	},
};