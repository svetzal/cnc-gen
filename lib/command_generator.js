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

module.exports = { CommandGenerator };
