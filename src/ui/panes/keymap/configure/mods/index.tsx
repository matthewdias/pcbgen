/* eslint-disable no-bitwise */

import Toggle from '../../../../elements/toggle'

interface IModsProps {
  mods: number
  onChange: (mods: number) => void
}

function Mods({ mods, onChange }: IModsProps) {
  const handleChange = (v: boolean, mod: number) => {
    if (onChange) {
      onChange(v ? mods | mod : mods & ~mod)
    }
  }

  return (
    <div>
      &nbsp;&nbsp;Mods&nbsp;&nbsp;&nbsp;
      <Toggle
        value={Boolean(mods & 0b000001)}
        onChange={(v) => {
          handleChange(v, 0b000001)
        }}
      >
        CTRL
      </Toggle>
      <Toggle
        value={Boolean(mods & 0b000010)}
        onChange={(v) => {
          handleChange(v, 0b000010)
        }}
      >
        SHIFT
      </Toggle>
      <Toggle
        value={Boolean(mods & 0b000100)}
        onChange={(v) => {
          handleChange(v, 0b000100)
        }}
      >
        ALT
      </Toggle>
      <Toggle
        value={Boolean(mods & 0b001000)}
        onChange={(v) => {
          handleChange(v, 0b001000)
        }}
      >
        GUI
      </Toggle>
      <Toggle
        value={Boolean(mods & 0b010000)}
        onChange={(v) => {
          handleChange(v, 0b010000)
        }}
      >
        HYPER
      </Toggle>
      <Toggle
        value={Boolean(mods & 0b100000)}
        onChange={(v) => {
          handleChange(v, 0b100000)
        }}
      >
        MEH
      </Toggle>
    </div>
  )
}

export default Mods
