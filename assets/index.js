"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let shell         = require("electron").shell;
let electron      = require("electron");
let BrowserWindow = electron.remote.BrowserWindow;
let remote        = require("electron").remote;

let log          = require(__dirname + "/../utils/logger");
let updateStatus = require(__dirname + "/../utils/discordHandler");
let Store        = require(__dirname + "/../utils/appData");

const store = new Store();

window.$ = window.jQuery = require("jquery");

let isset = function(obj){ return !!(obj && obj !== null && (typeof obj === "string" && obj !== "")); }

let openUri = function(url){ shell.openExternal(url); };


window.onload = () => {
    let win = remote.getCurrentWindow();
    //let currentWindow = remote.getCurrentWindow().removeAllListeners();
    
    win.setMinimumSize(400, 650);
    win.setTitle(win.getTitle() + " - Changer");

    //currentWindow.on("", function(){ ... });
}

$(document).ready(function(){

    let injectToken  = store.get("token");
    let injectStatus = store.get("status");

    if (isset(injectToken))  $("#token").val(injectToken);
    if (isset(injectStatus)) $("#status").val(injectStatus);

    if ($("#status").val().replace(/\s/g, "").length > 0) $("#status-label").hide();
    if ($("#token").val().replace(/\s/g, "").length > 0)  $("#token-label").hide();

    $("#status").on("keydown keyup keypress paste click", function(){
        $("#status").val().replace(/\s/g, "").length > 0 ? $("#status-label").hide() : $("#status-label").show();
    });

    $("#token").on("keydown keyup keypress paste click", function(){
        $("#token").val().replace(/\s/g, "").length > 0 ? $("#token-label").hide() : $("#token-label").show();
    });

    $("#t-help").on("click", function(e){
        let top = remote.getCurrentWindow();

        let wHeight = 200;
        let wWidth  = 800;

        let bounds = electron.screen.getPrimaryDisplay().bounds;
        let x = Math.ceil(bounds.x + ((bounds.width  - wWidth)  / 2));
        let y = Math.ceil(bounds.y + ((bounds.height - wHeight) / 2));

        let child = new BrowserWindow({ 
            resizable: false, 
            parent:    top,
            width:     800, 
            heigth:    200,  
            x:         x,
            y:         y,
            modal:     true, 
            show:      false 
        });

        child.loadURL(`file://${__dirname}/../views/help.html`);
        child.once("ready-to-show", () => { child.show(); });
    });

    $("#submit").on("click", function(e){
        let err = [];

        let utoken = $("#token").val();
        let status = $("#status").val();

        if (!isset(utoken)) err.push("Token is not set.");
        if (!isset(status)) err.push("Status text is empty.");

        if (err.length >= 1){
            let errtxt = "Please correct the following errors:\n\n";
            for (let i in err) errtxt += "- " + err[i] + "\n";
            return alert(errtxt);
        }

        updateStatus(utoken, status, function(err){
            if (err) return alert("Error: " + err);

            store.set("token", utoken);
            store.set("status", status);

            alert("Status updated!");
        });
    });

    $("#delete").on("click", function(e){
        store.set("token", "");
        store.set("status", "");

        $("#token").val("");
        $("#status").val("");

        alert("Records Deleted!");
    });

    $("#login-link").on("click", function(e){ openUri("https://discordapp.com/login"); });

    $("#help-credit").on("click", function(e){ openUri("https://github.com/TheRacingLion/Discord-SelfBot/wiki/Discord-Token-Tutorial"); });
});
