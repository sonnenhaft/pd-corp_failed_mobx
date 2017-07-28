import React from 'react'
import { TextField } from 'material-ui'

export const TextInput = ({ hintText, rows, onChange, value, errorText, multiLine }) => {
  return <span>
    <TextField fullWidth={true}
               {...{ hintText, rows, onChange, value, errorText, multiLine }}/>
    {errorText && <div><br/><br/></div>}
  </span>
}
