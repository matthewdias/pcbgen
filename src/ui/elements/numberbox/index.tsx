import React, { CSSProperties } from 'react'

interface INumberBoxProps {
  value: number
  style?: CSSProperties
  minus?: string
  plus?: string
  min?: number
  max?: number
  onChange?: (value: number) => void
}

function NumberBox({
  onChange,
  minus,
  plus,
  min,
  max,
  value,
  style,
}: INumberBoxProps) {
  const handleChangeValue = (updatedValue) => {
    // Make sure there is a function we can call.
    if (!onChange) {
      return
    }

    // Make sure the vlue is a number.
    if (Number.isNaN(updatedValue)) {
      return
    }

    // Check if the value is within limits.
    if (min && updatedValue < min) {
      onChange(min)
    } else if (max && updatedValue > max) {
      onChange(max)
    } else {
      onChange(updatedValue)
    }
  }

  const handleChange = (e) => {
    const { target } = e
    let updatedValue = target.value.trim()

    // Change the value.
    if (updatedValue === '') updatedValue = 0 // Blank is zero.
    handleChangeValue(parseInt(updatedValue, 10))
  }

  return (
    <div className="numberbox">
      <button
        type="button"
        className="small"
        onClick={() => {
          handleChangeValue(value - 1)
        }}
      >
        <i className={`fa fa-${minus || 'minus'}`} />
      </button>
      <input style={style} type="text" value={value} onChange={handleChange} />
      <button
        type="button"
        className="small"
        onClick={() => {
          handleChangeValue(value + 1)
        }}
      >
        <i className={`fa fa-${plus || 'plus'}`} />
      </button>
    </div>
  )
}

export default NumberBox
