"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let log = function(txt, err, proc){
    const date = new Date();
    let hour = date.getHours(),
        min  = date.getMinutes(),
        sec  = date.getSeconds();

    hour  = (hour < 10 ? "0" : "") + hour;
    min   = (min  < 10 ? "0" : "") + min;
    sec   = (sec  < 10 ? "0" : "") + sec;

    let head = (err ? "[ERROR]" : "[INFO] ");
    let body = head + " [" + hour + ":" + min + ":" + sec + "] - " + txt;

    if (!proc) console.log(body);
    else process.stdout.write(body + "\n");
};

module.exports = log;
