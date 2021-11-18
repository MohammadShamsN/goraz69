module.exports = {
  name: "setprecence",
  aliases: [],
  description: "set bot's precence",
  run: async (client, message, args) => {
  var member = await message.guild.members.fetch(message.author.id);
  
  if (!member.permissions.has('ADMINISTRATOR') && member.id != '')
  {
      message.channel.send(
        `${message.author} Permission nadari!`
      );
        return;
  }
  args.shift();
  if(args.size == 0 || (args[0] !="dnd" && args[0] != "online" && args[0] != "idle" && args[0] != "invisible")) {
    message.channel.send('Options: online, idle, invisible, dnd. Use the command correctly bitch :|');
  }
  else {
    client.user.setPresence({
      status: args[0]
    });
    message.react('✅');
  }
}
}