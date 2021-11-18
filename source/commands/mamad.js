const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mamad",
    aliases: [],
    description: "Mamad Gang",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */
  run: async(client, message, args, prefix, lang) => {

      const commands = 
       `<@446555159510777859> 
       kire mamad = sadrasb`

      const revised = commands
        .split("\n")
        .map((x) => x.trim())
        .join("\n");

    message.channel.send(revised);
    }
  };