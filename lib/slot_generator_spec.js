const { expect } = require("chai");
const fs = require("fs");
const { createSlotProgram } = require("./slot_generator");
const { Vector3 } = require("./utilities");
const { SpyWriter } = require("./utilities");
const { CommandGenerator } = require("./command_generator");
const { DefaultSettings } = require("./default_settings");

describe("createSlotProgram", () => {
    const settings = DefaultSettings;
    const commandGenerator = new CommandGenerator("cnc-gen slot");
    const writer = new SpyWriter();
    const reference = fs.readFileSync(
        "./reference_output/slot-l100z20.txt",
        "utf8"
    );

    it("should match reference output", () => {
        let position = new Vector3(0, 0, 0);
        createSlotProgram(
            writer,
            settings,
            commandGenerator,
            6.35,
            new Vector3(0, 0, 0),
            true,
            100,
            20
        );
        expect(writer.capture).to.equal(reference);
    });
});
