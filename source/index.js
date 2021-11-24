require('dotenv').config();
const { Collection } = require('discord.js');
const client = require('./client/discord');
const player = require('./client/player');
const commands = new Collection();
const { login, register } = require('./structures/build');
new login({ client: client });
new register({ dir: __dirname, commands: commands, player: player, client: client });

const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX
};
client.config = config;
client.queue = new Map();

var https = require("https");
var bodyParser = require("body-parser");
var request = require("request-promise");
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var accessToken; // Don't touch this. Mersi Ah
var subid; // Don't touch this too
var callback = "https://bote-erph.glitch.me";
var streamers = [
  "167583973", // Erph
  "260645620", // Hesamadl
  "186826987" // ShayanVandal
]; // ShayanVandal

var colors = [
  "080808", // Erph
  "E15F19", // Hesamadl
  "2596be" // ShayanVandal
];

var thumbnails = [
  "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FPicsArt_07-14-11.31.46.png?v=1628439675571", // Logo Erph
  "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FADL.jpg?v=1628439673773", // Logo Hesamadl
  "https://cdn.glitch.com/88d04f2d-1085-4493-a223-9abd169835de%2FInstaProfile_20210716_002633673-LARGE.jpg?v=1628439673323" // ShayanVandal
];

// Authenticate
const options = {
  url: "https://id.twitch.tv/oauth2/token",
  headers: {
    Accept: "application/json"
  },
  json: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials"
  }
};

request
  .post(options, (error, response, body) => {
    if (response.statusCode != 200) {
      console.log(body);
      return;
    }
    accessToken = "Bearer " + body["access_token"];
    console.log(`[INFO] Access token: ${accessToken}`);

    // Stream live event subscription
    for (var i = 0; i < streamers.length; i++) {
      request
        .post(
          {
            url: "https://api.twitch.tv/helix/eventsub/subscriptions",
            headers: {
              "Content-Type": "application/json",
              "Client-ID": process.env.CLIENT_ID,
              Authorization: accessToken
            },
            json: {
              type: "stream.online",
              version: "1",
              condition: {
                broadcaster_user_id: streamers[i]
              },
              transport: {
                method: "webhook",
                callback: callback + "/webhooks/callback",
                secret: process.env.CLIENT_SECRET
              }
            }
          },
          (error, response, body) => {
            if (error) console.log(error);
          }
        )
        .catch(function(err) {
          //console.error(err); // This will print any error that was thrown in the previous error handler.
        });
    }
  })
  .catch(function(err) {
    //console.error(err); // This will print any error that was thrown in the previous error handler.
  });

app.post("/webhooks/callback", async (req, res) => {
  if (
    req.body.subscription["status"] == "webhook_callback_verification_pending"
  ) {
    res.contentType("text/plain");
    res.send(req.body["challenge"]);
    console.log("[INFO] Callback confirmation sent");
    subid = req.body.subscription.id;
  } else if (
    req.body.subscription["status"] == "enabled" &&
    req.body.subscription["type"] == "stream.online"
  ) {
    // Stream is live
    res.sendStatus(200);

    var userid = req.body.subscription.condition["broadcaster_user_id"];
    var username = req.body.event["broadcaster_user_name"];
    var game; // Don't touch this
    var viewers; // Don't touch this
    var thumbnail; // Don't touch this
    var title; // Don't touch this
    var streamurl; // Don't touch this

    // ===================================================================================================================
    // Getting stream information
    await request.get(
      {
        url: `https://api.twitch.tv/helix/streams?user_id=${userid}`,
        headers: {
          "Content-Type": "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: accessToken
        }
      },
      (error, response, body) => {
        if (error) console.log(error);

        var obj = JSON.parse(body);
        game = obj.data[0].game_name;
        viewers = obj.data[0].viewer_count;
        thumbnail = obj.data[0].thumbnail_url;
        if (thumbnail !== undefined) {
          thumbnail = thumbnail.replace("{width}", "1920");
          thumbnail = thumbnail.replace("{height}", "1080");
        }
        title = obj.data[0].title;
        streamurl = `https://twitch.tv/${obj.data[0].user_login}`;
      }
    );

    // Sending message to discord
    for (var i = 0; i < streamers.length; i++) {
      if (userid == streamers[i]) {
        // send message to discord
        client.channels.cache
          .get(process.env.ALERT_CHANNEL_ID)
          .send({
            content: `Hey @everyone, ${username}, is now live on https://www.twitch.tv/${username} ! Go check it out!`,
            embed: {
              color: colors[i],
              author: {
                name: username,
                icon_url:
                  "https://cdn.discordapp.com/attachments/787804906006380605/867105422275903518/tenor.gif"
              },
              image: {
                url: `${thumbnail}`
              },
              thumbnail: {
                url: thumbnails[i]
              },
              title: `${username} is now live on twitch!`,
              url: streamurl,
              fields: [
                {
                  name: "Game",
                  value: `${game}`,
                  inline: true
                },
                {
                  name: "Viewers",
                  value: `${viewers}`,
                  inline: true
                }
              ]
            }
          })
          .then(message => {
            if (userid == "167583973")
              message.react("<:erphGachi:872781918809260053>");
            else if (userid == "260645620")
              message.react("<:HesamGreetin:866306735420473375>");
            else if (userid == "186826987")
              message.react("<:VandalWTF:870764138522091531>");
          });
      }
    }
  }
});

// Starting the server
app.listen(3000, () => {
  console.log("[EXPRESS] Started listening on port 3000");
});



module.exports = {
    commands: commands,
    client: client,
    player: player
};