import Generator from '../../files/generators/index';

import template from './templates/sym-lib-table'
class SymLibTableGenerator extends Generator {

	loadTemplate() { return template }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

export default SymLibTableGenerator;
