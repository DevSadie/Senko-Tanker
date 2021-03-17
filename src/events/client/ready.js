const winston = require('winston');
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/combined.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

module.exports = () => {
    // init log start
    logger.log('info', 'Bot is now online');

    // send alert for profile info
    logger.log('info', 'Set profile info')

    // send alert for activity + status
    logger.log('info', 'Set playing status');
};