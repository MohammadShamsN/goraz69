const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emote",
    aliases: [],
    description: "Sends an emote",
  run: async (client, message) => {
    const commands = `<:PepeLove:872638826332438568>`;

    const revised = commands
      .split("\n")
      .map(x => x.trim())
      .join("\n");

    message.channel.send(revised);
  }
};
