const Component = require('./component');

class Rectangular extends Component {
  constructor(kb, type, name, radius) {
    super(type, name);
    this.x = (1905)/100;
    this.y = (1905)/100;
    this.x1 = ((kb.bounds.max.x + 1) * 1905)/100;
    this.y1 = ((kb.bounds.max.y + 1) * 1905)/100;
    this.radius = radius;
  }

  getAdditionalData() {
    const { x1, y1, radius } = this;
    return { x1, y1, radius };
  }

  render(gap=0) {
    this.x = this.x - gap;
    this.y = this.y - gap;
    this.x1 += this.initX + gap;
    this.y1 += this.initY + gap;
    return super.render(this.x, this.y);
  }
}

module.exports = Rectangular;
