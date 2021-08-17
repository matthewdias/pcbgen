import Rectangular from './rectangular';

import template from './frame.ejs'

class Frame extends Rectangular {
  constructor(kb, name, radius) {
    super(kb, 'frame', name, radius);
    this.template = template;
  }
}

export default Frame;
