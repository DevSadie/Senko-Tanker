const fs = require('fs');
const root = process.cwd();

module.exports = (client, Discord) => {
    const loadDir = (dirs) => {
        const eventFiles = fs.readdirSync(`${root}/src/events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`${root}/src/events/${dirs}/${file}`); 
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, Discord, client));
        }
    }

    ['client', 'server'].forEach(e => loadDir(e));
}