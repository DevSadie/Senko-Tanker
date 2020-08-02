module.exports = {
	name: 'ping',
	execute(message, args, client) {
		message.channel.send(`**🏓Pong!** ${client.ws.ping}ms`);
	},
};