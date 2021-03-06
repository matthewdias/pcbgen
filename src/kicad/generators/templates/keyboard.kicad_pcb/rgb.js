import Component from './component';

import template from './rgb.ejs'

class RGB extends Component {
  constructor(index, nets) {
    super('rgb', `RGB${index}`, 4, nets);
    this.setPad(1, '+5V');
    this.setPad(3, 'GND');
    this.setPad(4, index == 0 ? 'RGB' : `Net-(RGB${index - 1}-Pad2)`)
    this.template = template;
    this.index = index;
  }

  getAdditionalData(x, y, options) {
    return {
      index: this.index
    };
  }
}

export default RGB;
