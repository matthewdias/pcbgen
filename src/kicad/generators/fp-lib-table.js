import Generator from '../../files/generators/index';

import template from './templates/fp-lib-table'

class FpLibTableGenerator extends Generator {

	loadTemplate() { return template }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

export default FpLibTableGenerator;
