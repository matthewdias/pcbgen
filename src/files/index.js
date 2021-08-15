const RulesMKGenerator = require('./generators/rules.mk');
const ConfigHGenerator = require('./generators/config.h');
const KbHGenerator = require('./generators/kb.h');
const KbCGenerator = require('./generators/kb.c');
const KeymapCGenerator = require('./generators/keymap.c');

class Files {

	/*
	 * Generate the set of source files given a Keyboard.
	 *
	 * @param {Keyboard} keyboard The keyboard to generate files from.
	 *
	 * @return {Object} The generated source files.
	 */
	static generate(keyboard) {
		return {
			[`qmk_firmware/keyboards/${keyboard.slug}/rules.mk`]: new RulesMKGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/config.h`]: new ConfigHGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/${keyboard.slug}.h`]: new KbHGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/${keyboard.slug}.c`]: new KbCGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/default/keymap.c`]: new KeymapCGenerator(keyboard).generate()
		};
	}

}

module.exports = Files;
