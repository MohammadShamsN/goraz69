const { MessageEmbed, Client, User, ReactionCollector } = require('discord.js');
const db = require('quick.db');
const emojis = require('../../config/emojis.json');
const { player } = require('../index');
const colors = require('../../config/colors.json');
/**
 * 
 * @param {Client} client 
 * @param {ReactionCollector} reaction 
 * @param {User} user 
 */

module.exports = async(client, reaction, user) => {
    try {
        let data = db.fetch(`SeTupInFo_${reaction.message.guild.id}`);
        if (data !== null) {
            if (user.bot) return;
            if (reaction.message.id == data.msgID) {
                if (!reaction.message.guild.members.cache.get(user.id).voice.channel) reaction.message.channel.send({ content: emojis.error + ' | please join a voice channel first!' });
                if (reaction.message.guild.me.voice.channel) {
                    if (reaction.message.guild.members.cache.get(user.id).voice.channel.id !== reaction.message.guild.me.voice.channel.id) reaction.message.channel.send({ content: emojis.error + ' | you must join an same voice channel iam in <#' + reaction.message.guild.me.voice.channel ? reaction.message.guild.me.voice.channel.id : 0 + '>!' });
                }
                let queue = player.getQueue(reaction.message);
                if (reaction.emoji.name == "⏯️") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            if (queue.paused == true) player.resume(reaction.message)
                            else player.pause(reaction.message)
                        }
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "⏹️") {
                    try {
                        reaction.message.edit({
                            embeds: [
                                new MessageEmbed()
                                .setAuthor("No song playing currently")
                                .setColor(colors.error)
                                .setImage("https://media.discordapp.net/attachments/743880363331420241/902711609112264804/unknown.png")
                            ],
                        });
                        reaction.users.remove(user.id)
                        player.stop(reaction.message)
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "⏭️") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            if (queue.songs.map((song, i) => i).length == 1) return player.stop(reaction.message);
                            setTimeout(() => {
                                reaction.message.edit({
                                    embeds: [
                                        new MessageEmbed()
                                        .setAuthor(require('../music/playSong').song.name || "No song playing currently")
                                        .setColor(colors.error)
                                        .setImage(require('../music/playSong').song.thumbnail || "https://media.discordapp.net/attachments/743880363331420241/902711609112264804/unknown.png")
                                    ],
                                });
                            }, 2000);
                            player.skip(reaction.message)
                        }
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "🔄") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            if (queue.repeatMode == 0) player.setRepeatMode(reaction.message, parseInt(1))
                            if (queue.repeatMode == 1) player.setRepeatMode(reaction.message, parseInt(0))
                        }
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "🔀") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            player.shuffle(reaction.message)
                        }
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "🔉") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            let vol = queue.volume;
                            player.setVolume(reaction.message, Number(vol) - 10)
                        }
                    } catch {
                        console.log('')
                    }
                } else if (reaction.emoji.name == "🔊") {
                    try {
                        reaction.users.remove(user.id)
                        if (queue) {
                            let vol = queue.volume;
                            player.setVolume(reaction.message, Number(vol) + 10)
                        }
                    } catch {
                        console.log('')
                    }
                }
            }
        }
    } catch {
        console.log('rexom')
    }
	
	var ticket = require('./ready');
  const ticketChannels = ticket.channels;
  const channel = ticketChannels.get(reaction.message.channel.id);
  
  const reactionEmoji = ticket.reactionEmoji;
  
  const ticketMessages = ticket.messages;
  const message = ticketMessages.get(reaction.message.id);
  
  const openTickets = ticket.openTickets;
  
  
  if(user.bot) return;
  
  // Create ticket
  if(message && message.id == reaction.message.id) {
    if(reactionEmoji == reaction._emoji.name) {
      channel.guild.channels.create(`ticket-${user.username}`).then(chnl => {
        chnl.setParent(channel.parent);
        chnl.send('Ticket ijad shod. PM bezar admina javab midan <:sumK:814618933063319562>').then(msg => {
          openTickets.set(msg.id, msg);
          msg.react('✅');
        });
      });
    }
    reaction.remove().then(reaction => {
      message.react('🗒️');
    });
  }
  else {  
    // Close ticket  
    const ourTicket = await openTickets.get(reaction.message.id);
    if(ourTicket) {
      if(reaction._emoji.name === '✅') {
        reaction.message.channel.delete();
      }
    }
  }
  
  
  
  
  if(user.bot) return;
  
  // Create ticket
  if(message && message.id == reaction.message.id) {
    if(reactionEmoji == reaction._emoji.name) {
      channel.guild.channels.create(`ticket-${user.username}`).then(chnl => {
        chnl.setParent(channel.parent);
        chnl.send('Ticket ijad shod. PM bezar admina javab midan <:sumK:814618933063319562>').then(msg => {
          openTickets.set(msg.id, msg);
          msg.react('✅');
        });
      });
    }
    reaction.remove().then(reaction => {
      message.react('🗒️');
    });
  }
  else {  
    // Close ticket  
    const ourTicket = await openTickets.get(reaction.message.id);
    if(ourTicket) {
      if(reaction._emoji.name === '✅') {
        reaction.message.channel.delete();
      }
    }
  }
};