const { red } = require('chalk');
const embedError = require('../functions/embedError');

module.exports = {
	name: 'eval',
	description: 'Execute code from Discord.',
	category: 'Development',
	args: true,
	usage: '<thing to eval>',
	cooldown: '20',
	execute(message, args, client, Discord) {
		if (client.owners.owners.includes(message.author.id)) {
			try {
				const evaled = eval(args.join(' '));
				message.channel.send({
					embed: {
						color: client.colors.green,
						title: 'Evaluated!',
						description: `\`\`\`js\n${evaled}\`\`\``,
					},
				});
			}
			catch (error) {
				console.error(`${red('EVAL ERROR')}: ${error}`);
				embedError('Eval Error!', `\`\`\`js\n${error}\n\`\`\`` )(client, message);
				// message.reply({
				// 	embed: {
				// 		color: client.colors.red,
				// 		title: 'Evaluation Error!',
				// 		description: `\`\`\`js\n${error}\n\`\`\``,
				// 	},
				// });
			}
		}
		else {
			embedError('No Permission', 'You do not have permission to use that command!')(client, message);
			// return message.reply({
			// 	embed: {
			// 		color: client.colors.red,
			// 		title: 'No Permission',
			// 		description: 'You do not have permission to use that command!',
			// 	},
			// });
		}
	},
};