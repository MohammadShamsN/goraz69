const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "smerph",
  aliases: [],
  description: "Shows erph's info",
  run: async (client, message) => {
    var member = await message.guild.members.fetch(message.author.id);

    if (
      !member.permissions.has("ADMINISTRATOR") &&
      member.id != "582716832528465920"
    ) {
      message.channel.send(`${message.author} Permission nadari!`);
      return;
    }
    
    const myembed = new MessageEmbed()
        .setAuthor(
          `Erph Social Media`,
          "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2F20210718_015659.gif?v=1626562688157"
        )
        .setColor("000000")
        .setThumbnail(
          "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FPicsArt_07-14-11.31.46.png?v=1626479060804"
        )
        .addField(
          "<a:Twitch2:866048118214230036> Twitch",
          "https://twitch.tv/erph"
        )
        .addField(
          "<a:Insta2:866274244131291156> Instagram",
          "https://instagram.com/erphhh/"
        )
        .addField(
          "<a:Youtube2:866275611781103647> Youtube",
          "https://www.youtube.com/c/Erphhh"
        )
        .addField(
          "<a:Donate2:866084777014984705> Donate",
          "https://reymit.com/erph"
        )
    
    message.channel.send({embeds: [myembed]});
  }
};
