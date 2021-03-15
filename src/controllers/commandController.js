// fs + root dir
const fs = require('fs');
const root = process.cwd();

module.exports = (client, Discord) => {
    // read command files
    const commandFiles = fs.readdirSync(`${root}/src/commands`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        // require command
        const command = require(`${root}/src/commands/${file}`);
        
        // set up command name
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}