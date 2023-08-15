'use strict';
try {
 var _mineflayer = require("mineflayer");
 var _axios = require("axios");
 var _validUrl = require("valid-url");
 var _pathfinder = require("mineflayer-pathfinder").pathfinder;
 var _Movements = require("mineflayer-pathfinder").Movements;
 var _GoalBlock = require("mineflayer-pathfinder").goals.GoalBlock;
 var _rl = require("readline");
 var _chalk = require("chalk");
 var _figlet = require("figlet");
} catch (_0x4bfe5d) {
 console.log("1 or more required modules is not installed.");
 process.exit(1);
}
var mineflayer = require("mineflayer");
var axios = require("axios");
var validUrl = require("valid-url");
var pathfinder = require("mineflayer-pathfinder").pathfinder;
var Movements = require("mineflayer-pathfinder").Movements;
var GoalBlock = require("mineflayer-pathfinder").goals.GoalBlock;
var rl = require("readline");
var chalk = require("chalk");
var figlet = require("figlet");
var readline = rl.createInterface({
 input : process.stdin,
 output : process.stdout
});
var error = void 0;
function start() {
 console.clear();
 if (error) {
   console.log(error);
 }
 var lines = figlet.textSync("ADBOT", {
   font : "Doom",
   horizontalLayout : "default",
   verticalLayout : "default"
 });
 console.log(chalk.rgb(255, 0, 0).bold(lines));
 console.log(chalk.gray("by MyRAT"));
 readline.question(chalk.cyan("Enter your SSID: "), async function(token) {
   if (token) {
     try {
       var _0x3d0f77 = await axios.get("https://api.minecraftservices.com/minecraft/profile", {
         headers : {
           Authorization : "Bearer " + token
         }
       });
     } catch (_0x54bd2c) {
       error = chalk.red("Invalid SSID.");
       start();
       return;
     }
   } else {
     error = chalk.red("Please enter an SSID.");
     start();
     return;
   }
   readline.question(chalk.cyan("Enter time in seconds: "), async function(label) {
     if (isNaN(parseInt(label))) {
       error = chalk.red("Time must be a valid number of seconds.");
       start();
       return;
     }
     readline.question(chalk.cyan("Enter option (bedwars or dungeon): "), async function(canCreateDiscussions) {
       if (canCreateDiscussions !== "bedwars" && canCreateDiscussions !== "dungeon") {
         error = chalk.red('Invalid option "' + canCreateDiscussions + '". Please choose either "bedwars" or "dungeon".');
         start();
         return;
       }
       readline.question(chalk.cyan('Enter messages separated by "~" (e.g.: Message1~Message2~etc...): '), async function(clusterShardData) {
         if (!clusterShardData) {
           error = chalk.red("Please enter at least 1 message.");
           start();
           return;
         }
         readline.question(chalk.cyan('Enter party messages separated by "~" (e.g.: Message1~Message2~etc...): '), async function(certFileContent) {
           if (!certFileContent) {
             error = chalk.red("Please enter at least 1 party message.");
             start();
             return;
           }
           readline.question(chalk.cyan("Enter webhook (or leave blank): "), async function(url) {
             async function get(accessToken) {
               try {
                 var geckoTable = await axios.get("https://api.minecraftservices.com/minecraft/profile", {
                   headers : {
                     Authorization : "Bearer " + accessToken
                   }
                 });
                 return geckoTable.data;
               } catch (_0x290751) {
                 _0x290751 = chalk.red("Invalid SSID.");
                 start();
                 return;
               }
             }
             async function init(accessToken) {
               function move() {
                 if (_sizeAnimateTimeStamps.length === 0) {
                   _0x47fbd4 = false;
                   return;
                 }
                 var value = _sizeAnimateTimeStamps.shift();
                 console.log("Processing party invite from " + value);
                 if (url) {
                   try {
                     axios.post(url, {
                       username : "MyRAT Adbot",
                       content : "Processing party invite from " + value
                     });
                   } catch (_0x269e28) {
                     console.log("Invalid WEBHOOK.");
                   }
                 }
                 self.chat("/party accept " + value);
                 inventoryKeys.push(value);
                 next(charListNotLatin.slice(), function() {
                   self.chat("/p leave");
                   move();
                 });
               }
               function next(f, ret) {
                 if (f.length === 0) {
                   ret();
                   return;
                 }
                 var value = f.shift();
                 console.log("Sending party message: " + value);
                 setTimeout(function() {
                   self.chat("/pc " + value);
                 }, 1000);
                 setTimeout(function() {
                   next(f, ret);
                 }, 4000);
               }
               var response = await get(accessToken);
               var username = response.name;
               var engineSyncs = response.id;
               console.log(username, engineSyncs);
               var options = {
                 host : "hypixel.net",
                 port : 25565,
                 version : "1.8.9",
                 username : username,
                 session : {
                   accessToken : accessToken,
                   clientToken : engineSyncs,
                   selectedProfile : {
                     id : engineSyncs,
                     name : username
                   }
                 },
                 auth : "mojang",
                 skipValidation : true
               };
               var self = mineflayer.createBot(options);
               self.loadPlugin(pathfinder);
               var _sizeAnimateTimeStamps = [];
               var i = 1;
               self.on("kicked", async function(permissions, canCreateDiscussions) {
                 var p = JSON.parse(permissions);
                 var size = p.extra[0].text;
                 if (url) {
                   try {
                     await axios.post(url, {
                       username : "MyRAT Adbot",
                       content : "Kicked from the server for reason: " + size
                     });
                   } catch (error) {
                     console.log("Invalid WEBHOOK.");
                   }
                 }
                 console.log("Bot has been kicked: " + permissions);
                 process.exit();
               });
               var _0x59500e = false;
               var _0x47fbd4 = false;
               self.on("message", function(pingErr, canCreateDiscussions, isSlidingUp) {
                 var conv_reverse_sort = pingErr.toString();
                 if (!conv_reverse_sort.includes("Defense") && !conv_reverse_sort.includes("Mana")) {
                   console.log(conv_reverse_sort);
                 }
                 var args = conv_reverse_sort.match(/^-{53}\n(?:\[.+\] )?(\w+) has invited you to join (?:\[.+\] )?(\w+)? party!\nYou have 60 seconds to accept\. Click here to join!\n-{53}$/);
                 if (args) {
                   var arg = args[1];
                   console.log("Received party invite from " + arg);
                   _sizeAnimateTimeStamps.push(arg);
                   if (!inventoryKeys.includes(arg) && !_0x47fbd4) {
                     _0x47fbd4 = true;
                     move();
                   }
                 }
                 if (conv_reverse_sort.includes("You were kicked") && canCreateDiscussions == "dungeon") {
                   setTimeout(function() {
                     self.chat("/l");
                   }, 1000);
                   setTimeout(function() {
                     self.chat("/play sb");
                   }, 2000);
                 }
                 if (conv_reverse_sort.includes("joined the lobby!") && canCreateDiscussions == "dungeon") {
                   setTimeout(function() {
                     self.chat("/play sb");
                   }, 1000);
                 }
                 if (conv_reverse_sort.includes("Find out more here: www.hypixel.net/mutes") && canCreateDiscussions == "dungeon") {
                   if (url) {
                     try {
                       axios.post(url, {
                         username : "MyRAT Adbot",
                         content : "This account is muted in hypixel, terminating session..."
                       });
                     } catch (_0x412695) {
                       console.log("Invalid WEBHOOK.");
                     }
                   }
                   process.exit();
                 }
                 if (conv_reverse_sort.includes("You need to have visited this island at least once before fast traveling to it!")) {
                   _0x59500e = true;
                   self.chat("/hub");
                   var dest_w = new Movements(self);
                   self.pathfinder.setMovements(dest_w);
                   self.pathfinder.setGoal(new GoalBlock(-12, 70, -71));
                   setTimeout(function() {
                     self.pathfinder.setGoal(new GoalBlock(-44, 88, 13));
                   }, 2000);
                   self.chat("/is");
                   _0x59500e = false;
                 }
               });
               if (canCreateDiscussions == "bedwars") {
                 self.once("spawn", function() {
                   console.log("Bot is ready!");
                   setTimeout(function() {
                     self.chat("/status online");
                   }, 1000);
                   setTimeout(function() {
                     self.chat("/p leave");
                   }, 2000);
                   setTimeout(function() {
                     self.chat("/language english");
                   }, 2000);
                   setTimeout(function() {
                     self.chat("/l bw");
                   }, 4000);
                   setTimeout(function() {
                     self.chat("/swaplobby 1");
                   }, 5000);
                   setTimeout(function() {
                     self.chat("/ac " + array[0]);
                   }, 6000);
                   setInterval(function() {
                     self.chat(array[i]);
                     i = (i + 1) % array.length;
                   }, 60000);
                   setInterval(function() {
                     self.setControlState("jump", true);
                     setTimeout(function() {
                       self.setControlState("jump", false);
                     }, 500);
                   }, 90000);
                 });
               }
               if (canCreateDiscussions == "dungeon") {
                 self.once("spawn", function() {
                   console.log("Bot is ready!");
                   setTimeout(function() {
                     self.chat("/play sb");
                   }, 1000);
                   setTimeout(function() {
                     self.chat("/status online");
                   }, 2000);
                   setTimeout(function() {
                     self.chat("/language english");
                   }, 3000);
                   setTimeout(function() {
                     self.chat("/p leave");
                   }, 4000);
                   setTimeout(function() {
                     self.chat("/warp dungeon_hub");
                   }, 5000);
                   setTimeout(function() {
                     setInterval(function() {
                       if (!_0x59500e) {
                         self.chat("/warp dungeon_hub");
                         setTimeout(function() {
                           var i = Math.floor(Math.random() * array.length);
                           var value = array[i];
                           self.chat("/ac " + value);
                           setTimeout(function() {
                             self.chat("/is");
                           }, 1000);
                         }, 1000);
                       }
                     }, 5000);
                   }, 30000);
                 });
               }
               self.on("error", function(origErr) {
                 console.log("Error: " + origErr.message);
               });
             }
             if (url && !validUrl.isUri(url)) {
               error = chalk.red("Invalid webhook.");
               start();
               return;
             }
             if (url) {
               try {
                 var oStartData = await axios.get(url);
                 if (oStartData.status === 200) {
                 } else {
                   error = chalk.red("Invalid webhook.");
                   start();
                   return;
                 }
               } catch (_0x3141a8) {
                 _0x3141a8 = chalk.red("Invalid webhook.");
                 start();
                 return;
               }
             }
             if (!token || !label || !clusterShardData || !certFileContent || !canCreateDiscussions) {
               error = chalk.red("Please enter all required options.");
               start();
               return;
             }
             var ngiScroll_timeout = parseInt(label) * 1000;
             var array = clusterShardData.split("~");
             var charListNotLatin = certFileContent.split("~");
             var inventoryKeys = [];
             init(token);
             setTimeout(function() {
               console.log("Time's up! Closing the window...");
               process.exit();
             }, ngiScroll_timeout);
           });
         });
       });
     });
   });
 });
}
start();