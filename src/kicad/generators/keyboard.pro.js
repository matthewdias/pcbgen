import Generator from '../../files/generators/index';

import template from './templates/keyboard.pro';
class ProjectGenerator extends Generator {

	loadTemplate() { return template }

	fillTemplate() {
		const keyboard = this.keyboard;
		return {};
	}

}

export default ProjectGenerator;
