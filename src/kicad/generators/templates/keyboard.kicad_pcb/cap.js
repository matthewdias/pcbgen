import Component from './component';

import template from './cap.ejs'

class Cap extends Component {
  constructor(nets) {
    super('cap', null, 2, nets);
    this.template = template
  }
}

export default Cap;
