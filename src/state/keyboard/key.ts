/* eslint-disable no-underscore-dangle */

import Utils from '../../utils'

import Keycode from './keycode'

import C from '../../const'

import Keyboard from '.'

interface IKeyState {
  rowIndex: number
  x: number
  y: number
  r: number
  rx: number
  ry: number
  w: number
  h: number
  x2: number
  y2: number
  w2: number
  h2: number
  p?: string
}

interface IKey {
  id: number

  legend: string

  state: IKeyState

  selected: number

  keycodes: Keycode[]

  angle: number

  pos: { x: number; y: number }

  size: { w: number; h: number }

  offset: { x: number; y: number }

  size2: { w: number; h: number }

  bounds: { min: { x: number; y: number }; max: { x: number; y: number } }

  center: { x: number; y: number }

  _row: number

  _col: number

  reversedStabs: boolean

  layout: string
}

class Key {
  keyboard: Keyboard

  id: number

  legend: string

  state: IKeyState

  selected: number

  keycodes: Keycode[]

  angle: number

  pos: { x: number; y: number }

  size: { w: number; h: number }

  offset: { x: number; y: number }

  size2: { w: number; h: number }

  bounds: { min: { x: number; y: number }; max: { x: number; y: number } }

  center: { x: number; y: number }

  _row: number

  _col: number

  reversedStabs: boolean

  layout: string

  layoutOption: string

  /*
   * Constructor for a key object.
   *
   * @param {Keyboard} keyboard The keyboard associated with the key.
   * @param {Number} id The id of the key.
   * @param {String} legend The legend of the key.
   * @param {Object} state The state of the key.
   */
  constructor(
    keyboard: Keyboard,
    id: number,
    legend: string,
    state: IKeyState
  ) {
    this.keyboard = keyboard
    this.id = id
    this.legend = legend
    this.state = state

    this.selected = 0

    this.keycodes = Array(C.KEYMAP_MAX_LAYERS).fill(new Keycode('KC_TRNS', []))

    // Bind functions.
    this.guessLegend = this.guessLegend.bind(this)
    this.getLayoutOption = this.getLayoutOption.bind(this)
    this.select = this.select.bind(this)
    this.serialize = this.serialize.bind(this)

    // Define some constants for ease of use.
    const rotateX = this.state.rx
    const rotateY = this.state.ry
    const angle = (this.state.r * Math.PI) / 180

    // Get the angle.
    this.angle = this.state.r

    // Calculate the true position.
    const pos = {
      x: this.state.x,
      y: this.state.y,
    }
    this.pos = Utils.rotateAboutPoint(pos.x, pos.y, rotateX, rotateY, angle)

    // Get the sizes.
    this.size = {
      w: this.state.w,
      h: this.state.h,
    }
    this.offset = {
      x: this.state.x2,
      y: this.state.y2,
    }
    this.size2 = {
      w: this.state.w2,
      h: this.state.h2,
    }

    // Calculate the true bounds.
    const bounds = {
      min: {
        x: Math.min(pos.x, pos.x + this.offset.x),
        y: Math.min(pos.y, pos.y + this.offset.y),
      },
      max: {
        x: Math.max(pos.x + this.size.w, pos.x + this.offset.x + this.size2.w),
        y: Math.max(pos.y + this.size.h, pos.y + this.offset.y + this.size2.h),
      },
    }
    const rotated = [
      Utils.rotateAboutPoint(
        bounds.min.x,
        bounds.min.y,
        rotateX,
        rotateY,
        angle
      ),
      Utils.rotateAboutPoint(
        bounds.min.x,
        bounds.max.y,
        rotateX,
        rotateY,
        angle
      ),
      Utils.rotateAboutPoint(
        bounds.max.x,
        bounds.min.y,
        rotateX,
        rotateY,
        angle
      ),
      Utils.rotateAboutPoint(
        bounds.max.x,
        bounds.max.y,
        rotateX,
        rotateY,
        angle
      ),
    ]
    this.bounds = {
      min: {
        x:
          Math.min(rotated[0].x, rotated[1].x, rotated[2].x, rotated[3].x) -
          this.pos.x,
        y:
          Math.min(rotated[0].y, rotated[1].y, rotated[2].y, rotated[3].y) -
          this.pos.y,
      },
      max: {
        x:
          Math.max(rotated[0].x, rotated[1].x, rotated[2].x, rotated[3].x) -
          this.pos.x,
        y:
          Math.max(rotated[0].y, rotated[1].y, rotated[2].y, rotated[3].y) -
          this.pos.y,
      },
    }

    // Calculate the center of the key.
    const center = {
      x: pos.x + this.size.w / 2,
      y: pos.y + this.size.h / 2,
    }
    this.center = Utils.rotateAboutPoint(
      center.x,
      center.y,
      rotateX,
      rotateY,
      angle
    )

    // Determine if reversed stabs.
    this.getReversedStabs(state.p)

    // Define wiring variables.
    this._row = 0
    this._col = 0

    // Guess the legend.
    this.guessLegend()

    // Get the layout option
    this.getLayoutOption()
  }

  /*
   * Getters and setters for wiring.
   */
  get row() {
    return this._row
  }

  set row(r) {
    this._row = r
    this.keyboard.updateWiring()
  }

  get rowHex() {
    return this.toExtendedHex(this._row)
  }

  get col() {
    return this._col
  }

  set col(c) {
    this._col = c
    this.keyboard.updateWiring()
  }

  get colHex() {
    return this.toExtendedHex(this._col)
  }

  // eslint-disable-next-line class-methods-use-this
  toExtendedHex(decimal) {
    if (decimal < 10) return decimal
    return String.fromCharCode(55 + decimal)
  }

  get library() {
    switch (this.keyboard.settings.switchType) {
      case C.SWITCH_MX:
        return 'MX_Only'
      case C.SWITCH_HOTSWAP:
        return 'MX_Only'
      case C.SWITCH_ALPS:
        return 'Alps_Only'
      case C.SWITCH_HYBRID:
        return 'MX_Alps_Hybrid'
      default: {
        throw Error(`Invalid switch type ${this.keyboard.settings.switchType}`)
      }
    }
  }

  get footprint() {
    switch (this.keyboard.settings.switchType) {
      case C.SWITCH_MX:
        return `MXOnly-${this.size.w}U${this.size.w === 6 ? '-Centered' : ''}${
          this.reversedStabs ? '-ReversedStabilizers' : ''
        }-NoLED`
      case C.SWITCH_HOTSWAP:
        return `MXOnly-${this.size.w}U${
          this.size.w === 6 ? '-Centered' : ''
        }-Hotswap${this.reversedStabs ? '-ReversedStabilizers' : ''}`
      case C.SWITCH_ALPS:
        return `ALPS-${this.size.w}U${this.size.w === 6 ? '-Centered' : ''}`
      case C.SWITCH_HYBRID:
        return `MX-${this.size.w}U${this.size.w === 6 ? '-Centered' : ''}${
          this.reversedStabs ? '-ReversedStabilizers' : ''
        }-NoLED`
      default: {
        throw Error(`Invalid switch type ${this.keyboard.settings.switchType}`)
      }
    }
  }

  getReversedStabs(p) {
    if (!p) {
      this.reversedStabs = false
      return
    }

    const [profile, row] = p.split(' ')
    this.reversedStabs = row === 'SPACE' && this.size.w >= 2
  }

  /*
   * Guess the legend of the key.
   */
  guessLegend() {
    // Get the last legend.
    const legends = this.legend
      .split('\n')
      .filter((legend, index) => ![4, 5, 11].includes(index))
    const legend = legends[legends.length - 1]

    // Look for an alias.
    const keycode = C.KEYCODE_ALIASES[legend.toUpperCase()]
    if (keycode) {
      this.keycodes[0] = new Keycode(keycode.template.raw[0], [])
    } else {
      // Default to KC_NO.
      this.keycodes[0] = new Keycode('KC_NO', [])
    }
  }

  /*
   * Find the layout option of the key
   */
  getLayoutOption() {
    const legends = this.legend.split('\n')
    const layout = legends[4]
    const layoutOption = legends[5]

    if (layout && layoutOption) {
      this.layout = layout
      this.layoutOption = layoutOption
    }
  }

  /*
   * Select the key.
   *
   * @param {Number} level The level of selection of the key.
   */
  select(level: number) {
    // Deselect all the keys in the keyboard.
    this.keyboard.keys.forEach((key) => {
      // eslint-disable-next-line no-param-reassign
      key.selected = 0
    })

    // Select this key.
    this.selected = level
    this.keyboard.selected = this

    // Update the state.
    this.keyboard.state.update()
  }

  /*
   * Serialize the key.
   *
   * @return {String} The serialized key.
   */
  serialize() {
    // Serialize all the subcomponents.
    const { id } = this
    const { legend } = this
    const { state } = this
    const { row } = this
    const { col } = this
    const keycodes = this.keycodes.map((keycode) => keycode.serialize())

    // Return JSON representation.
    const json = {
      id,
      legend,
      state,
      row,
      col,
      keycodes,
    }

    return json
  }

  /*
   * Deserialize a key.
   *
   * @param {Keyboard} keyboard The keyboard associated with the key.
   * @param {serialized} The serialized key.
   *
   * @return {Key} The deserialized key.
   */
  static deserialize(keyboard, serialized) {
    // Get the subfields.
    const { id } = serialized
    const { legend } = serialized
    const { state } = serialized
    const { row } = serialized
    const { col } = serialized
    const keycodes = serialized.keycodes.map((keycode) =>
      Keycode.deserialize(keycode)
    )

    // Build the new object.
    const key = new Key(keyboard, id, legend, state)
    key._row = row
    key._col = col
    key.keycodes = keycodes
    return key
  }
}

export default Key

export type { IKey }
