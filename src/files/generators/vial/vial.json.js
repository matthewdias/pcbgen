import Generator from '../index'

import template from './templates/vial.json'

const tempStates = ['w', 'h', 'x2', 'y2', 'w2', 'h2', 'l', 'n', 'd']
const ignoredStates = ['c', 'p', 'a']

class VialJSON extends Generator {
  loadTemplate() {
    return template
  }

  fillTemplate() {
    const { keyboard } = this
    let state = {}
    const keymap = Array.from({ length: keyboard.kleRows }, () => [])
    const layouts = Object.keys(keyboard.layouts)
    const labels = Object.keys(keyboard.layoutOptions).map((layout) =>
      [layout].concat(Object.keys(keyboard.layoutOptions[layout]))
    )

    keyboard.keys.map((key, index) => {
      let keyState = {}

      if (index === 0) {
        state = { ...key.state }
        keyState = { ...key.state }
      } else {
        for (const mod in key.state) {
          if (ignoredStates.includes(mod)) {
            continue
          }

          if (
            key.state[mod] != state[mod] ||
            mod == 'xOffset' ||
            mod == 'yOffset'
          ) {
            if (mod == 'x' || mod == 'y') {
              continue
            }

            if (mod == 'xOffset' || mod == 'yOffset') {
              keyState[mod[0]] = key.state[mod]
              state[mod[0]] = key.state[mod]
              continue
            }

            if (tempStates.includes(mod)) {
              keyState[mod] = key.state[mod]
              continue
            }

            state[mod] = key.state[mod]
            keyState[mod] = key.state[mod]
          }
        }
      }

      const matrixLegend = `${key.row},${key.col}`
      const optionLegend =
        key.layout && key.layoutOption
          ? `\n\n\n${layouts.indexOf(key.layout)},${
              labels[layouts.indexOf(key.layout)].indexOf(key.layoutOption) - 1
            }`
          : ''
      const legend = matrixLegend + optionLegend

      if (!keyState || Object.keys(keyState).length === 0) {
        keymap[key.state.rowIndex].push(legend)
      } else {
        keymap[key.state.rowIndex].push(keyState, legend)
      }
    })

    return {
      name: keyboard.settings.name,
      vendor_id: keyboard.settings.vendorId || 'FEED',
      product_id: keyboard.settings.productId || '6060',
      lighting: keyboard.settings.rgbNum > 0 ? 'qmk_rgblight' : 'none',
      matrix_rows: keyboard.rows,
      matrix_cols: keyboard.cols,
      labels: JSON.stringify(labels),
      keymap: JSON.stringify(keymap.map((row) => row.flat(2))),
    }
  }
}

export default VialJSON
