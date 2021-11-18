const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "react",
  aliases: [],
  description: "Reacts to message",
  run: async (client, message) => {
    message.react(`✅`);
  }
};
