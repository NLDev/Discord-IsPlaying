"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let path     = require("path");
let electron = require("electron");
let Conf     = require("conf");

class appData extends Conf {
    constructor(opts){
        const defaultCwd = (electron.app || electron.remote.app).getPath("userData");
        opts = Object.assign({ name: "config" }, opts);
        opts.cwd = (opts.cwd ? (path.isAbsolute(opts.cwd) ? opts.cwd : path.join(defaultCwd, opts.cwd)) : defaultCwd);
        opts.configName = opts.name;
        delete opts.name;
        super(opts);
    }

    openInEditor(){ electron.shell.openItem(this.path); }
}

module.exports = appData;
