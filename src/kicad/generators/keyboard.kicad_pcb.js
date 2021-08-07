const Generator = require('../../files/generators/index');
const Nets = require('./templates/keyboard.kicad_pcb/nets');
const Switch = require('./templates/keyboard.kicad_pcb/switch');
const Diode = require('./templates/keyboard.kicad_pcb/diode');
const Frame = require('./templates/keyboard.kicad_pcb/frame');
const Plane = require('./templates/keyboard.kicad_pcb/plane');
const Crystal = require('./templates/keyboard.kicad_pcb/crystal');
const Cap = require('./templates/keyboard.kicad_pcb/cap');
const Resistor = require('./templates/keyboard.kicad_pcb/resistor');
const Reset = require('./templates/keyboard.kicad_pcb/reset');
const Micro = require('./templates/keyboard.kicad_pcb/micro');
const USB = require('./templates/keyboard.kicad_pcb/usb');

const formatName = require('./name');
const pinPadMap = require('./pin-pad-map');

class PCBGenerator extends Generator {

	loadTemplate() { return require('./templates/keyboard.kicad_pcb'); }

	fillTemplate() {
		const keyboard = this.keyboard;
    const nets = new Nets();
		const nameSet = new Set();
    const modules = [];
    const gap = 4;

    [...Array(keyboard.cols+1)].forEach((_, i) => nets.add(`col${i}`));
    [...Array(keyboard.rows+1)].forEach((_, i) => nets.add(`row${i}`));

    for (let row = 0; row < keyboard.rows; row ++) {
			for (let col = 0; col < keyboard.cols; col ++) {
				const keys = keyboard.wiring[row + ',' + col];
				if (keys) {
					keys.forEach(k => {
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
            const diode     = new Diode(k, nets);
            theSwitch.setPad(1, `col${col}`);
            theSwitch.connectPads(2, diode, 2);

            modules.push(theSwitch.render(k.pos.x, k.pos.y, k.rotation));
            const dx = k.pos.x + k.size.w - 0.5;
            modules.push(diode.render(dx, k.pos.y, 90));
          });
        }
      }
    }

    modules.push(new Frame(keyboard).render(gap));

		return {
      'nets':        nets.array.map(n => `  ${nets.format(n)}`).join('\n'),
      'net_classes': nets.array.map(n => `  (add_net "${n}")`).join('\n'),
      'modules':     modules.join(''),
    };
	}

}

module.exports = PCBGenerator;
