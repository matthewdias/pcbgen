const RulesMKGenerator = require('./generators/rules.mk');
const ConfigHGenerator = require('./generators/config.h');
const KbHGenerator = require('./generators/kb.h');
const KbCGenerator = require('./generators/kb.c');
const KeymapCGenerator = require('./generators/keymap.c');
const VialRulesMKGenerator = require('./generators/vial/rules.mk');
const VialConfigHGenerator = require('./generators/vial/config.h');
const VialJSONGenerator = require('./generators/vial/vial.json');

class Files {

	/*
	 * Generate the set of source files given a Keyboard.
	 *
	 * @param {Keyboard} keyboard The keyboard to generate files from.
	 *
	 * @return {Object} The generated source files.
	 */
	static generate(keyboard, vialUid) {
        const keymapC = new KeymapCGenerator(keyboard).generate()
		return {
			[`qmk_firmware/keyboards/${keyboard.slug}/rules.mk`]: new RulesMKGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/config.h`]: new ConfigHGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/${keyboard.slug}.h`]: new KbHGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/${keyboard.slug}.c`]: new KbCGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/default/keymap.c`]: keymapC,
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/vial/rules.mk`]: new VialRulesMKGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/vial/config.h`]: new VialConfigHGenerator(keyboard, vialUid).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/vial/vial.json`]: new VialJSONGenerator(keyboard).generate(),
			[`qmk_firmware/keyboards/${keyboard.slug}/keymaps/vial/keymap.c`]: keymapC
		};
	}

}

module.exports = Files;
