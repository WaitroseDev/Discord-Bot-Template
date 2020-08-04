const Enmap = require("enmap");
const fs = require("fs");

module.exports = async (bot) => {
    bot.exports = new Enmap();

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            try {
                let eventFuction = require(`../events/${file}`);
                let eventName = file.split(".")[0];

                bot.on(eventName, (...args) => eventFuction.run(bot, ...args));

                bot.logger.event(`Loaded ${file} successfully`)
            } catch (err) {
                bot.logger.error(`Failed to load ${file} :: ${err}`)
            }
        });
    });
}