#!/usr/bin/env node

const {createDrillingProgram} = require("../lib/drilling_generator");
const {DefaultSettings} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, Vector} = require('../lib/utilities');

const main = async () => {
    createDrillingProgram(
        new ConsoleWriter(),
        DefaultSettings,
        new CommandGenerator(),
        6.35,
        new Vector(0, 0),
        6.35 * 0.3,
        0.3,
    );
}

main();
