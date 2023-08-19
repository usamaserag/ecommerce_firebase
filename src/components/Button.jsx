import React from 'react'

const Button = ({text, btn_class, handleClick}) => {
  return (
    <button className={btn_class} onClick={() => handleClick()}>{text}</button>
  )
}

export default Button