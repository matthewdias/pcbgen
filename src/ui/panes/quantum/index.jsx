import React from "react"

// import CodeMirror from "react-codemirror2"
// import "codemirror/mode/clike/clike"

import C from "../../../const"

class Quantum extends React.Component {
  render() {
    const { state } = this.props
    const { keyboard } = state

    return (
      <div className="pane-quantum">
        <strong>Do not touch this unless you know what you're doing!</strong>
        <br />
        Edit custom Quantum functions.
        <div style={{ height: "0.5rem" }} />
        <button
          className="light"
          onClick={() => {
            keyboard.quantum = C.QUANTUM_DEFAULT
            state.update()
          }}
        >
          Reset to default
        </button>
        <div style={{ height: "0.5rem" }} />
        <div className="pane-quantum-editor">
          <input
            value={keyboard.quantum}
            onChange={(v) => {
              keyboard.quantum = v
              state.update()
            }}
            // options={{
            // 	mode: 'text/x-c',
            // 	lineNumbers: true,
            // 	indentUnit: 4,
            // 	indentWithTabs: true
            // }}
          />
        </div>
      </div>
    )
  }
}

export default Quantum
