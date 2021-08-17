import Element from './element';

import template from './connection.ejs'
class Connection extends Element {
  constructor() {
    super('connection');
    this.template = template;
  }
}

export default Connection;
