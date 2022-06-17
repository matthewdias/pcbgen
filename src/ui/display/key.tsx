import classNames from 'classnames'
import { CSSProperties, useContext } from 'react'
import C from '../../const'
import State from '../../state'
import { uiContext, UIActionTypes } from '../../context/ui'

interface IKeyProps {
  state: State
  data: {
    selected: number
    pos: {
      x: number
      y: number
    }
    offset: {
      x: number
      y: number
    }
    size: {
      w: number
      h: number
    }
    size2: {
      w: number
      h: number
    }
    angle: number
  }
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function Key({ state, data, onClick, onMouseEnter, onMouseLeave }: IKeyProps) {
  const [uiState, uiDispatch] = useContext(uiContext)
  const flipped = uiState['display-flip']
  const keySize = uiState.keySize

  const className = classNames('display-key', {
    select1: data.selected === 1,
    select2: data.selected === 2,
  })

  const rotateString = `rotate(${data.angle}deg)`
  const rotation: CSSProperties = {
    WebkitTransform: rotateString,
    // Hack for missing CSS properties, see here:
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36705
    ['MozTransform' as any]: rotateString,
    msTransform: rotateString,
    transform: rotateString,
  }

  const style: CSSProperties = {
    top: data.pos.y * keySize,
    left:
      (flipped
        ? state.keyboard.bounds.max.x - data.pos.x - data.size.w
        : data.pos.x) * keySize,
    // Only apply rotation if needed.
    ...(data.angle !== 0 ? rotation : {}),
  }

  const block1Style = {
    width: data.size.w * keySize,
    height: data.size.h * keySize,
  }
  const block2Style = {
    width: data.size2.w * keySize,
    height: data.size2.h * keySize,
    top: data.offset.y * keySize,
    left:
      (flipped ? data.size.w - data.size2.w - data.offset.x : data.offset.x) *
      keySize,
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      style={style}
      onClick={onClick}
      onKeyDown={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
    >
      <div className="display-key-block" style={block1Style}>
        <div className="display-key-block-inner-background" />
        <div className="display-key-block-inner" />
      </div>
      <div className="display-key-block" style={block2Style}>
        <div className="display-key-block-inner-background" />
        <div className="display-key-block-inner" />
      </div>
    </div>
  )
}

export default Key
