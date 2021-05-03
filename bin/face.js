#!/usr/bin/env node

const {commonArgumentParser} = require("../lib/common_argument_parser");
const {createSettingsFromArgs} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, FileWriter, Vector, Vector3} = require('../lib/utilities');
const {createFacingProgram} = require("../lib/facing_generator");

const args = commonArgumentParser()
    .option('w', {
        alias: 'width',
        demandOption: true,
        describe: 'width to surface - x axis (mm)',
        type: 'number',
    })
    .option('l', {
        alias: 'length',
        demandOption: true,
        describe: 'length to surface - y axis (mm)',
        type: 'number',
    })
    .option('v', {
        alias: 'advanceRate',
        default: 1,
        describe: 'amount to advance bit during surfacing per pass (mm)',
        type: 'number',
    })
    .option('z', {
        alias: 'depth',
        default: 1,
        describe: 'depth to face (mm)',
        type: 'number',
    })
    .help()
    .argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    let size = new Vector(args.width, args.length);
    let faceOrigin = new Vector3(0 - size.x / 2, 0 - size.y / 2, 0);

    createFacingProgram(
        writer,
        settings,
        new CommandGenerator("cnc-gen facing"),
        args.toolDiameter,
        faceOrigin,
        size,
        args.depth,
        args.advanceRate,
    );
}

main(args);
