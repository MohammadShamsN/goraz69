const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
    if(!message.member.hasPermission('BAN_MEMBERS') && message.author.id != '582716832528465920' && !message.member.roles.cache.find(role => role.id) != '531558879801114625')
      return message.reply("You don't have the permission to ban people bitch. Get the hell outa here.");
  
    if(!message.guild.me.hasPermission('BAN_MEMBERS'))
      return message.reply("I don't have the permission to ban. :(");
  
    const args = message.content.slice((process.env.PREFIX).length).trim().split(/ +/g);
    const user = message.mentions.users.first();
    if(user == undefined)
        return message.reply("You need to mention the user!");
  
    var reason = "";
    for(var i = 2; i < args.length ;i++) {
        reason += args[i];
        reason += ' ';
    }
    if(reason == undefined)
        return message.reply("You need to specify a reason.");
  
    var options = {
      'days': 0,
      'reason': reason
    };
    message.guild.members.ban(user.id, options)
        .then(kickInfo => message.reply(`Banned ${user}\nReason: ${reason}\nGet rekt bitch.`))
        .catch(console.error);
  
};
