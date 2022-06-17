import NumberBox from '../../elements/numberbox'

import Configure from './configure'

import C from '../../../const'
import State from '../../../state'
import { useContext } from 'react'
import { uiContext, UIActionTypes } from '../../../context/ui'

interface IKeymapProps {
  state: State
}

function Keymap({ state }: IKeymapProps) {
  const { keyboard } = state
  const { selected } = keyboard
  const [uiState, uiDispatch] = useContext(uiContext)

  const layer = uiState['keymap-layer']

  return (
    <div className="pane-keymap">
      Select a layer to modify.
      <div style={{ height: '0.5rem' }} />
      <NumberBox
        style={{ width: '3rem' }}
        value={layer}
        min={0}
        max={C.KEYMAP_MAX_LAYERS - 1}
        minus="chevron-down"
        plus="chevron-up"
        onChange={(v) => {
          uiDispatch({
            type: UIActionTypes.setFields,
            payload: {
              'keymap-layer': v,
            },
          })
        }}
      />
      <div style={{ height: '1.5rem' }} />
      Configure the selected key.
      <div style={{ height: '0.5rem' }} />
      {(() => {
        if (selected) {
          return (
            <div>
              <div className="pane-keymap-key">
                <Configure
                  keycode={selected.keycodes[layer]}
                  onChange={(code) => {
                    selected.keycodes[layer] = code
                    keyboard.verify()
                    state.update()
                  }}
                  key={selected.id}
                />
              </div>
              <br />
              <br />
              Read the{' '}
              <a
                href="https://docs.qmk.fm/keycodes.html"
                target="_blank"
                rel="noreferrer"
              >
                QMK Docs
              </a>{' '}
              for an explanation of all the keycodes.
            </div>
          )
        }
        return <h5>No key selected</h5>
      })()}
    </div>
  )
}

export default Keymap
