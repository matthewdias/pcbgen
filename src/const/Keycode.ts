import Template from './Template'

class Keycode {
  template: Template

  display: string

  aliases: string[]

  /*
   * Constructor for a keycode.
   *
   * @param {Object, String} template The template for the keycode.
   * @param {String} display How the keycode is displayed on the display.
   * @param {List} aliases Aliases for the keycode.
   */
  constructor(template: string | Template, display: string, aliases: string[]) {
    this.display = display
    this.aliases = aliases

    if (typeof template === 'string') {
      // If the template is a string, then the template is just the keycode.
      this.template = new Template([template], template, display)
    } else {
      this.template = template
      this.template.display = display
    }
  }
}

export default Keycode
