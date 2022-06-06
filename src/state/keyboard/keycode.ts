/* eslint-disable no-bitwise */
import C from '../../const'
import Template from '../../const/Template'
import PrimitiveKeycode from '../../const/Keycode'

interface IKeycode {
  id: string
  fields: Array<string | number | IKeycode>
  code: PrimitiveKeycode
  template: Template
  getCode: () => string
  serialize: () => {
    id: string
    fields: (string | number | Record<string, unknown>)[]
  }
  getName: () => string
}

class Keycode {
  id: string

  fields: Array<string | number | IKeycode>

  code: PrimitiveKeycode

  template: Template

  /*
   * Constructor for a keycode.
   *
   * @param {String} id The id of the keycode.
   * @param {List} fields The fields associated with the keycode.
   */
  constructor(id: string, fields: Array<string | number | Keycode>) {
    this.id = id
    this.fields = fields

    // Get the keycode.
    this.code = C.KEYCODES[id]
    this.template = this.code.template

    // Bind functions.
    this.getCode = this.getCode.bind(this)
    this.getName = this.getName.bind(this)
    this.serialize = this.serialize.bind(this)
  }

  /*
   * Get the code.
   *
   * @return {String} The code..
   */
  getCode() {
    const fields: string[] = []
    for (let i = 0; i < this.fields.length; i += 1) {
      const field = this.fields[i]
      const templateField = this.template.fields[i]
      switch (templateField) {
        case 'KEY': {
          const typedField = field as IKeycode
          fields.push(typedField.getCode())
          break
        }
        case 'MOD': {
          const typedField = field as number
          // Get active mods.
          const active: Array<string | number> = []
          if (typedField & 0b000001) {
            active.push('MOD_LCTL')
          }
          if (typedField & 0b000010) {
            active.push('MOD_LSFT')
          }
          if (typedField & 0b000100) {
            active.push('MOD_LALT')
          }
          if (typedField & 0b001000) {
            active.push('MOD_LGUI')
          }
          if (typedField & 0b010000) {
            active.push('MOD_HYPR')
          }
          if (typedField & 0b100000) {
            active.push('MOD_MEH')
          }
          if (active.length === 0) {
            active.push(0)
          }
          fields.push(active.join(' | '))
          break
        }
        case 'LAYER': {
          const typedField = field as string
          fields.push(typedField)
          break
        }
        case 'MACRO': {
          const typedField = field as string
          fields.push(typedField)
          break
        }
        default: {
          throw Error(`Invalid template field: ${templateField}`)
        }
      }
    }
    return this.template.getCode(fields)
  }

  /*
   * Get the display name.
   *
   * @return {String} The display name.
   */
  getName() {
    const fields: string[] = []
    for (let i = 0; i < this.fields.length; i += 1) {
      const field = this.fields[i]
      const templateField = this.template.fields[i]
      switch (templateField) {
        case 'KEY': {
          const typedField = field as IKeycode
          fields.push(typedField.getName())
          break
        }
        case 'MOD': {
          const typedField = field as number
          // Get active mods.
          const active: Array<number | string> = []
          if (typedField & 0b000001) active.push('CTRL')
          if (typedField & 0b000010) active.push('SHIFT')
          if (typedField & 0b000100) active.push('ALT')
          if (typedField & 0b001000) active.push('GUI')
          if (typedField & 0b010000) active.push('HYPER')
          if (typedField & 0b100000) active.push('MEH')
          if (active.length === 0) active.push('NONE')
          fields.push(active.join(' | '))
          break
        }
        case 'LAYER': {
          const typedField = field as string
          fields.push(typedField)
          break
        }
        case 'MACRO': {
          const typedField = field as string
          fields.push(typedField)
          break
        }
        default: {
          throw Error(`Invalid template field: ${templateField}`)
        }
      }
    }
    return this.template.getName(fields)
  }

  /*
   * Get the default Keycode for some id.
   *
   * @param {String} code The id of the keycode.
   *
   * @return {Keycode} The default keycode.
   */
  static getDefault(code) {
    const keycode = C.KEYCODES[code]
    const { template } = keycode

    // Get the fields.
    const fields: Array<Keycode | number> = []
    // eslint-disable-next-line no-restricted-syntax
    for (const field of template.fields) {
      switch (field) {
        case 'KEY': {
          fields.push(new Keycode('KC_NO', []))
          break
        }
        case 'MOD': {
          fields.push(0)
          break
        }
        case 'LAYER': {
          fields.push(0)
          break
        }
        case 'MACRO': {
          fields.push(0)
          break
        }
        default: {
          throw Error(`Invalid template field: ${field}`)
        }
      }
    }

    // Return the new Keycode.
    return new Keycode(code, fields)
  }

  /*
   * Serialize the keycode.
   *
   * @return {String} The serialized keycode.
   */
  serialize() {
    // Serialize the subfields.
    const { id } = this
    const fields = this.fields.map((field) => {
      if (typeof field === 'number') {
        return field
      }
      if (typeof field === 'string') {
        return field
      }
      return field.serialize()
    })

    // Return JSON representation.
    const json = {
      id,
      fields,
    }

    return json
  }

  /*
   * Deserialize a keycode.
   *
   * @param {String} serialized The serialized keycode.
   *
   * @return {Keycode} The deserialized keycode.
   */
  static deserialize(serialized) {
    // Get the subfields.
    const { id } = serialized
    const fields = serialized.fields.map((field) => {
      if (typeof field === 'number' || field instanceof Number) {
        return field
      }
      return Keycode.deserialize(field)
    })

    // Build the new object.
    const keycode = new Keycode(id, fields)
    return keycode
  }
}

export default Keycode

export type { IKeycode }
