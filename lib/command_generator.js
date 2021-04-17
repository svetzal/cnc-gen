// Snapmaker 2.0 Gcode Reference
// https://docs.google.com/spreadsheets/d/1qDBZTEdHPO59p7PcCulKvBOAjFI-U3O2RyzXJf3Rx6Q/edit#gid=0

class CommandGenerator {
    constructor(title) {
        this.title = title;
    }

    createPreamble() {
        return [
            `;${this.title}`,
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

    positionValues(position) {
        return [
            `X${this.paddedfloat(position.x)}`,
            `Y${this.paddedfloat(position.y)}`,
            `Z${this.paddedfloat(position.z)}`,
        ]
    }

    createRapidMove(position) {
        return ['G0', ...this.positionValues(position)]
            .join(' ');
    }

    createCuttingMove(position, feedRate) {
        return ['G1', ...this.positionValues(position), `F${feedRate}`]
            .join(' ');
    }

    paddedfloat(val) {
        return val.toFixed(3);
    }
}

module.exports = { CommandGenerator };
