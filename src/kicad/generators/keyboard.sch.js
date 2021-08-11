const ejs = require('ejs');
const Generator = require('../../files/generators/index');
const formatName = require('./name');
const genTstamp = require('./tstamp');
const pinPadMap = require('./pin-pad-map');
const C = require('const');

class SchematicsGenerator extends Generator {
    
    loadTemplate() { return require('./templates/keyboard.sch'); }
    
    renderMatrix(components) {
        const switchTpl = require('./templates/keyboard.sch/switch');
        const diodeTpl = require('./templates/keyboard.sch/diode');
        const rowLabelTpl = require('./templates/keyboard.sch/row-label');
        const colLabelTpl = require('./templates/keyboard.sch/col-label');
        const wiringTpl = require('./templates/keyboard.sch/wiring');
        
        const keyboard = this.keyboard;
        const lastColY = [...Array(keyboard.cols)].fill(0);
        const nameSet = new Set();
        
        for (let row = 0; row < keyboard.rows; row ++) {
            // row label
            const lx = 1500;
            const ly = 9000 + (row * 1000);
            const data = { row, x: lx, y: ly };
            components.push(ejs.render(rowLabelTpl, { data }));
            
            // keeps track of the last switch on this row
            let lastX = 0;
            
            for (let col = 0; col < keyboard.cols; col ++) {
                // column label
                if (row === 0) {
                    const cx = 1500 + (col * 1000);
                    const cy = 9000;
                    const data = { col, x: cx, y: cy };
                    components.push(ejs.render(colLabelTpl, { data }));
                }
                
                // iterate through all the keys on this particular row/col
                const keys = keyboard.wiring[row + ',' + col];
                const x = 1400 + (col * 1000);
                const y = 9000 + (row * 1000);
                if (keys) {
                    keys.forEach((key, index) => {
                        // makes sure the key name is unique
                        let name = formatName(key.legend);
                        while (nameSet.has(name)) {
                            const num = name.replace(/^\D+/g, '');
                            const prefix = name.replace(/\d+$/g, '');
                            const i = num ? parseInt(num, 10) + 1 : 1;
                            name = `${prefix}${i}`;
                        }
                        nameSet.add(name);
                        // renders the switch
                        const data = {key, name, x, y}

                        if (index > 0) {
                            data.x = x - 250
                            data.y = y - 100
                            data.wires = `
Wire Wire Line
    ${data.x - 50} ${data.y + 250} ${data.x + 200} ${data.y + 250}
Wire Wire Line
    ${data.x - 50} ${data.y + 150} ${data.x - 50} ${data.y + 250}
Connection ~ ${data.x + 200} ${data.y + 250}
Wire Wire Line
    ${data.x + 400} ${data.y - 50} ${data.x + 400} ${data.y + 50}
Connection ~ ${data.x + 400} ${data.y + 50}
                            `.trim()
                        } else {
                            data.wires = `Connection ~ ${x + 400} ${y - 50}`
                        }
                        
                        const theSwitch = ejs.render(switchTpl, { data, keyboard });
                        components.push(theSwitch);

                        // renders the diode
                        if (index === 0) {
                            const theDiode = ejs.render(diodeTpl, { data, keyboard })
                            components.push(theDiode);
                        }
                    });
                    lastX = x;
                    
                    // keeps track of the last switch position on this column
                    lastColY[col] = Math.max(lastColY[col], ly + 300);
                }
            }
            
            // render the wiring from the diode to the row
            components.push(ejs.render(wiringTpl, { x0: lx - 50, y0: ly + 400, x1: lastX - 50, y1: ly + 400 }));
        }
        
        // render the wiring from the switch pad to the column
        for (let col = 0; col < keyboard.cols; col ++) {
            const cx = 1500 + (col * 1000) + 300;
            const cy = lastColY[col];
            const data = { col, x: cx, y: cy };
            components.push(ejs.render(wiringTpl, { x0: cx, y0: cy - 350, x1: cx, y1: 9000 }));
        }
    }

    renderController(components, controller) {
        const controller32u4 = require('./templates/keyboard.sch/32u4.sch');

        switch(controller) {
            case C.CONTROLLER_ATMEGA32U4: {
                components.push(ejs.render(controller32u4))
                break;
            }
        }
    }
    
    fillTemplate() {
        const components = [];
        
        this.renderMatrix(components);
        this.renderController(components, this.keyboard.controller)
        
        return {
            'components': components.join('').trim(),
        };
    }
}

module.exports = SchematicsGenerator;
