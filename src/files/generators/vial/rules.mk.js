const Generator = require('../index');

const C = require('const');

class VialRulesMK extends Generator {

	loadTemplate() { return require('./templates/rules.mk'); }

	fillTemplate() {
		return {
			'use_encoder': 'no'
		};
	}

}

module.exports = VialRulesMK;
