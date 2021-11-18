module.exports = {
  name: "setstatus",
  aliases: [],
  description: "set bot's status",
  run: async (client, message, args) => {
  if(message.author.bot) return;
  
  if (!message.guild.members.fetch(message.author.id).then(member => member.permissions.has('MANAGE_ROLES')))
    return message.channel.send(`Permission nadari!`);
  
  args.shift();
  if (
    args.size == 0 ||
    (args[0].toUpperCase() != "STREAMING" &&
      args[0].toUpperCase() != "PLAYING" &&
      args[0].toUpperCase() != "WATCHING" &&
      args[0].toUpperCase() != "LISTENING" &&
      args[0].toUpperCase() != "COMPETING")
  ) return message.channel.send('setstatus [Streaming, Playing, Watching, Listening, Competing] [Text]');
  var status = args[0].toUpperCase();
  args.shift();
  client.user.setActivity(args.join(' '), { type: status });
  message.react("✅");
  }
  };