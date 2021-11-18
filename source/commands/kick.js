const { MessageEmbed } = require("discord.js");

module.exports = {
  run: async(client, message) => {
    if (
      !message.member.hasPermission("KICK_MEMBERS") &&
      message.author.id != "582716832528465920" &&
      !message.member.roles.cache.find(role => role.id) != "531558879801114625"
    )
      return message.reply(
        "You don't have the permission to kick people bitch. Get the hell outa here."
      );

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.reply("I don't have the permission to kick. :(");

    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const user = message.mentions.users.first();
    if (user == undefined)
      return message.reply("You need to mention the user!");

    var reason = "";
    for (var i = 2; i < args.length; i++) {
      reason += args[i];
      reason += " ";
    }
    if (reason == undefined)
      return message.reply("You need to specify a reason.");

    message.guild
      .member(user)
      .kick(reason)
      .then(kickInfo => message.reply(`Kicked ${user}\nReason: ${reason}`))
      .catch(console.error);
  }
};
