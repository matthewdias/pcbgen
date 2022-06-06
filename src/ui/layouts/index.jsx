import React, { useEffect } from 'react'
import classNames from 'classnames'

import C from '../../const'

function Layouts({ state }) {
  const { keyboard, ui } = state
  useEffect(() => {
    Object.keys(keyboard.layouts).forEach((layout) =>
      ui.set(`layout:${layout}`, keyboard.layouts[layout][0])
    )
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <h4>LAYOUTS&nbsp;&nbsp;&nbsp;</h4>
      {Object.keys(keyboard.layouts).map((layout) => (
        <div key={layout}>
          <h4>{layout}</h4>
          <select
            style={{ width: '10rem', marginBottom: '1rem' }}
            value={ui.get(`layout:${layout}`)}
            onChange={(e) => ui.set(`layout:${layout}`, e.target.value)}
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
