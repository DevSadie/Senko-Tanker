module.exports = {
	name: 'ping',
	description: 'Check the amount of time it takes for the bot to handle a request.',
	category: 'Bot',
	execute(message, args, client, Discord) {
		message.channel.send(`**🏓Pong!** ${client.ws.ping}ms`);
	},
};