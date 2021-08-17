import Component from './component';

import template from './usb.ejs'

class Usb extends Component {
  constructor(nets) {
    super('usb', null, 6, nets, 'USB');
    this.template = template;
  }
}

export default Usb;
