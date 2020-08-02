module.exports = {
	name: '8ball',
	// eslint-disable-next-line no-unused-vars
	execute(message, args, client) {
		message.content.split(args);
		const options = ['Yes', 'No', 'H'];
		message.channel.send(`**🎱8Ball!** ${options[Math.floor(Math.random() * options.length)]}`);
	},
};