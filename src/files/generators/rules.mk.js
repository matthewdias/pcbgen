import Generator from './index'

import C from '../../const'

import template from './templates/rules.mk'

class RulesMK extends Generator {
  loadTemplate() {
    return template
  }

  fillTemplate() {
    const { keyboard } = this

    let mcu
    switch (keyboard.controller) {
      case C.CONTROLLER_ATMEGA32U2:
        mcu = 'atmega32u2'
        break
      case C.CONTROLLER_ATMEGA32U4:
        mcu = 'atmega32u4'
        break
      case C.CONTROLLER_AT90USB1286:
        mcu = 'at90usb1286'
        break
      default: {
        throw Error(`Invalid controller ${keyboard.controller}`)
      }
    }

    return {
      mcu,
      bootmagic: 'lite',
      use_backlight: keyboard.pins.led ? 'yes' : 'no ',
      use_rgb: keyboard.pins.rgb ? 'yes' : 'no ',
    }
  }
}

export default RulesMK
