const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "smp7",
  aliases: [],
  description: "Show x's info",
  run: async (client, message) => {
    const myembed = new MessageEmbed()
      .setAuthor(
        `Follow Me On Our Social Media`,
        "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2F20210718_155407.gif?v=1626612977276"
      )
      .setColor("08fcfc")
      .setThumbnail(
        "https://media.discordapp.net/attachments/825067075818356796/893790112868098128/PicsArt_10-02-12.21.31.png"
      )
      .addField(
        "<a:Twitch2:866048118214230036> Twitch",
        "https://twitch.tv/Saeedp7"
      )
      .addField(
        "<a:Insta2:866274244131291156> Instagram",
        "https://instagram.com/Saeedp7"
      )
      .addField(
        "<a:Twitter2:866280731047100426> Twitter",
        "https://twitter.com/Saeedp7"
      )
      .addField(
        "<a:Donate2:866084777014984705> Donate",
        "https://dono.gg/Saeedp7"
      )
      .addField(
        "<a:Discord2:871469574434988072> Discord",
        "https://discord.gg/suMV5Upuah"
      );

    message.channel.send({ embeds: [myembed] });
  }
};
