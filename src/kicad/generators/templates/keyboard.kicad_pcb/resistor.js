import Component from './component';

import template from './resistor.ejs'

class Resistor extends Component {
  constructor(resistence, nets) {
    super('resistor', null, 2, nets);
    this.template = template;
    this.res = resistence;
  }

  getAdditionalData() {
    return { res: this.res };
  }
}

export default Resistor;
