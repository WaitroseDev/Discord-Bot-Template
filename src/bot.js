// Import discord.js & Enmap
const { Client } = require('discord.js');
const Enmap = require("enmap");

// Create the bot
const bot = new Client({
    fetchAllMembers: true,
    allowedMentions: {
        parse: [
            "users"
        ]
    },
});

// Load config
bot.config = require("./config.js");

// Load cmd, evt & log handlers
require('./handlers/cmd')(bot);
require("./handlers/evt")(bot);
require('./utils/functions')(bot)
bot.logger = require('./utils/log')

// Debugging toggle
if (bot.config.debug) {
    bot.on('error', (e) => console.log(e));
    bot.on('warn', (e) => console.log(e));
    bot.on('debug', (e) => console.log(e))
}

// Log the bot in, aditionally login to Sentry
if (bot.config.production) {
    bot.login(bot.config.prodtoken).catch(err => console.log(err))
    Sentry.init({
        dsn: bot.config.setry_prod
    });
} else if (!bot.config.production) {
    bot.login(bot.config.devtoken).catch(err => console.log(err))
    Sentry.init({
        dsn: bot.config.setry_dev
    });
}