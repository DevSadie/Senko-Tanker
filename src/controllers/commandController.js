const fs = require('fs');
const root = process.cwd();

module.exports = (client, Discord) => {
    const commandFiles = fs.readdirSync(`${root}/src/commands`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`${root}/src/commands/${file}`);
            
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}