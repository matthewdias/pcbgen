import React from 'react'
import classNames from 'classnames'

import Action from './action'

import C from '../../../../const'
import State from '../../../../state'

interface IEditorProps {
  currentMacro: number
  state: State
}

class Editor extends React.Component<IEditorProps> {
  constructor(props: IEditorProps) {
    super(props)

    // Initial state.
    this.state = {
      recording: false,
    }

    // Bind functions.
    this.addAction = this.addAction.bind(this)
    this.changeAction = this.changeAction.bind(this)
    this.removeAction = this.removeAction.bind(this)
    this.upAction = this.upAction.bind(this)
    this.downAction = this.downAction.bind(this)
    this.startRecording = this.startRecording.bind(this)
    this.stopRecording = this.stopRecording.bind(this)
    this.clear = this.clear.bind(this)
  }

  /*
   * Add an action to the macro.
   */
  addAction() {
    const { state, currentMacro } = this.props
    const { keyboard } = state

    const macro = keyboard.getMacro(currentMacro)

    // Add the default macro action.
    macro.push({
      action: C.MACRO_NONE,
      argument: null,
    })
    keyboard.setMacro(currentMacro, macro)
  }

  /*
   * Change a macro action.
   *
   * @param {Number} index The index of the action.
   * @param {Object} action The new action.
   */
  changeAction(index, action) {
    const { state, currentMacro } = this.props
    const { keyboard } = state
    const macro = keyboard.getMacro(currentMacro)

    // Change the macro.
    macro[index].action = action.action
    macro[index].argument = action.argument

    keyboard.setMacro(currentMacro, macro)
  }

  /*
   * Remove a macro action.
   *
   * @param {Number} index The index of the action.
   */
  removeAction(index) {
    const { state, currentMacro } = this.props
    const { keyboard } = state
    const macro = keyboard.getMacro(currentMacro)

    // Remove the macro.
    macro.splice(index, 1)

    keyboard.setMacro(currentMacro, macro)
  }

  /*
   * Move a macro action up.
   *
   * @param {Number} index The index of the action.
   */
  upAction(index: number) {
    if (index === 0) {
      return // Do nothing if first element.
    }

    const { state, currentMacro } = this.props
    const { keyboard } = state

    const macro = keyboard.getMacro(currentMacro)
    // Swap.
    const temp = macro[index]
    macro[index] = macro[index - 1]
    macro[index - 1] = temp

    keyboard.setMacro(currentMacro, macro)
  }

  /*
   * Move a macro action down.
   *
   * @param {Number} index The index of the action.
   */
  downAction(index: number) {
    const { state, currentMacro } = this.props
    const { keyboard } = state

    const macro = keyboard.getMacro(currentMacro)

    if (index === macro.length - 1) return // Do nothing if last element.

    // Swap.
    const temp = macro[index]
    macro[index] = macro[index + 1]
    macro[index + 1] = temp

    keyboard.setMacro(currentMacro, macro)
  }

  /*
   * Start recording.
   *
   * @param {Event} e The event that triggered the recording.
   */
  startRecording(e) {
    const { state, currentMacro } = this.props
    const { keyboard } = state

    const macro = keyboard.getMacro(currentMacro)

    // Update the state.
    this.setState({
      recording: true,
    })

    // Set the listeners.
    window.onkeydown = (event) => {
      // Get the corresponding key.
      const id = C.KEYCODE_NUMBERS[event.which]
      if (!id) return

      // Add the action to the macro.
      macro.push({
        action: C.MACRO_DOWN,
        argument: id,
      })
      keyboard.setMacro(currentMacro, macro)

      // Scroll to the bottom of the page.
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    }
    window.onkeyup = (event) => {
      // Get the corresponding key.
      const id = C.KEYCODE_NUMBERS[event.which]
      if (!id) return

      // Check if the previous action was a press of the same key.
      const previous = macro[macro.length - 1]
      if (previous.action === C.MACRO_DOWN && previous.argument === id) {
        // Modify the previous action to be a type.
        previous.action = C.MACRO_TYPE
      } else {
        // Add the action to the macro.
        macro.push({
          action: C.MACRO_UP,
          argument: id,
        })
      }
      keyboard.setMacro(currentMacro, macro)
    }

    // Clear the macro.
    macro.splice(0)
    keyboard.setMacro(currentMacro, macro)

    // Lose focus.
    e.target.blur()
  }

  /*
   * Stop recording.
   */
  stopRecording() {
    // Update the state.
    this.setState({
      recording: false,
    })

    // Remove the listeners.
    window.onkeydown = null
    window.onkeyup = null
  }

  /*
   * Clear the current macro.
   */
  clear() {
    const { state, currentMacro } = this.props
    const { keyboard } = state

    // Clear the current macro.
    keyboard.setMacro(currentMacro, [])
  }

  render() {
    const { state, currentMacro } = this.props
    const { keyboard } = state

    const macro = keyboard.getMacro(currentMacro)

    // Compile the actions.
    const actions: JSX.Element[] = macro.map((m, i) => (
      <Action
        index={i}
        action={m}
        onChange={(action) => this.changeAction(i, action)}
        onRemove={() => this.removeAction(i)}
        onUp={() => this.upAction(i)}
        onDown={() => this.downAction(i)}
        key={i}
      />
    ))

    return (
      <div>
        <button type="button" onClick={this.addAction}>
          Add Action
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className={classNames('light pane-macros-editor-record', {
            recording: this.state.recording,
          })}
          onClick={(e) =>
            this.state.recording ? this.stopRecording() : this.startRecording(e)
          }
        >
          {this.state.recording ? 'Stop Recording' : 'Record Macro'}
        </button>
        &nbsp;&nbsp;
        <button type="button" className="light" onClick={this.clear}>
          Clear Macro
        </button>
        <div className="pane-macros-editor-content">
          {actions.length === 0 && (
            <div className="pane-macros-editor-empty">No actions yet</div>
          )}
          {actions}
        </div>
        <div
          className="pane-macros-editor-screen"
          style={{ display: this.state.recording ? 'block' : 'none' }}
        />
      </div>
    )
  }
}

export default Editor
