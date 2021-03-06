import Generator from './index';

import C from '../../const';

import template from './templates/keymap.c';
class KeymapC extends Generator {

	loadTemplate() { return template }

	fillTemplate() {
		const keyboard = this.keyboard;

		// Generate the keymaps.
		let keymaps = '';
        let lastLength;
		for (let layer = 0; layer < C.KEYMAP_MAX_LAYERS; layer ++) {
			let layerMap = `\t[${layer}] = LAYOUT_all(\n\t\t`;
			for (let row = 0; row < keyboard.rows; row ++) {
				for (let col = 0; col < keyboard.cols; col ++) {
					const key = keyboard.wiring[row + ',' + col];
					if (!key || !key.length) {
                        layerMap += '         ';
                        continue;
                    }

                    const keyCode = key[0].keycodes[layer].getCode();
					layerMap += keyCode + ',' + ' '.repeat(8 - keyCode.length);
                    lastLength = keyCode.length
				}
				layerMap += '\n\t\t';
			}
			layerMap = layerMap.substring(0, layerMap.length - (12 - lastLength)) + '\n\t),\n\n';
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

export default KeymapC;
