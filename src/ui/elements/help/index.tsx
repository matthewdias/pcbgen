import { ReactNode } from "react"

interface IHelpProps {
  children: ReactNode
}

function Help({ children }: IHelpProps) {
  return (
    <div className="help">
      <div className="help-icon">
        <i className="fa fa-question-circle" />
      </div>
      <div className="help-content">{children}</div>
    </div>
  )
}

export default Help
