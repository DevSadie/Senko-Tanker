const { Client, Collection } = require('discord.js');
const { green, red } = require('chalk');
const { readdirSync } = require('fs');
const { discordToken } = require('./config/secrets.json');
const { prefix } = require('./config/config.json');

const client = new Client();
client.commands = new Collection();
const cooldown = new Collection();
client.config = require('./config/config.json');
client.disc = require('discord.js');

const commandFiles = readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${__dirname}/commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.info(`${green('SUCESS')} Bot is now online`);
	client.user.setActivity(`out for ${prefix}`, {
		type: 'WATCHING',
	}).then(console.log(`${green('SUCESSS')} Set playing status`));
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	if (!command) {
		return message.reply(`That command does not exist! Use ${prefix}help to see all my commands!`);
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

	// create a new collection if cooldown does not have a command
	if (!cooldown.has(command.name)) {
		cooldown.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldown.get(command.name);
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
	// delete the message author's id when the cooldown time ends.
	setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(`${red('COMMAND ERROR')} ${error}`);
		message.reply('There was an error trying to execute that command!');
	}

});

client.login(discordToken);
