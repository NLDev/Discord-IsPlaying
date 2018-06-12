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

let log    = require(appRoot + "/utils/logger");
let config = require(appRoot + "/utils/configurator");

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
    if (os.platform() === "darwin")     return appRoot + "/assets/icon/icon.icns";
    else if (os.platform() === "win32") return appRoot + "/assets/icon/icon.ico";
    else                                return appRoot + "/assets/icon/icon.png";
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

let version = config.getVersion();
let appname = config.getName();
let authors = config.getAuthor();

console.log(
    "\n" +
    " #" + "-".repeat(12 + appname.length + version.toString().length) + "#\n" +
    " # Started " + appname + " v" + version + " #\n" +
    " #" + "-".repeat(12 + appname.length + version.toString().length) + "#\n\n" +
    "Copyright (c) " + (new Date()).getFullYear() + " " + authors + "\n"
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
