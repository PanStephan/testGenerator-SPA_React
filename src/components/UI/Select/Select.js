import React from 'react'
import classes from './Select.css'

const Select = props => {
  const{value, onChange, label, options} = props
  const htmlFor = `${label}-${Math.random()}`

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        { options.map((option, index) => {
          const{value, text} = option
          return (
            <option
              value={value}
              key={value + index}
            >
              {text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

export default Select