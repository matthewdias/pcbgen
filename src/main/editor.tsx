import React from "react"
import { useBeforeunload } from "react-beforeunload"

import Display from "../ui/display"
import Panes from "../ui/panes"
import Layouts from "../ui/layouts"

interface IEditorProps {
  state: unknown
}

function Editor({ state }: IEditorProps) {
  useBeforeunload(
    () =>
      "Are you sure you want to leave the page? You may have unsaved changes."
  )
  return (
    <div>
      <Display state={state} />
      <div style={{ display: "flex" }}>
        <Panes state={state} />
        <Layouts state={state} />
      </div>
    </div>
  )
}

export default Editor
