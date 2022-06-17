import { ReactNode } from 'react'

interface IToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  children: ReactNode
}

function Toggle({ value, onChange, children }: IToggleProps) {
  const handleToggle = () => {
    if (onChange) {
      onChange(!value)
    }
  }
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      className={`toggle${value ? ' enabled' : ''}`}
      onKeyPress={handleToggle}
      onClick={handleToggle}
    >
      {children}
    </div>
  )
}

export default Toggle
