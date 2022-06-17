import Generator from './index'

import C from '../../const'

import template from './templates/config.h'

class ConfigH extends Generator {
  loadTemplate() {
    return template
  }

  fillTemplate() {
    const { keyboard } = this

    return {
      current_year: new Date().getFullYear(),
      author: keyboard.settings.author,
      vendor_id: keyboard.settings.vendorId || 'FEED',
      product_id: keyboard.settings.productId || '6060',
      device_ver: keyboard.settings.deviceVer || '0001',
      manufacturer: keyboard.settings.manufacturer,
      product: keyboard.settings.name,
      rows: keyboard.rows,
      cols: keyboard.cols,
      row_pins: keyboard.pins.row.join(', '),
      col_pins: keyboard.pins.col.join(', '),
      diode_direction:
        keyboard.settings.diodeDirection === C.DIODE_COL2ROW
          ? 'COL2ROW'
          : 'ROW2COL',
      backlight_levels: keyboard.settings.backlightLevels,
      backlight_pin: keyboard.pins.led
        ? `#define BACKLIGHT_PIN ${keyboard.pins.led}`
        : '',
      rgb_pin: keyboard.pins.rgb
        ? `#define RGB_DI_PIN ${keyboard.pins.rgb}`
        : '',
      num_rgb: keyboard.settings.rgbNum,
      led_num: keyboard.pins.num
        ? `#define LED_NUM_LOCK_PIN ${keyboard.pins.num}`
        : '',
      led_caps: keyboard.pins.caps
        ? `#define LED_CAPS_LOCK_PIN ${keyboard.pins.caps}`
        : '',
      led_scroll: keyboard.pins.scroll
        ? `#define LED_SCROLL_LOCK_PIN ${keyboard.pins.scroll}`
        : '',
      led_compose: keyboard.pins.compose
        ? `#define LED_COMPOSE_PIN ${keyboard.pins.compose}`
        : '',
      led_kana: keyboard.pins.kana
        ? `#define LED_KANA_PIN ${keyboard.pins.kana}`
        : '',
    }
  }
}

export default ConfigH
