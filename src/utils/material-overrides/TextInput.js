import React from 'react'
import Input from 'react-toolbox/lib/input'

export const TextInput = ({ hintText, onChange, value, errorText }) => {
  return <section>
    <Input
      type="text"
      label={hintText}
      name={hintText}
      value={value}
      onChange={onChange}/>
    {errorText && <div><br/><br/></div>}
  </section>
}
