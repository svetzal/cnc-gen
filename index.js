function output(lines) {
    console.log(lines.join("\n"));
}

class CommandGenerator {
    createPreamble(title) {
        return [
            `;${title}`,
            `;Machine`,
            `;vendor: Snapmaker`,
            `;model: A350`,
            `;description: Generic Snapmaker Marlin v20180725`,
            `;Preamble`,
            `M3 P100`,
            `G4 S2`,
            `G21`,
            `G90`,
            ``,
        ]
    }

    createPostamble() {
        return [
            ``,
            `;Postamble`,
            `G0 X0.000 Y0.000`,
            `M5`,
        ]
    }

    createRapidMove(x, y, z) {
        return `G0 X${this.paddedfloat(x)} Y${this.paddedfloat(y)} Z${this.paddedfloat(z)}`;
    }

    createCuttingMove(x, y, z, feedRate) {
        return `G1 X${this.paddedfloat(x)} Y${this.paddedfloat(y)} Z${this.paddedfloat(z)} F${feedRate}`;
    }

    paddedfloat(val) {
        return val.toFixed(3);
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ToolHead {
    constructor(settings, commandGenerator, millSize, position) {
        this.settings = settings;
        this.gen = commandGenerator;
        this.millSize = millSize;
        this.position = position;
    }

    prepare(depth) {
        return [
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createCuttingMove(this.position.x, this.position.y, depth, this.settings.stepDownFeedRate),
        ];
    }

    repositionTo(x, y, depth) {
        const prg = [
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createRapidMove(x, y, this.settings.retractHeight),
            this.gen.createCuttingMove(x, y, depth, this.settings.stepDownFeedRate),
        ];
        this.position = new Vector(x, y);
        return prg;
    }

    cutTo(x, y, depth, feedRate) {
        const prg = [];
        prg.push(this.gen.createCuttingMove(x, y, depth, feedRate));
        this.position = new Vector(x, y);
        return prg;
    }

    finish() {
        return [
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
        ]
    }
}

function createFacingProgram(settings, commandGenerator, millSize, origin, surfacingSize) {
    const advanceRate = millSize / 4;

    let prg = [];

    let x = origin.x + surfacingSize.x;
    let y = origin.y;

    const toolHead = new ToolHead(settings, commandGenerator, millSize, new Vector(x, y));

    let depth = 0 - settings.stepDownRate;
    prg = prg.concat(toolHead.prepare(depth));

    for (; y <= origin.y + surfacingSize.y; y += advanceRate) {
        prg = prg.concat(toolHead.cutTo(
            x - surfacingSize.x,
            y,
            depth,
            y == origin.y ? settings.firstCutFeedRate : settings.normalCutFeedRate
        ));
        if (y + advanceRate <= origin.y + surfacingSize.y)
            prg = prg.concat(toolHead.repositionTo(x, y + advanceRate, depth));
    }

    prg = prg.concat(toolHead.finish());

    return prg;
}

const defaultSettings = {
    retractHeight: 15,
    firstCutFeedRate: 300,
    normalCutFeedRate: 800,
    stepDownFeedRate: 100,
    stepDownRate: 1,
    safetyMargin: 1,
}

const main = async () => {
    let commandGenerator = new CommandGenerator();

    let origin = new Vector(-70, -70);
    let surfacingSize = new Vector(140, 1);

    output(commandGenerator.createPreamble("CNC-Gen"));
    output(createFacingProgram(defaultSettings, commandGenerator, 6.35, origin, surfacingSize));
    output(commandGenerator.createPostamble());
}

main()
