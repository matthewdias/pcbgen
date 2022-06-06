import Generator from './index'

import template from './templates/kb.c'

class KeyboardC extends Generator {
  loadTemplate() {
    return template
  }

  fillTemplate() {
    const { keyboard } = this

    return {
      current_year: new Date().getFullYear(),
      author: keyboard.settings.author,
      slug: keyboard.slug,
    }
  }
}

export default KeyboardC
