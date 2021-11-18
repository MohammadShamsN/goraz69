const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Kicks someone",
  run: async(client, message, args, prefix, lang) => {
    if (
      !message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) &&
      message.author.id != "582716832528465920" &&
      !message.member.roles.cache.find(role => role.id) != "531558879801114625"
    )
      return message.reply(
        "You don't have the permission to kick people bitch. Get the hell outa here."
      );

    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return message.reply("I don't have the permission to kick. :(");

    args = message.content
      .slice(1)
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
      .members
      .fetch(user.id)
      .then(member => {
        member.kick(reason)
        .then(kickInfo => message.reply(`Kicked ${user}\nReason: ${reason}`))
        .catch(console.error);
    })
  }
};
