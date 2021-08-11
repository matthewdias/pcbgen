const Component = require('./component');
const C = require('const');
const mx = require('./switch-mx.ejs')
const hotswap = require('./switch-hotswap.ejs')
const alps = require('./switch-alps.ejs')
const hybrid = require('./switch-hybrid.ejs')

class Switch extends Component {
  constructor(key, nets, leds=false) {
    super('switch', `K${key.id}`, 4, nets);
    switch (key.keyboard.settings.switchType) {
        case C.SWITCH_MX: {
            this.template = mx
            break;
        }
        case C.SWITCH_HOTSWAP: {
            this.template = hotswap
            break;
        }
        case C.SWITCH_ALPS: {
            this.template = alps
            break;
        }
        case C.SWITCH_HYBRID: {
            this.template = hybrid
            break;
        }
    }
    this.key = key;
    this.leds = leds;
  }

  getAdditionalData(x, y, rotation) {
    return {
      key: this.key,
      leds: this.leds,
      x: ((x + 1.5 + ((this.key.size.w-1)/2)) * 1905) / 100,
      y: ((y + 1.5) * 1905) / 100,
    };
  }
}

module.exports = Switch;
