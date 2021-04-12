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

        let origin = new Vector(this.position.x, this.position.y);

        let start = 0;
        this.cutTo(origin.x - diameter / 2, origin.y, start);

        for (; start > depth; start -= this.settings.helicalStepDownRate) {
            for (let i = 1/16; i <= 1.0; i += 1 / 16) {
                let r = i * 2 * Math.PI;
                let z = start - i * this.settings.helicalStepDownRate;
                let x = origin.x - diameter / 2 * Math.cos(r);
                let y = origin.y + diameter / 2 * Math.sin(r);
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
