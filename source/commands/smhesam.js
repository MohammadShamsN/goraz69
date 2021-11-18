const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "smhesam",
  aliases: [],
  description: "Shows hesam's info",
  run: async (client, message) => {
    const myembed = 
      new MessageEmbed()
        .setAuthor(
          `Hesamadl Social Media`,
          "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2F20210718_155158.gif?v=1626612985588"
        )
        .setColor("FF7500")
        .setThumbnail(
          "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FADL.PNG?v=1626609399316"
        )
        .addField(
          "<a:Twitch2:866048118214230036> Twitch",
          "https://twitch.tv/hesamadl"
        )
        .addField(
          "<a:Insta2:866274244131291156> Instagram",
          "https://instagram.com/hesamadl"
        )
        .addField(
          "<a:Donate:866084777014984705> Donate",
          "https://reymit.ir/HesamADL"
        )
    
    message.channel.send({embeds: [myembed]});
  }
};
