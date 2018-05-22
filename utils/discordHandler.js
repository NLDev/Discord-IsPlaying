"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let Discord = require("discord.js");

let isset = function(obj){ return !!(obj && obj !== null && (typeof obj === "string" && obj !== "")); }

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