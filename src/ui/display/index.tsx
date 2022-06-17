import { useContext } from 'react'
import classNames from 'classnames'

import Key from './key'

import Keycode from '../../state/keyboard/keycode'

import Wiring from './wiring'
import Keymap from './keymap'

import C from '../../const'
import { UIActionTypes, uiContext } from '../../context/ui'

function Display({ state }) {
  const { keyboard } = state
  const [uiState, uiDispatch] = useContext(uiContext)

  /*
   * Generate a function that manages the zoom of the board.
   *
   * @param {Number} direction -1 to zoom out, 1 to zoom in.
   *
   * @return {Function} A function that zooms in the given direction when called.
   */
  const zoom = (direction) => () => {
    // Get the current key size.
    const { keySize } = uiState

    // Apply the direction.
    const directionalKeySize = keySize + direction * C.KEY_SIZE_INC

    // Bound the size.
    const boundedKeySize = Math.min(
      Math.max(directionalKeySize, C.KEY_SIZE_MIN),
      C.KEY_SIZE_MAX
    )
    uiDispatch({
      type: UIActionTypes.setFields,
      payload: { keySize: boundedKeySize },
    })
  }

  /*
   * Create a function to handle when a key is clicked.
   *
   * @param {Key} key The key to handle.
   *
   * @return {Function} A function that can be used for an onClick event.
   */
  const onKeyClick = (key) => (e) => {
    // Do different things depending on the screen.
    if (state.screen === C.SCREEN_WIRING) {
      key.select(C.KEY_SELECT)
    } else if (state.screen === C.SCREEN_KEYMAP) {
      // Consume the event.
      e.stopPropagation()

      // Set the key to program.
      key.select(C.KEY_PROGRAM)

      // Clicking anywhere will change to ordinary select.
      const clickListener = () => {
        if (key.selected) key.select(C.KEY_SELECT)
        window.onclick = null
      }
      window.onclick = clickListener

      const keyListener = (e) => {
        if (key.selected === C.KEY_PROGRAM) {
          // Program the key based on the typed key.
          if (C.KEYCODE_NUMBERS[e.which]) {
            const layer = uiState['keymap-layer']
            key.keycodes[layer] = Keycode.getDefault(C.KEYCODE_NUMBERS[e.which])
            keyboard.verify()
          }
          key.select(C.KEY_SELECT)
        }
        window.onkeydown = null
      }
      window.onkeydown = keyListener
    } else {
      throw Error('Unknown screen state', state.screen)
    }
  }

  const { keySize } = uiState

  const className = classNames('display', { valid: keyboard.valid })

  const style = {
    width: keyboard.bounds.max.x * keySize + 14,
    height: keyboard.bounds.max.y * keySize + 14,
    marginTop: state.screen === C.SCREEN_WIRING ? '2rem' : '0',
  }

  return (
    <div className="display-wrapper">
      <h4>Board Size&nbsp;&nbsp;&nbsp;</h4>
      <button type="button" className="small light" onClick={zoom(-1)}>
        <i className="fa fa-search-minus" />
      </button>
      &nbsp;
      <button type="button" className="small light" onClick={zoom(1)}>
        <i className="fa fa-search-plus" />
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <h4>Flip&nbsp;&nbsp;</h4>
      <input type="checkbox" checked={uiState['display-flip']} />
      <label
        onClick={() => {
          uiDispatch({ type: UIActionTypes.toggleDisplayFlip })
        }}
        onKeyDown={() => {
          uiDispatch({ type: UIActionTypes.toggleDisplayFlip })
        }}
      />
      <br />
      <br />
      <div className={className} style={style}>
        <div className="display-inner">
          {
            // Display all the keys.
            keyboard.keys
              .filter((key) => {
                if (!key.layout && !key.layoutOption) {
                  return true
                }

                return key.layoutOption === uiState[`layout:${key.layout}`]
              })
              .map((key, index) => (
                <Key
                  state={state}
                  data={key}
                  key={index}
                  onClick={onKeyClick(key)}
                />
              ))
          }
        </div>
        {
          // Wiring.
          state.screen === C.SCREEN_WIRING && <Wiring state={state} />
        }
        {
          // Keymap.
          state.screen === C.SCREEN_KEYMAP && <Keymap state={state} />
        }
      </div>
    </div>
  )
}

export default Display
