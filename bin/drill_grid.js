#!/usr/bin/env node

const { ToolHead } = require("../lib/tool_head");
const { commonArgumentParser } = require("../lib/common_argument_parser");
const { createSettingsFromArgs } = require("../lib/default_settings");
const { CommandGenerator } = require("../lib/command_generator");
const {FileWriter} = require("../lib/fileWriter");
const {ConsoleWriter} = require("../lib/consoleWriter");
const {Vector3} = require("../lib/vector3");
const {helical} = require("../lib/operations/helical");

const args = commonArgumentParser()
    .option("d", {
        alias: "diameter",
        default: 4.5,
        describe: "hole diameter (mm)",
        type: "number",
    })
    .option("z", {
        alias: "depth",
        default: 1,
        describe: "depth to drill (mm)",
    })
    .option("w", {
        alias: "width",
        default: 50,
        describe: "horizontal space between holes (ms)",
    })
    .option("l", {
        alias: "length",
        default: 50,
        describe: "vertical space between holes (ms)",
    })
    .option("x", {
        alias: "xquantity",
        default: 2,
        describe: "number of holes in x direction",
    })
    .option("y", {
        alias: "yquantity",
        default: 2,
        describe: "number of holes in y direction",
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

    toolHead.prepare(0);
    for (let x = 0; x < args.xquantity; x++) {
        for (let y = 0; y < args.yquantity; y++) {
            let position = new Vector3(
                x * args.width,
                y * args.length,
                0
            );
            toolHead.comment(`Moving to ${position.x}, ${position.y}`);
            toolHead.repositionTo(position)
            toolHead.comment(`Drilling ${args.diameter}mm wide to ${args.depth}mm`);
            helical(toolHead, args.diameter, args.depth);
        }
    }
    toolHead.finish();
};

main(args);
