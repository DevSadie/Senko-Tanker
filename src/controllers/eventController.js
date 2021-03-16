const fs = require('fs');

module.exports = (client, Discord) => {
    const loadDir = (dirs) => {
        const eventFiles = fs.readdirSync(`${client.root}/events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`${client.root}/events/${dirs}/${file}`); 
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, Discord, client));
        }
    }

    ['client', 'server'].forEach(e => loadDir(e));
}