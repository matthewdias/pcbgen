import Component from './component';

import template from './diode.ejs'

class Diode extends Component {
  constructor(key, nets) {
    super('diode', `D${key.id}`, 2, nets);
    this.setPad(1, `row${key.row}`);
    this.template = template;
    this.key = key;
  }

  getAdditionalData(x, y, options) {
    return {
      key: this.key,
      x: ((x + 1 + (0.5 * this.key.size.w)) * 1905) / 100,
      y: ((y + 1 + (0.5 * this.key.size.h)) * 1905) / 100,
    };
  }
}

export default Diode;
