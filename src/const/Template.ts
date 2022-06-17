class Template {
  raw: string[]

  formatted: string

  display: string | undefined

  fields: string[]

  /*
   * Constructor for a keycode template.
   *
   * @param {List} raw The raw template format to be used for display.
   * @param {String} formatted The formatted string to be used for code generation.
   * @param {String} display The formatted string to be used for display.
   */
  constructor(raw: string[], formatted: string, display?: string) {
    this.raw = raw
    this.formatted = formatted
    this.display = display

    // Get the fields in the template.
    this.fields = []
    for (let i = 1; i < raw.length; i += 1) {
      this.fields.push(raw[i])
    }

    // Bind functions.
    this.getCode = this.getCode.bind(this)
    this.getName = this.getName.bind(this)
  }

  /*
   * Get the formatted code.
   *
   * @param {List} field The fields.
   *
   * @return {String} The formatted code.
   */
  getCode(fields: string[]) {
    let code = this.formatted

    // Simple formatted string replacement.
    for (let i = 0; i < this.fields.length; i += 1) {
      code = code.replace(new RegExp(`%${i + 1}`, 'g'), fields[i])
    }

    return code
  }

  /*
   * Get the formatted name.
   *
   * @param {List} field The fields.
   *
   * @return {String} The formatted name.
   */
  getName(fields: string[]) {
    let code = this.display ?? ''

    // Simple formatted string replacement.
    for (let i = 0; i < this.fields.length; i += 1) {
      code = code?.replace(new RegExp(`%${i + 1}`, 'g'), fields[i])
    }

    return code
  }
}

export default Template
