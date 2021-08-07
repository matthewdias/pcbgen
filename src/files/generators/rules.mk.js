const Generator = require('./index');

const C = require('const');

class RulesMK extends Generator {

	loadTemplate() { return require('./templates/rules.mk'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		let mcu;
		switch (keyboard.controller) {
			case C.CONTROLLER_ATMEGA32U2: mcu = 'atmega32u2'; break;
			case C.CONTROLLER_ATMEGA32U4: mcu = 'atmega32u4'; break;
			case C.CONTROLLER_AT90USB1286: mcu = 'at90usb1286'; break;
		}

		return {
			'mcu': mcu,
			'use_backlight': keyboard.pins.led ? 'yes' : 'no ',
			'use_rgb': keyboard.pins.rgb ? 'yes' : 'no '
		};
	}

}

module.exports = RulesMK;
