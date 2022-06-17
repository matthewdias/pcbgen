import classNames from 'classnames'
import { useContext } from 'react'

import C from '../../../const'
import { uiContext } from '../../../context/ui'
import State from '../../../state'

interface IWireProps {
  visible: boolean
  state: State
  p1: { x: number; y: number }
  p2: { x: number; y: number }
  row: number
  col: number
}

function Wire({ visible, state, p1, p2, row, col }: IWireProps) {
  const [uiState] = useContext(uiContext)

  if (!visible) {
    return null
  }

  const flipped = uiState['display-flip']
  const { keySize } = uiState

  const p1Item = { ...p1 }
  const p2Item = { ...p2 }
  if (flipped) {
    p1Item.x = state.keyboard.bounds.max.x - p1Item.x
    p2Item.x = state.keyboard.bounds.max.x - p2Item.x
  }

  const className = classNames('display-wire', {
    'display-wire-row': row,
    'display-wire-col': col,
  })

  // Calculate the angle and length.
  const angle =
    (Math.atan2(p2Item.y - p1Item.y, p2Item.x - p1Item.x) * 180) / Math.PI
  const length = Math.sqrt(
    (p2Item.x - p1Item.x) ** 2 + (p2Item.y - p1Item.y) ** 2
  )

  const rotateString = `rotate(${angle}deg)`
  const style = {
    top: p1Item.y * keySize,
    left: p1Item.x * keySize,
    width: length * keySize,

    WebkitTransform: rotateString,
    MozTransform: rotateString,
    msTransform: rotateString,
    transform: rotateString,
  }

  return <div className={className} style={style} />
}

export default Wire
