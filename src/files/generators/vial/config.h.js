import Generator from '../index'

import template from './templates/config.h'

class VialConfigH extends Generator {
  constructor(keyboard, vialUid) {
    super(keyboard)
    this.vialUid = vialUid
  }

  loadTemplate() {
    return template
  }

  fillTemplate() {
    return {
      vial_uid: this.vialUid,
    }
  }
}

export default VialConfigH
