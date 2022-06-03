import React from 'react'

import NumberBox from '../../elements/numberbox'
import Help from '../../elements/help'

import C from '../../../const'

interface IWiringProps {
  state: {
    keyboard: {
      rows: number
      cols: number
      selected?: {
        row: number
        col: number
      }
    }
  }
}

function Wiring({ state }: IWiringProps) {
  const { keyboard } = state
  const { selected } = keyboard

  return (
    <div className="pane-wiring">
      Change the number of rows and columns in the matrix.
      <div style={{ height: '0.5rem' }} />
      <h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Rows</h2>
      <NumberBox
        style={{ width: '3rem' }}
        min={1}
        value={keyboard.rows}
        onChange={(v) => {
          keyboard.rows = v
        }}
      />
      <div style={{ height: '0.5rem' }} />
      <h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Columns</h2>
      <NumberBox
        style={{ width: '3rem' }}
        min={1}
        value={keyboard.cols}
        onChange={(v) => {
          keyboard.cols = v
        }}
      />
      <div style={{ height: '1.5rem' }} />
      Change the position of the selected key in the matrix.
      <div style={{ height: '0.5rem' }} />
      {selected ? (
        <div>
          <h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Row</h2>
          <NumberBox
            style={{ width: '3rem' }}
            minus="chevron-up"
            plus="chevron-down"
            min={0}
            max={keyboard.rows - 1}
            value={selected.row}
            onChange={(v) => {
              selected.row = v
            }}
          />
          <div style={{ height: '0.5rem' }} />
          <h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Column</h2>
          <NumberBox
            style={{ width: '3rem' }}
            minus="chevron-left"
            plus="chevron-right"
            min={0}
            max={keyboard.cols - 1}
            value={selected.col}
            onChange={(v) => {
              selected.col = v
            }}
          />
        </div>
      ) : (
        <h5>No key selected</h5>
      )}
    </div>
  )
}

export default Wiring
