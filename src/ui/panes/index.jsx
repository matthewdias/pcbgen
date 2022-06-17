import React from "react"

import Tabs from "./tabs"
import Wiring from "./wiring"
import Pins from "./pins"
import Keymap from "./keymap"
import Macros from "./macros"
import Quantum from "./quantum"
import Settings from "./settings"
import Compile from "./compile"

import C from "../../const"

function Panes({ state }) {
  return (
    <div className="panes-wrapper">
      <div className="panes">
        <Tabs state={state} />
        <div className="panes-content">
          {state.screen === C.SCREEN_WIRING && <Wiring state={state} />}
          {state.screen === C.SCREEN_PINS && <Pins state={state} />}
          {state.screen === C.SCREEN_KEYMAP && <Keymap state={state} />}
          {state.screen === C.SCREEN_MACROS && <Macros state={state} />}
          {state.screen === C.SCREEN_QUANTUM && <Quantum state={state} />}
          {state.screen === C.SCREEN_SETTINGS && <Settings state={state} />}
          {state.screen === C.SCREEN_COMPILE && <Compile state={state} />}
        </div>
      </div>
    </div>
  )
}

export default Panes
