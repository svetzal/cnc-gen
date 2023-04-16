#!/usr/bin/env node

const {commonArgumentParser} = require("../lib/common_argument_parser");
const {createSettingsFromArgs} = require("../lib/default_settings");
const {createFacingProgram} = require("../lib/facing_generator");
const {FileWriter} = require("../lib/fileWriter");
const {Vector} = require("../lib/vector");
const {Vector3} = require("../lib/vector3");
const {CommandGenerator} = require("../lib/command_generator");

const args = commonArgumentParser()
    .scriptName("wasteboard")
    .option("w", {
        alias: "width",
        default: 326,
        describe: "width to surface - x axis (mm)",
        type: "number",
    })
    .option("l", {
        alias: "length",
        default: 357,
        describe: "length to surface - y axis (mm)",
        type: "number",
    })
    .option("z", {
        alias: "depth",
        default: 0.5,
        describe: "depth to face (mm)",
        type: "number",
    })
    .option("v", {
        alias: "advanceRate",
        default: 1,
        describe: "amount to advance bit during surfacing per pass (mm)",
        type: "number",
    })
    .help().argv;

function addSuffixToFilename(baseFilename, suffix) {
    return baseFilename.replace(/^([^\.]+)/, `$1-${suffix}`);
}

const main = async (args) => {
    let settings = createSettingsFromArgs(args);
    let baseFilename = args.output ? args.output : "wasteboard.cnc";

    let filename = addSuffixToFilename(baseFilename, "surface");
    let writer = new FileWriter(filename);

    let size = new Vector(settings.width, settings.length);
    let faceOrigin = new Vector3(0, 0, 0);

    createFacingProgram(
        writer,
        settings,
        new CommandGenerator("cnc-gen wasteboard"),
        args.toolDiameter,
        faceOrigin,
        size,
        settings.depth,
        args.advanceRate
    );
};

main(args);
