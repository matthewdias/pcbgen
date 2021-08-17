import Generator from '../index';

import template from './templates/rules.mk';

class VialRulesMK extends Generator {

	loadTemplate() { return template }

	fillTemplate() {
		return {
			'use_encoder': 'no'
		};
	}

}

export default VialRulesMK;
