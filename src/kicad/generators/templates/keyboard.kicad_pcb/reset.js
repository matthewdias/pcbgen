import Component from './component';

import template from './reset.ejs';

class Reset extends Component {
  constructor(nets) {
    super('reset', null, 2, nets);
    this.template = template;
  }
}

export default Reset;
