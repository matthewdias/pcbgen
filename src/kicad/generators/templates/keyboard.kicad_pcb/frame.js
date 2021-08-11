const Rectangular = require('./rectangular');

class Frame extends Rectangular {
  constructor(kb, name, radius) {
    super(kb, 'frame', name, radius);
    this.template = require('./frame.ejs');
  }
}

module.exports = Frame;
