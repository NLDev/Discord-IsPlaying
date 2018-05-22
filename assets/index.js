"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let shell = require("electron").shell;
let electron = require("electron");
let BrowserWindow = electron.remote.BrowserWindow;
let remote = require("electron").remote;

window.$ = window.jQuery = require("jquery");

let openUri = function(url){ shell.openExternal(url); };

$(document).ready(function(){
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

    $("login-link").on("click", function(e){ openUri("https://discordapp.com/login"); });

    $("help-credit").on("click", function(e){ openUri("https://github.com/TheRacingLion/Discord-SelfBot/wiki/Discord-Token-Tutorial"); });
});
