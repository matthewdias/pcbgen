import classNames from 'classnames'

function Tab({ selected, onClick, children }) {
  const className = classNames('panes-tab', {
    selected,
  })

  return (
    <div
      role="tab"
      tabIndex={0}
      className={className}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {children}
    </div>
  )
}

export default Tab
