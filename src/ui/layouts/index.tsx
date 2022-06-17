import { useContext, useEffect } from 'react'
import classNames from 'classnames'
import C from '../../const'
import State from '../../state'
import { uiContext, UIActionTypes } from '../../context/ui'

interface ILayoutsProps {
  state: State
}

function Layouts({ state }: ILayoutsProps) {
  const { keyboard } = state
  const [uiState, uiDispatch] = useContext(uiContext)
  useEffect(() => {
    Object.keys(keyboard.layouts).forEach((layout) => {
      uiDispatch({
        type: UIActionTypes.setFields,
        payload: {
          [`layout:${layout}`]: keyboard.layouts[layout][0],
        },
      })
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <h4>LAYOUTS&nbsp;&nbsp;&nbsp;</h4>
      {Object.keys(keyboard.layouts).map((layout) => (
        <div key={layout}>
          <h4>{layout}</h4>
          <select
            style={{ width: '10rem', marginBottom: '1rem' }}
            value={uiState[`layout:${layout}`]}
            onChange={(e) => {
              uiDispatch({
                type: UIActionTypes.setFields,
                payload: {
                  [`layout:${layout}`]: e.target.value,
                },
              })
            }}
          >
            {keyboard.layouts[layout].map((layoutOption) => (
              <option key={layoutOption} value={layoutOption}>
                {layoutOption}
              </option>
            ))}
          </select>
        </div>
      ))}
      <br />
      <br />
    </div>
  )
}

export default Layouts
