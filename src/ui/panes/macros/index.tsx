import { useState } from 'react'
import Editor from './editor'
import NumberBox from '../../elements/numberbox'
import C from '../../../const'
import State from '../../../state'

interface IMacrosProps {
  state: State
}

function Macros({ state }: IMacrosProps) {
  const [currentMacro, setCurrentMacro] = useState<number>(0)
  const handleChangeMacro = (code: number) => {
    setCurrentMacro(code)
  }

  return (
    <div className="pane-keymap">
      Select a macro to modify.
      <div style={{ height: '0.5rem' }} />
      <NumberBox
        style={{ width: '3rem' }}
        value={currentMacro}
        min={0}
        minus="chevron-down"
        plus="chevron-up"
        onChange={handleChangeMacro}
      />
      <div style={{ height: '1.5rem' }} />
      Edit the macro.
      <div style={{ height: '0.5rem' }} />
      <Editor key={currentMacro} currentMacro={currentMacro} state={state} />
    </div>
  )
}

export default Macros
