const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "discord",
  aliases: [],
  description: "Shows discord info",
  run: async (client, message) => {
    const commands = `<discord:841959253082374145> Discord : https://discord.gg/FbcrFGmZkK`;

    const revised = commands
      .split("\n")
      .map(x => x.trim())
      .join("\n");

    message.reply(revised);
  }
};
