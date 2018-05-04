"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let fs = require("fs");

let Discord = require("discord.js");
let pj      = require("./package.json");

require.extensions['.json'] = function (module, filename) { module.exports = fs.readFileSync(filename, "utf8"); };
var jsondata = require('./config.json');
var raw      = JSON.parse(jsondata);

var token = raw.bot.token;

let log = function(txt, err){
    const date = new Date();
    let hour = date.getHours(),
        min  = date.getMinutes(),
        sec  = date.getSeconds();

    hour  = (hour < 10 ? "0" : "") + hour;
    min   = (min  < 10 ? "0" : "") + min;
    sec   = (sec  < 10 ? "0" : "") + sec;

    let head = (err ? "[ERROR]" : "[INFO] ");

    console.log(head + " [" + hour + ":" + min + ":" + sec + "] - " + txt);
};

let isset = function(obj){ return !!(obj && obj !== null && (typeof obj === "string" && obj !== "")); }

console.log(
    "\n" +
    " ###############################\n" +
    " #- - - - - - - - - - - - - - -#\n" +
    " # Starting PLAYINGBot: v" + pj.version + " #\n" +
    " #- - - - - - - - - - - - - - -#\n" +
    " ###############################\n" +
    "\n" +
    "Copyright (c) " + (new Date()).getFullYear() + " NullDev\n"
);

log("Logging in...");

if (!isset(token)){
    log("No Token Provided. Exiting...", true);
    process.exit(1);
}

var client = new class Client extends Discord.Client {
    constructor() {
        super({ fetchAllMembers: true });
        this.on("ready", () => { 
            log(`Logged in as ${client.user.tag}`);
            this.user.setActivity("testing my selfbot...");
            log("Started."); 
        });
        this.login(token);
    }
};
