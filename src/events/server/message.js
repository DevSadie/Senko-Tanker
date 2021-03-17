// prefix checking
const config = require(`${process.cwd()}/src/config/config.json`);
const secrets = require(`${process.cwd()}/src/config/secrets.json`);
const prefix = secrets.alphaState ? config.alphaPrefix : config.prefix;

module.exports = (Discord, client, message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	if (!command) {
		return message.reply({
			embed: {
				color: client.colors.red,
				title: 'That command does not exist!',
				description: `Use ${prefix}help to see all my commands!`,
                timestamp: new Date(),
				footer: {
					text: client.embed.name,
					icon_url: client.embed.logo,
				},
			},
		});
	}

	if (command.args && !args.length) {
		let reply = '**You did not provie arguments arguments!**';
		if (command.usage) {
			reply += `The proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.reply(reply);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);

		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply({
                embed: {
                    color: client.colors.red,
                    title: 'No Permissions',
                    description: 'You do not have permission to use that command',
                    timestamp: new Date(),
                    footer: {
                        text: client.embed.name,
                        icon_url: client.embed.logo,
                    },
                },
            });
		}
	}

	// create a new collection if client.cooldown does not have a command
	if (!client.cooldown.has(command.name)) {
		client.cooldown.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = client.cooldown.get(command.name);
	const cooldownTime = (command.cooldown || 5) * 1000;

	if (timestamps.has(message.author.id)) {
		const expireTime = timestamps.get(message.author.id) + cooldownTime;

		if (now < expireTime) {
			const timeLeft = (expireTime - now) / 1000;
			message.reply(`please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`${command.name}\` command.`);
			return;
		}
	}

	// set the message author's id value in the collection to now.
	timestamps.set(message.author.id, now);

	// delete the message author's id when the client.cooldown time ends.
	setTimeout(() => timestamps.delete(message.author.id), client.cooldownTime);

	try {
		command.execute(message, args, client, Discord);
	}
	catch (error) {
		client.logger.log('error', error);
		message.reply('There was an error trying to execute that command!');
	}
}