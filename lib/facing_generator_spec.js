const { expect } = require("chai");
const fs = require("fs");
const { createFacingProgram } = require("../index");
const { Vector } = require("./vector");
const { Vector3 } = require("./vector3");
const { SpyWriter } = require("./spyWriter");
const { CommandGenerator } = require("./command_generator");
const { DefaultSettings } = require("./default_settings");

describe("createFacingProgram", () => {
    const settings = DefaultSettings;
    const commandGenerator = new CommandGenerator("cnc-gen facing");
    const writer = new SpyWriter();
    const reference = fs.readFileSync(
        "./reference_output/face-w10l10.txt",
        "utf8"
    );

    it("should match reference output", () => {
        let faceOrigin = new Vector3(-5, -5);
        createFacingProgram(
            writer,
            settings,
            commandGenerator,
            3.175,
            faceOrigin,
            new Vector(10, 10),
            1,
            1
        );
        expect(writer.capture).to.equal(reference);
    });
});
