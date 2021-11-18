const { Client } = require('discord.js');
const fetch = require('node-fetch');
const { red, blue, green } = require('chalk');

/**
 * 
 * @param {Client} client 
 */

module.exports = async(client) => {
    try {
        let ownerID = require("../../config/bot.json").ownerID;
        let user = client.users.cache.get(ownerID);
        if (!user) process.exit(1)
        require('../functions/readyFunction').get(client, red, blue);
        const gitHubPath = 'DevelopersSupportAR/rexom';
        const url = 'https://api.github.com/repos/' + gitHubPath + '/tags';
        const response = await fetch(url);
        const data = await response.json();
        if (data[0].name !== "2.9.8") {
            user.send(`**reXom Have a new update!! :tada:**\n\`${data[0].name}\` is naw available on https://github.com/DevelopersSupportAR/rexom`).catch(() => {})
        }
    } catch {
        console.log('rexom')
    }
};