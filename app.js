"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let { app, BrowserWindow, Tray, Menu } = require("electron");

let electron  = require("electron");
let path      = require("path");
let { shell } = require("electron");
let ipc       = require("electron").ipcMain;
let os        = require("os");

global.appRoot = path.resolve(__dirname);

let log    = require(__dirname + "/utils/logger");
let config = require(__dirname + "/utils/configurator");

let version = config.getVersion();
let appname = config.getName();

const debug = true;

global.debug = debug;

if (debug){
    require("electron-context-menu")({
        prepend: (params, browserWindow) => [{
            label: "Rainbow",
            visible: params.mediaType === "image"
        }]
    });
}

let getLogoPath = function(){
    if (os.platform() === "darwin")     return __dirname + "/assets/icon/icon.icns";
    else if (os.platform() === "win32") return __dirname + "/assets/icon/icon.ico";
    else                                return __dirname + "/assets/icon/icon.png";
}

let createWindowConfig = function(){
    let wHeight = 200;
    let wWidth  = 450;

    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = Math.ceil(bounds.x + ((bounds.width  - wWidth)  / 2));
    let y = Math.ceil(bounds.y + ((bounds.height - wHeight) / 2));

    let conf = { 
        resizable: debug, 
        width:     wWidth, 
        heigth:    wHeight, 
        x:         x, 
        y:         y,
        icon:      getLogoPath(), 
        show:      false
    };
    return conf;
}

console.log(
    "\n" +
    " #" + "-".repeat(17 + appname.length) + "#\n" +
    " # Started " + appname + " v" + version + " #\n" +
    " #" + "-".repeat(17 + appname.length) + "#\n\n" +
    "Copyright (c) " + (new Date()).getFullYear() + " NullDev\n"
);

let win;

ipc.on("UI-windowID", function(event){ event.returnValue = win.id; });

app.setName(appname);

app.on("ready", () => {
    log("Started.");
    log("OS is: " + os.platform());
    log("Debug mode is " + (debug ? "en" : "dis") + "abled.");

    let appIcon = new Tray(getLogoPath());

    let contextMenu = Menu.buildFromTemplate([
        {
            label: "Show Window", click: function(){ win.show(); } 
        }, {
            label: "Exit", click: function(){
                app.isQuiting = true;
                app.exit();
            }
        }
    ]);

    appIcon.setContextMenu(contextMenu)

    win = new BrowserWindow(createWindowConfig());
    win.setMenu(null); 
    win.loadURL(`file://${__dirname}/views/app.html`);

    win.on("ready-to-show", () => { win.show(); });
    win.on("closed",        () => { app.exit(); });
    win.on("show",          () => { appIcon.setHighlightMode("always"); });
    win.on("close", function(event){
        event.preventDefault();
        win.hide();
    });
    win.on("minimize", function(event){
        event.preventDefault();
        win.hide();
    });
});
