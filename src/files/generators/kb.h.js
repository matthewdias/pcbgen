import Generator from './index'

import template from './templates/kb.h'

class KeyboardH extends Generator {
  loadTemplate() {
    return template
  }

  fillTemplate() {
    const { keyboard } = this

    // Generate the keymaps.
    const keymap1 = (() => {
      let result = ''

      for (let row = 0; row < keyboard.rows; row += 1) {
        let rowString = ''
        for (let col = 0; col < keyboard.cols; col += 1) {
          const keys = keyboard.wiring[`${row},${col}`]

          if (keys) {
            rowString += `K${keys[0].rowHex}${keys[0].colHex}, `
          } else {
            rowString += '     '
          }
        }

        if (row === keyboard.rows - 1) {
          rowString = rowString.replace(/,[ ]*?$/, ', ')
        }
        result += `\t${rowString}\\\n`
      }

      result = `${result.substring(0, result.length - 4)}  \\`

      return result
    })()

    const keymap2 = (() => {
      let result = ''

      for (let row = 0; row < keyboard.rows; row += 1) {
        let rowString = ''
        for (let col = 0; col < keyboard.cols; col += 1) {
          const keys = keyboard.wiring[`${row},${col}`]

          if (keys) {
            rowString += `K${keys[0].rowHex}${keys[0].colHex}, `
          } else {
            rowString += 'XXX, '
          }
        }

        rowString = rowString.trim()
        result += `\t{ ${rowString.substring(0, rowString.length - 1)} }, \\\n`
      }

      result = `${result.substring(0, result.length - 4)}  \\`

      return result
    })()

    return {
      current_year: new Date().getFullYear(),
      author: keyboard.settings.author,
      keymap_1: keymap1,
      keymap_2: keymap2,
    }
  }
}

export default KeyboardH
