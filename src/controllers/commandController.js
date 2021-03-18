// fs 
const fs = require('fs');

module.exports = (client, Discord) => {
    // read command files
    const commandFiles = fs.readdirSync(`${client.root}/commands`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        
        // require command
        const command = require(`${client.root}/commands/${file}`);
        
        // set up command name
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}