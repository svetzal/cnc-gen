#!/usr/bin/env node

const {DefaultSettings} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, Vector} = require('../lib/utilities');
const {createFacingProgram} = require("../lib/facing_generator");

const main = async () => {
    createFacingProgram(
        new ConsoleWriter(),
        DefaultSettings,
        new CommandGenerator(),
        6.35,
        new Vector(0 - new Vector(140, 140).x / 2, 0 - new Vector(140, 140).y / 2),
        new Vector(140, 140),
        6.35 / 4,
    );
}

main();
