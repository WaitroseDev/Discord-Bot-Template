const fs = require("fs");
const Enmap = require("enmap");

module.exports = async (bot) => {
    bot.commands = new Enmap();
    bot.aliases = new Enmap();

    fs.readdir('./commands/', (err, categories) => {
        if (err) console.log(err);
        bot.logger.log(`Found total ${categories.length} category.`);
        categories.forEach(category => {
            fs.readdir(`./commands/${category}`, (err, files) => {
                if (err) console.log(err);
                files.forEach(file => {
                    try {
                        if (!file.endsWith('.js')) return;
                        let props = require(`../commands/${category}/${file}`);
                        bot.commands.set(props.help.name, props);

                        if (props.help.aliases) props.help.aliases.forEach(alias => {
                            bot.aliases.set(alias, props.help.name);
                        });

                        bot.logger.cmd(`Loaded ${file} as ${props.help.name} successfully`)
                    } catch (err) {
                        bot.logger.error(`Failed to load ${file} :: ${err}`)
                    }
                });
            });
        });
    });
}