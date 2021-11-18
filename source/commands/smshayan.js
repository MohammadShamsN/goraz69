const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "smshayan",
  aliases: [],
  description: "Show shayan's info",
  run: async (client, message) => {
    const myembed = new MessageEmbed()
      .setAuthor(
        `shayanvandal Social Media`,
        "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2F20210718_155435.gif?v=1626612968529"
      )
      .setColor("0B3E8A")
      .setThumbnail(
        "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FInstaProfile_20210716_002633673-LARGE.jpg?v=1626609418046"
      )
      .addField(
        "<a:Twitch2:866048118214230036> Twitch",
        "https://twitch.tv/shayanvandal"
      )
      .addField(
        "<a:Insta2:866274244131291156> Instagram",
        "https://instagram.com/shayanvandal"
      )
      .addField(
        "<a:Youtube2:866275611781103647> Youtube",
        "https://youtube.com/shayanvandal"
      )
      .addField(
        "<a:Twitter2:866280731047100426> Twitter",
        "https://twitter.com/shayanvandal"
      )
      .addField(
        "<a:Donate2:866084777014984705> Donate",
        "https://dono.gg/shayanvandal"
      );

    message.channel.send({ embeds: [myembed] });
  }
};
