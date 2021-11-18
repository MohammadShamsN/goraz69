const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reaction",
  aliases: [],
  description: "Idk",
  run: async (client, message) => {
    const channel = message.channel;
    channel.send(
      "Baraye Daryaft Kardane Role **Game** Va **Sport** Va **Cinema** Roye Reacte Haye Zir Bezanid !\n\n<:Dota:871526772649373766> : `Dota 2`\n\n<:Fortnite:871526724079337572> : `Fortnite`\n\n<:Valo:871526749719130204> : `VALORANT`\n\n<:CSGO:871810054595182672> :  `CS:GO`\n\n<:COD:871816083730989146> : `COD: Warzone`\n\n<:ApexLegends:871526605607030885> : `Apex Legends`\n\n<:SOT:871526638431653948> : `Sea of Thieves`\n\n<:Risk:871526675719008316> : `RISK`\n\n<:Amongus:871526327323353118> : `Among Us`\n\n<:Mafia:872782118806253619> : `Mafia`\n\n<:toop:871536288614993961> : `Sports`\n\n<:cinema:871539814284029974> : `Cinema`"
    );
  }
};
