const Generator = require('./index');

const C = require('const');

class KeymapC extends Generator {

	loadTemplate() { return require('./templates/keymap.c'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		// Generate the keymaps.
		let keymaps = '';
		for (let layer = 0; layer < C.KEYMAP_MAX_LAYERS; layer ++) {
			let layerMap = '\tKEYMAP(\n\t\t';
			for (let row = 0; row < keyboard.rows; row ++) {
				for (let col = 0; col < keyboard.cols; col ++) {
					const key = keyboard.wiring[row + ',' + col];
					if (!key || !key.length) continue;

					layerMap += key[0].keycodes[layer].getCode() + ', ';
				}
				layerMap += '\n\t\t';
			}
			layerMap = layerMap.substring(0, layerMap.length - 5) + '),\n\n';
			keymaps += layerMap;
		}
		keymaps = keymaps.substring(0, keymaps.length - 3);

		return {
            'current_year': new Date().getFullYear(),
            'author': keyboard.settings.author,
			'keymaps': keymaps,
		};
	}

}

module.exports = KeymapC;
