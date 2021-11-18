module.exports = (client, message, args) => {
  if(message.author.bot) return;
  
  var member = message.guild.member(message.author);
  
  if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES') && member.id != '582716832528465920')
    return message.channel.send('Permission nadari!');
  
  if(args.length < 2)
    return message.channel.send(`Usage: ${process.env.PREFIX}giverole [Mention User] [Role Name]`);
  
  var guild = message.guild;
  var user = message.mentions.users.first();
  args.shift();
  var roleName = args.join(' ');
  
  user = guild.members.cache.find(member => member.id == user.id);
  
  if(!user) return message.channel.send('User not found.');
  
  var role = guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  if(!role) return message.channel.send('Role not found.');
  
  user.roles.add(role).then(member => message.react('✅'));
}