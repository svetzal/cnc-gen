#!/usr/bin/env node

const {commonArgumentParser} = require("../lib/common_argument_parser");
const {createDrillingProgram} = require("../lib/drilling_generator");
const {createSettingsFromArgs} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, FileWriter, Vector} = require('../lib/utilities');

const args = commonArgumentParser()
    .option('d', {
        alias: 'diameter',
        default: 6.35 * 0.3,
        describe: 'mill bit diameter (mm)',
        type: 'number',
    })
    .option('z', {
        alias: 'depth',
        default: 1,
        describe: 'depth to drill (mm)'
    })
    .help()
    .argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    createDrillingProgram(
        writer,
        settings,
        new CommandGenerator(),
        args.toolDiameter,
        new Vector(0, 0),
        args.diameter,
        0 - args.depth,
    );
}

main(args);
