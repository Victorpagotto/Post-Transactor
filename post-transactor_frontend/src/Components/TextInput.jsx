import React from "react";

function TextInput(label, name, className, handleChange, value) {
  return (
  <label>
    { label }
    <input
    type="text"
    name={ name }
    className={ className }
    onChange={ handleChange }
    value={ handleChange }
    />
  </label>
  )
}

export default TextInput;