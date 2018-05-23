"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let Discord = require("discord.js");

let log = require("./logger");

let isset = function(obj){ return !!(obj && obj !== null && (typeof obj === "string" && obj !== "")); }

let updateStatus = function(token, text, callback){
    log("Logging in...", false, true);
    if (!isset(token)){
        log("No Token Provided.", true, true);
        callback("no token");
    }

    let client = new class Client extends Discord.Client {
        constructor() {
            super({ fetchAllMembers: true });
            this.on("ready", () => { 
                log(`Logged in as ${client.user.tag}`, false, true);
                this.user.setActivity(text);
                log("Status updated.", false, true); 
                callback();
            });
            this.on("error", () => {
                log("Invalid Token Provided.", true, true);
                callback("invalid token");
            });
            this.login(token);
        }
    };
};

process.on("unhandledRejection", err => log(`Uncaught Promise Rejection:\n${err}`, true, true));

module.exports = updateStatus;
