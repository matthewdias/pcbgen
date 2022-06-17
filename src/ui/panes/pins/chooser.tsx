import { Key } from 'react'
import C from '../../../const'
import State from '../../../state'

interface IChooserProps {
  state: State
  pin: string | undefined
  noPin: boolean
  onChange: (value: string | null) => void
  backlight: boolean
}

function Chooser({
  state,
  pin: propPin,
  backlight,
  noPin,
  onChange,
}: IChooserProps) {
  const { keyboard } = state

  const pin = propPin || 'N/A'

  // Get list of available pins.
  const pins = backlight
    ? ['B5', 'B6', 'B7']
    : C.PINS[keyboard.controller].slice() // B5, B6, and B7 on backlight.

  // Allow for no pin if set.
  if (noPin) {
    pins.splice(0, 0, null)
  }

  return (
    <select
      value={pin}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value === 'N/A' ? null : e.target.value)
        }
      }}
    >
      {pins.map((p: Key | null | undefined) => (
        <option key={p} value={p || 'N/A'}>
          {p || 'N/A'}
        </option>
      ))}
    </select>
  )
}

export default Chooser
