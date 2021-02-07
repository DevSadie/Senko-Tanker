const { red } = require('chalk');

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    cooldown: 5,
    args: true,
    usage: '<cmd/alias to reload>',
    execute(message, args, client) {
        if (client.config.owners.includes(message.author.id)) {
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return message.reply(`There is no command with name or alias \`${commandName}\`!`);

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send(`Command \`${command.name}\` was reloaded!`);
            } catch (error) {
                console.error(`${red('RELOAD ERROR')} ${error}`);
                message.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
            }
        } else {
			return message.reply({
				embed: {
					color: client.colors.red,
					title: 'No Permissions',
					description: 'You do not have permission to use that command!',
				},
			});
		}
    }
}