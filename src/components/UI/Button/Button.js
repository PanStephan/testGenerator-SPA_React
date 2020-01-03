import React from 'react'
import classes from './Button.css'

const Button = props => {
  const{type, onClick, disabled, children} = props
  const cls = [
    classes.Button,
    classes[type]
  ]

  return (
    <button
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button