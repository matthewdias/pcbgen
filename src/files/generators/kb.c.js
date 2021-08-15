const Generator = require('./index');

const Utils = require('utils');

class KeyboardC extends Generator {

	loadTemplate() { return require('./templates/kb.c'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		return {
            'current_year': new Date().getFullYear(),
            'author': keyboard.settings.author,
			'slug': keyboard.slug
		};
	}

}

module.exports = KeyboardC;
