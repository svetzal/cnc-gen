#!/usr/bin/env node

const { CommandGenerator } = require("../lib/command_generator");
const { createSlotProgram } = require("../lib/slot_generator");
const { createSettingsFromArgs } = require("../lib/default_settings");
const { commonArgumentParser } = require("../lib/common_argument_parser");
const {FileWriter} = require("../lib/fileWriter");
const {ConsoleWriter} = require("../lib/consoleWriter");
const {Vector3} = require("../lib/vector3");
const args = commonArgumentParser()
    .options("l", {
        alias: "length",
        demandOption: true,
        describe: "length of slot to cut (mm)",
        type: "number",
    })
    .options("n", {
        alias: "orientation",
        default: "horizontal",
        describe: "horizontal (x-axis) or vertical (y-axis) orientation",
        type: "string",
    })
    .options("z", {
        alias: "depth",
        default: 1,
        describe: "depth to cut (mm)",
        type: "number",
    })
    .help().argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    if (!["horizontal", "vertical"].includes(args.orientation)) {
        console.log(`Invalid orientation ${args.orientation}`);
        return;
    }

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    createSlotProgram(
        writer,
        settings,
        new CommandGenerator("cnc-gen slot"),
        args.toolDiamenter,
        new Vector3(0, 0, 0),
        args.orientation === "horizontal",
        args.length,
        args.depth
    );
};

main(args);
