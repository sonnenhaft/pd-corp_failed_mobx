import React from 'react'
import { MenuItem, RaisedButton, SelectField, TextField } from 'material-ui'
import './utils.scss'
import generateDemoTable from './generateDemoTable'

export { generateDemoTable }

export const DropDown = ({ value, onChange, values = [], placeholder = '' }) => {
  return <div>
    <SelectField
      floatingLabelText={placeholder}
      value={value}
      autoWidth={true}
      fullWidth={true}
      onChange={(ignored, index, value) => onChange({ target: { value } })}
    >
      {values.map(({ key, value: val }, idx) => {
        return <MenuItem key={idx} value={key} primaryText={val}/>
      })}
    </SelectField>
  </div>
}

export const Button = ({ children, onClick, disabled }) => {
  return <div className="global-button">
    <RaisedButton
      fullWidth={true}
      {...{ onClick, disabled }}>
      {children}
    </RaisedButton>
  </div>
}

export const TextInput = ({ hintText, rows, onChange, value, errorText, multiLine }) => {
  return <span styleName={'input-wrapper'}>
    <TextField fullWidth={true}
               {...{ hintText, rows, onChange, value, errorText, multiLine }}/>
    {errorText && <div><br/><br/></div>}
  </span>
}

export const encodeQueryData = data => {
  let ret = []
  for (let d in data) {ret.push(`${encodeURIComponent(d)}=${ encodeURIComponent(data[d]) }`)}
  return ret.join('&')
}
