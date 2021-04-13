const {Vector} = require('./utilities');

class ToolHead {
    constructor(writer, settings, commandGenerator, title, millSize, position) {
        this.settings = settings;
        this.gen = commandGenerator;
        this.writer = writer;
        this.title = title;
        this.millSize = millSize;
        this.position = position;
    }

    prepare(depth) {
        this.writer.write(this.gen.createPreamble(this.title));
        this.writer.write([
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createCuttingMove(this.position.x, this.position.y, depth, this.settings.stepDownFeedRate),
        ]);
    }

    repositionTo(x, y, depth) {
        this.writer.write([
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createRapidMove(x, y, this.settings.retractHeight),
            this.gen.createCuttingMove(x, y, depth, this.settings.stepDownFeedRate),
        ]);
        this.position = new Vector(x, y);
    }

    cutTo(x, y, z, feedRate) {
        this.writer.write(
            this.gen.createCuttingMove(x, y, z, feedRate)
        );
        this.position = new Vector(x, y);
    }

    drillDepth(diameter, depth) {
        // This might be easier if we can do arcs in gcode?
        // https://www.cnccookbook.com/cnc-g-code-arc-circle-g02-g03/

        if (diameter < this.millSize) throw "Unable to drill a hole smaller than the end mill diameter"
        if (diameter > this.millSize * 2) throw "Unable to drill a clean hole larger than twice the end mill diameter"

        let helixRadius = diameter / 2 - this.millSize / 2;

        let origin = new Vector(this.position.x, this.position.y);

        let start = 0;
        this.cutTo(origin.x - helixRadius, origin.y, start, this.settings.stepDownFeedRate);

        for (; start > depth; start -= this.settings.helicalStepDownRate) {
            let remainingStepdown = (-depth - -start) < this.settings.helicalStepDownRate
                ? -depth - -start
                : this.settings.helicalStepDownRate;
            for (let i = 1/16; i <= 1.0; i += 1 / 16) {
                let r = i * 2 * Math.PI;
                let z = start - i * remainingStepdown;
                let x = origin.x - helixRadius * Math.cos(r);
                let y = origin.y + helixRadius * Math.sin(r);
                this.cutTo(x, y, z, this.settings.firstCutFeedRate);
            }
        }

        this.cutTo(origin.x, origin.y, depth, this.settings.firstCutFeedRate);
    }

    finish() {
        this.writer.write(this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight));
        this.writer.write(this.gen.createPostamble());
    }
}

module.exports = {ToolHead};
