#!/usr/bin/env node

const {commonArgumentParser} = require("../lib/common_argument_parser");
const {createSettingsFromArgs} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, FileWriter, Vector, Vector3} = require('../lib/utilities');
const {createFacingProgram} = require("../lib/facing_generator");

const args = commonArgumentParser()
    .scriptName('wasteboard')
    .option('v', {
        alias: 'advanceRate',
        default: 1,
        describe: 'amount to advance bit during surfacing per pass (mm)',
        type: 'number',
    })
    .help()
    .argv;

function addSuffixToFilename(baseFilename, suffix) {
    return baseFilename.replace(/^([^\.]+)/, `$1-${suffix}`);
}

const main = async (args) => {
    let settings = createSettingsFromArgs(args);
    let baseFilename = args.output ? args.output : 'wasteboard.cnc';

    let filename = addSuffixToFilename(baseFilename, "surface");
    let writer = new FileWriter(filename);

    console.log("*** This program is not yet complete, do not use it.");

    let size = new Vector(320, 340);
    let faceOrigin = new Vector3(0, 0, 0);

    createFacingProgram(
        writer,
        settings,
        new CommandGenerator("cnc-gen wasteboard"),
        args.toolDiameter,
        faceOrigin,
        size,
        1,
        args.advanceRate,
    );

    // let size = new Vector(args.width, args.length);
    // let faceOrigin = new Vector3(0 - size.x / 2, 0 - size.y / 2, 0);
    //
    // createFacingProgram(
    //     writer,
    //     settings,
    //     new CommandGenerator("cnc-gen facing"),
    //     args.toolDiameter,
    //     faceOrigin,
    //     size,
    //     args.depth,
    //     args.advanceRate,
    // );
}

main(args);
