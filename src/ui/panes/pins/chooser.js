import React from 'react'

import C from '../../../const'

function Chooser(props) {
  const { state } = props
  const { keyboard } = state

  const pin = props.pin || 'N/A'

  // Get list of available pins.
  const pins = props.backlight
    ? ['B5', 'B6', 'B7']
    : C.PINS[keyboard.controller].slice() // B5, B6, and B7 on backlight.

  // Allow for no pin if set.
  if (props.noPin) pins.splice(0, 0, null)

  return (
    <select
      value={pin}
      onChange={(e) =>
        props.onChange &&
        props.onChange(e.target.value === 'N/A' ? null : e.target.value)
      }
    >
      {pins.map((p, index) => (
        <option key={index} value={p || 'N/A'}>
          {p || 'N/A'}
        </option>
      ))}
    </select>
  )
}

export default Chooser
