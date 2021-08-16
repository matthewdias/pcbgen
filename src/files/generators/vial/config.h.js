const Generator = require('../index');
const C = require('const');

class VialConfigH extends Generator {

    constructor(keyboard, vialUid) {
        super(keyboard);
        this.vialUid = vialUid;
    }

	loadTemplate() { return require('./templates/config.h'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		return {
            'vial_uid': this.vialUid
		};
	}

}

module.exports = VialConfigH;
