import { useContext } from 'react'
import Wire from './wire'
import C from '../../../const'
import { uiContext } from '../../../context/ui'

function Wiring({ state }) {
  const { keyboard } = state
  const [uiState, uiDispatch] = useContext(uiContext)
  const flipped = uiState['display-flip']
  const { keySize } = uiState

  // Create a list of Wires.
  const wires = []
  for (let r = 0; r < keyboard.rows; r++) {
    for (let c = 0; c < keyboard.cols; c++) {
      // Check if there's a key at the matrix position.
      let keys
      if (!(keys = keyboard.wiring[`${r},${c}`])) continue

      // Check if there's a key at a previous row.
      let prevRow
      let i = 1
      while (!(prevRow = keyboard.wiring[`${r - i},${c}`]) && i++ <= r);
      if (i <= r) {
        // Create wires.
        for (const key of keys) {
          for (const rowKey of prevRow) {
            wires.push(
              <Wire
                col
                visible={
                  (!rowKey.layout ||
                    rowKey.layoutOption ===
                      uiState[`layout:${rowKey.layout}`]) &&
                  (!key.layout ||
                    key.layoutOption === uiState[`layout:${key.layout}`])
                }
                state={state}
                p1={key.center}
                p2={rowKey.center}
                key={`${key.id},${rowKey.id}`}
              />
            )
          }
        }
      }

      // Check if there's a key at a previous column.
      let prevCol
      i = 1
      while (!(prevCol = keyboard.wiring[`${r},${c - i}`]) && i++ <= c);
      if (i <= c) {
        // Create wires.
        for (const key of keys) {
          for (const colKey of prevCol) {
            wires.push(
              <Wire
                row
                visible={
                  (!colKey.layout ||
                    colKey.layoutOption ===
                      uiState[`layout:${colKey.layout}`]) &&
                  (!key.layout ||
                    key.layoutOption === uiState[`layout:${key.layout}`])
                }
                state={state}
                p1={key.center}
                p2={colKey.center}
                key={`${key.id},${colKey.id}`}
              />
            )
          }
        }
      }
    }
  }

  // Get the positions for each label.
  const rowPositions = {}
  const colPositions = {}
  for (const key of keyboard.keys) {
    if (!rowPositions[key.row] || key.center.x < rowPositions[key.row].x) {
      rowPositions[key.row] = key.center
    }
    if (!colPositions[key.col] || key.center.y < colPositions[key.col].y) {
      colPositions[key.col] = key.center
    }
  }

  // Place labels for the wires.
  const labels = []
  for (let r = 0; r < keyboard.rows; r++) {
    if (!rowPositions[r]) continue

    const style = {
      top: rowPositions[r].y * keySize,
      left: -30,
    }
    labels.push(
      <div className="display-wire-label row" style={style} key={`r${r}`}>
        {r}
      </div>
    )
  }
  for (let c = 0; c < keyboard.cols; c++) {
    if (!colPositions[c]) continue

    const style = {
      top: -30,
      left:
        (flipped
          ? keyboard.bounds.max.x - colPositions[c].x
          : colPositions[c].x) * keySize,
    }
    labels.push(
      <div className="display-wire-label col" style={style} key={`c${c}`}>
        {c}
      </div>
    )
  }

  return (
    <div className="display-inner">
      {keyboard.keys
        .filter((key) => {
          if (!key.layout && !key.layoutOption) {
            return true
          }

          return key.layoutOption === uiState[`layout:${key.layout}`]
        })
        .map((key, index) => (
          // Draw a pad on each key.
          <div
            className="display-pad"
            style={{
              top: key.center.y * keySize,
              left:
                (flipped
                  ? keyboard.bounds.max.x - key.center.x
                  : key.center.x) * keySize,
            }}
            key={index}
          />
        ))}
      {wires}
      {labels}
    </div>
  )
}

export default Wiring
