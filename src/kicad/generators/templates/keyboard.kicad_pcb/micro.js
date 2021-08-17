import Component from './component';

import template from './micro.ejs'

class Micro extends Component {
  constructor(nets) {
    super('micro', null, 44, nets, 'U');
    this.template = template;
  }
}

export default Micro;
