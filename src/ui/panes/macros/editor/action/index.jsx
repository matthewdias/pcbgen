import { useState } from 'react'
import Keycode from '../../../../../state/keyboard/keycode'
import Selector from '../../../keymap/configure/selector'
import C from '../../../../../const'

function Action({ action: m, index, onUp, onDown, onRemove, onChange }) {
  const [open, setOpen] = useState(false)

  const { action, argument } = m

  const handleChange = (e) => {
    if (!onChange) {
      return
    }

    // Get the new action.
    const newAction = parseInt(e.target.value, 10)
    let newArgument
    switch (newAction) {
      case C.MACRO_NONE: {
        newArgument = null
        break
      }
      case C.MACRO_INTERVAL: {
        newArgument = 0
        break
      }
      case C.MACRO_DOWN: {
        newArgument = 'KC_NO'
        break
      }
      case C.MACRO_UP: {
        newArgument = 'KC_NO'
        break
      }
      case C.MACRO_TYPE: {
        newArgument = 'KC_NO'
        break
      }
      case C.MACRO_WAIT: {
        newArgument = 0
        break
      }
      default: {
        throw Error(`Invalid action ${newAction}`)
      }
    }

    onChange({
      action: newAction,
      argument: newArgument,
    })
  }

  const handleChangeTime = (e) => {
    if (!onChange) {
      return
    }
    // Get the new time.
    let newTime = parseInt(e.target.value, 10)
    if (!e.target.value) {
      newTime = 0 // Empty is 0.
    }

    // Make sure the time isn't NaN.
    if (Number.isNaN(newTime)) {
      return
    }

    // Trigger onChange.
    onChange({
      action,
      argument: newTime,
    })
  }

  const handleToggleSelector = () => {
    setOpen(!open)
  }

  const handleChangeKey = (code) => {
    // Trigger onChange.
    if (onChange) {
      onChange({
        action,
        argument: code,
      })
    }

    // Close the selector.
    handleToggleSelector()
  }

  return (
    <div className="pane-macros-editor-action">
      {index + 1}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        type="button"
        className="small light pane-macros-editor-action-up"
        onClick={onUp}
      >
        <i className="fa fa-chevron-up" />
      </button>
      <button
        type="button"
        className="small light pane-macros-editor-action-down"
        onClick={onDown}
      >
        <i className="fa fa-chevron-down" />
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select value={action} onChange={handleChange}>
        <option value={C.MACRO_NONE}>No Action</option>
        <option value={C.MACRO_INTERVAL}>Set Interval</option>
        <option value={C.MACRO_DOWN}>Press</option>
        <option value={C.MACRO_UP}>Release</option>
        <option value={C.MACRO_TYPE}>Type</option>
        <option value={C.MACRO_WAIT}>Wait</option>
      </select>
      {action === C.MACRO_INTERVAL && <span>&nbsp;&nbsp;to&nbsp;&nbsp;</span>}
      {(action === C.MACRO_DOWN ||
        action === C.MACRO_UP ||
        action === C.MACRO_TYPE) && <span>&nbsp;key&nbsp;</span>}
      {action === C.MACRO_WAIT && <span>&nbsp;&nbsp;for&nbsp;&nbsp;</span>}
      {(action === C.MACRO_INTERVAL || action === C.MACRO_WAIT) && (
        <span>
          <input
            style={{ width: '4rem' }}
            type="text"
            value={argument}
            onChange={handleChangeTime}
          />
          &nbsp;&nbsp;milliseconds
        </span>
      )}
      {(action === C.MACRO_DOWN ||
        action === C.MACRO_UP ||
        action === C.MACRO_TYPE) && (
        <span>
          <button
            type="button"
            style={{ verticalAlign: 'baseLine' }}
            className="light small"
            onClick={handleToggleSelector}
          >
            {Keycode.getDefault(argument).getName()}
          </button>
        </span>
      )}
      {open && (
        <Selector
          limited
          keycode={Keycode.getDefault(argument)}
          onChange={handleChangeKey}
          onClose={handleToggleSelector}
        />
      )}
      <div
        className="pane-macros-editor-action-remove"
        role="button"
        tabIndex={0}
        onClick={onRemove}
        onKeyDown={onRemove}
      >
        &times;
      </div>
    </div>
  )
}

export default Action
