import Generator from '../../files/generators/index';
import Nets from './templates/keyboard.kicad_pcb/nets';
import Switch from './templates/keyboard.kicad_pcb/switch';
import Diode from './templates/keyboard.kicad_pcb/diode';
import Frame from './templates/keyboard.kicad_pcb/frame';
import Controller32u4 from './templates/keyboard.kicad_pcb/32u4';
import Controller32u4JST from './templates/keyboard.kicad_pcb/32u4-db';
import RGB from './templates/keyboard.kicad_pcb/rgb';
// import Plane from './templates/keyboard.kicad_pcb/plane';
// import Crystal from './templates/keyboard.kicad_pcb/crystal';
// import Cap from './templates/keyboard.kicad_pcb/cap';
// import Resistor from './templates/keyboard.kicad_pcb/resistor';
// import Reset from './templates/keyboard.kicad_pcb/reset';
// import Micro from './templates/keyboard.kicad_pcb/micro';
// import USB from './templates/keyboard.kicad_pcb/usb';

import formatName from './name';
// import pinPadMap from './pin-pad-map';
import C from '../../const';

import template from './templates/keyboard.kicad_pcb'

class PCBGenerator extends Generator {
    
    loadTemplate() { return template }
    
    fillTemplate() {
        const keyboard = this.keyboard;
        const nets = new Nets();
        const nameSet = new Set();
        const modules = [];
        const gap = 0;
        
        [...Array(keyboard.cols+1)].forEach((_, i) => nets.add(`col${i}`));
        [...Array(keyboard.rows+1)].forEach((_, i) => nets.add(`row${i}`));
        
        for (let row = 0; row < keyboard.rows; row ++) {
            for (let col = 0; col < keyboard.cols; col ++) {
                const keys = keyboard.wiring[row + ',' + col];
                if (keys) {
                    const diode     = new Diode(keys[0], nets);
                    modules.push(diode.render(keys[0].pos.x, keys[0].pos.y, 90));

                    keys.forEach((k, index) => {
                        let name = formatName(k.legend);
                        while (nameSet.has(name)) {
                            const num = name.replace(/^\D+/g, '');
                            const prefix = name.replace(/\d+$/g, '');
                            const i = num ? parseInt(num, 10) + 1 : 1;
                            name = `${prefix}${i}`;
                        }
                        nameSet.add(name);
                        k.name = name;
                        const theSwitch = new Switch(k, nets, this.leds);
                        theSwitch.setPad(1, `col${col}`);
                        theSwitch.connectPads(2, diode, 2);

                        modules.push(theSwitch.render(k.pos.x, k.pos.y, k.rotation));
                    });
                }
            }
        }

        switch(this.keyboard.controller) {
            case C.CONTROLLER_ATMEGA32U4: {
                const controller = this.keyboard.settings.connectorType === C.CONNECTOR_JST
                    ? Controller32u4JST : Controller32u4;
                controller.nets.forEach(n => nets.add(n));
                modules.push(controller.template.replace(new RegExp('<net (.+)>', 'g'), (match, netName) => nets.get(netName.replace(new RegExp('"', 'g'), ''))));
                break;
            }
        }

        if (this.keyboard.settings.rgbNum > 0) {
            nets.add('RGB');
            Array.from({ length: this.keyboard.settings.rgbNum }, (_, index) => {
                const rgb = new RGB(index, nets);
                modules.push(rgb.render(60 + (index * 10), -18, 0))
            })
        }   
        
        modules.push(new Frame(keyboard, "frame", 19.05/8).render(gap));
        
        return {
            'nets':        nets.array.map(n => `  ${nets.format(n)}`).join('\n'),
            'net_classes': nets.array.map(n => `  (add_net "${n}")`).join('\n'),
            'modules':     modules.join(''),
        };
    }
    
}

export default PCBGenerator;
