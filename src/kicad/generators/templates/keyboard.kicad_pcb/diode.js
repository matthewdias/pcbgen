const Component = require('./component');

class Diode extends Component {
  constructor(key, nets) {
    super('diode', `D${key.id}`, 2, nets);
    this.setPad(1, `row${key.row}`);
    this.template = require('./diode.ejs');
    this.key = key;
  }

  getAdditionalData(x, y, options) {
    return {
      key: this.key,
      x: ((x + 1 + (0.5 * this.key.size.w)) * 1905) / 100,
      y: ((y + 1 + (0.5 * this.key.size.h)) * 1905) / 100,
    };
  }
}

module.exports = Diode;
