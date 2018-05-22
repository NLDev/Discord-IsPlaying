"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let fs  = require("fs");
let log = require("./logger");

require.extensions[".json"] = function (module, filename) { module.exports = fs.readFileSync(filename, "utf8"); };

const pack = require(appRoot + "/package.json");

let pInfo = JSON.parse(pack);

let getVersion = function(){ return pInfo.version; };

let getName = function(){ return "Discord IsPlaying"; /*pInfo.name*/; };

module.exports = {
    getVersion: getVersion,
    getName: getName
};
