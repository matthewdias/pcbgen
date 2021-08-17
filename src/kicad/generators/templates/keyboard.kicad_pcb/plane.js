import Rectangular from './rectangular';

import template from './plate.ejs'
class Plane extends Rectangular {
  constructor(kb, name, layer, gap=2) {
    super(kb, 'plane', name, gap);
    this.template = template;
    this.layer = layer;
  }

  getAdditionalData() {
    return Object.assign(super.getAdditionalData(), { layer: this.layer });
  }
}

export default Plane;
