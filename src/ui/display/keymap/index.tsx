import { useContext } from 'react'
import C from '../../../const'
import { uiContext } from '../../../context/ui'
import State from '../../../state'

interface IKeymapProps {
  state: State
}

function Keymap({ state }) {
  const [uiState] = useContext(uiContext)
  const { keyboard } = state

  const flipped = uiState['display-flip']
  const { keySize } = uiState
  const layer = uiState['keymap-layer']

  // Create a list of keycode boxes.
  const keys = keyboard.keys
    .filter((key) => {
      if (!key.layout && !key.layoutOption) {
        return true
      }

      return key.layoutOption === uiState[`layout:${key.layout}`]
    })
    .map((key, index) => {
      const style = {
        top: key.pos.y * keySize,
        left:
          (flipped
            ? state.keyboard.bounds.max.x - key.pos.x - key.size.w
            : key.pos.x) * keySize,
      }

      // Only apply rotation if needed.
      if (key.angle !== 0) {
        const rotateString = `rotate(${key.angle}deg)`
        style.WebkitTransform = rotateString
        style.MozTransform = rotateString
        style.msTransform = rotateString
        style.transform = rotateString
      }

      const blockStyle = {
        width: key.size.w * keySize - 20,
        height: key.size.h * keySize - 12,
        lineHeight: `${key.size.h * keySize - 9}px`,
      }

      return (
        <div className="display-keycode" key={index} style={style}>
          <div className="display-keycode-block" style={blockStyle}>
            {key.keycodes[layer].getName()}
          </div>
        </div>
      )
    })

  return <div className="display-inner">{keys}</div>
}

export default Keymap
