#!/usr/bin/env node

const { ToolHead } = require("../lib/tool_head");
const { commonArgumentParser } = require("../lib/common_argument_parser");
const { createDrillingProgram } = require("../lib/drilling_generator");
const { createSettingsFromArgs } = require("../lib/default_settings");
const { CommandGenerator } = require("../lib/command_generator");
const {FileWriter} = require("../lib/fileWriter");
const {ConsoleWriter} = require("../lib/consoleWriter");
const {Vector3} = require("../lib/vector3");

const args = commonArgumentParser()
    .option("d", {
        alias: "diameter",
        default: 6.35 * 0.3,
        describe: "hole diameter (mm)",
        type: "number",
    })
    .option("z", {
        alias: "depth",
        default: 1,
        describe: "depth to drill (mm)",
    })
    .help().argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    let commandGenerator = new CommandGenerator("cnc-gen drilling");
    let position = new Vector3(0, 0, 0);
    const toolHead = new ToolHead(
        writer,
        settings,
        commandGenerator,
        args.toolDiameter,
        position
    );

    createDrillingProgram(toolHead, args.diameter, args.depth);
};

main(args);
