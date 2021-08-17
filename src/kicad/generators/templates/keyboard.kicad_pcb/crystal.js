import Component from './component';

import template from './crystal.ejs'
class Crystal extends Component {
  constructor(nets) {
    super('crystal', null, 4, nets, 'X');
    this.template = template;
  }
}

export default Crystal;
