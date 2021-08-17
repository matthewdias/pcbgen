import ejs from 'ejs';
import Generator from '../../files/generators/index';
import formatName from './name';
// import genTstamp from './tstamp';
// import pinPadMap from './pin-pad-map';
import C from '../../const';

import template from './templates/keyboard.sch'

import switchTpl from './templates/keyboard.sch/switch';
import diodeTpl from './templates/keyboard.sch/diode';
import rowLabelTpl from './templates/keyboard.sch/row-label';
import colLabelTpl from './templates/keyboard.sch/col-label';
import wiringTpl from './templates/keyboard.sch/wiring';
import controller32u4 from './templates/keyboard.sch/32u4.sch';
import controller32u4JST from './templates/keyboard.sch/32u4-db.sch';
import RGB from './templates/keyboard.sch/rgb.js';

class SchematicsGenerator extends Generator {
    
    loadTemplate() { return template }
    
    renderMatrix(components) {
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
        switch(controller) {
            case C.CONTROLLER_ATMEGA32U4: {
                if (this.keyboard.settings.connectorType === C.CONNECTOR_JST) {
                    components.push(ejs.render(controller32u4JST));
                } else {
                    components.push(ejs.render(controller32u4));
                }
                break;
            }
        }
    }

    renderRGB(components, rgbNum) {
        const data = { x: 2450 }

        components.push(ejs.render(RGB.start, data))

        Array.from({ length: rgbNum }, (_, index) => {
            components.push(ejs.render(RGB.rgb, Object.assign(data, { index })))
        })
    }
    
    fillTemplate() {
        const components = [];
        
        this.renderMatrix(components);
        this.renderController(components, this.keyboard.controller)

        if (this.keyboard.settings.rgbNum > 0) {
            this.renderRGB(components, this.keyboard.settings.rgbNum)
        }
        
        return {
            'components': components.join('').trim(),
        };
    }
}

export default SchematicsGenerator;
