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
	
	// Ticket 
  var channelExists = false;
  var allTicketChannels = new Map();
  module.exports.channels = allTicketChannels;
  var allTicketMessages = new Map();
  module.exports.messages = allTicketMessages;
  var openTickets = new Map();
  module.exports.openTickets = openTickets;
  
  client.guilds.cache.map(guild => {
    guild.channels.cache.map(channel => { // If channel exists, don't create another
      if(channel.name == '«-ticket-»') {
        channelExists = true;
        allTicketChannels.set(channel.id, channel);
        channel.send('Baraye sakhtane tickete jadid, be in payam react konid!').then(message => {
          allTicketMessages.set(message.id, message);
          const reaction = '🗒️';
          module.exports.reactionEmoji = reaction;
          message.react(reaction);
        });
      }
    })
    if(!channelExists) {    
      guild.channels.cache.map(channel => { // find ticket category
        if(channel.name == 'Tickets' && channel.type == 'category') {
          guild.channels.create('«-ticket-»').then(channel2 => { // Create default ticket channel
            channel2.setParent(channel);
            allTicketChannels.set(channel2.id, channel2);
            channel2.send('Baraye sakhtane tickete jadid, be in payam react konid!').then(message => {
              allTicketMessages.set(message.id, message);
              const reaction = '🗒️'
              module.exports.reactionEmoji = reaction;
              message.react(reaction);
            });
          });
        }
      })
    }
  });
};