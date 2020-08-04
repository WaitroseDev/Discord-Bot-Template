const moment = require('moment');

module.exports = (bot) => {
    bot.getRole = (message, toFind = '') => {
        toFind = toFind.toLowerCase();

        let target = message.guild.roles.cache.get(toFind);
        if (!target && message.mentions.roles)
            target = message.mentions.roles.first();

        if (!target && toFind) {
            target = message.guild.roles.cache.find(role => {
                return role.name.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.member;

        return target;
    };

    bot.getMember = (message, toFind = '') => {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.user.username.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.member;

        return target;
    };

    bot.getChannel = (message, toFind = '') => {
        toFind = toFind.toLowerCase();

        let target = message.guild.channels.cache.get(toFind);

        if (!target && message.mentions.channels)
            target = message.mentions.channels.first();

        if (!target && toFind) {
            target = message.guild.channels.find(channel => {
                return channel.channel.name.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.channel;

        return target;
    };

    bot.getGuild = (message, toFind = '') => {
        toFind = toFind.toLowerCase();

        let target = bot.guilds.cache.get(toFind);

        if (!target)
            target = message.gulid;

        return target;
    };

    bot.currentDT = () => {
        return new moment().format("DD/MM/YYYY HH:mm")
    };

    bot.formatDate = (date) => {
        return new moment(date).format("DD/MM/YYYY HH:mm")
    };
}