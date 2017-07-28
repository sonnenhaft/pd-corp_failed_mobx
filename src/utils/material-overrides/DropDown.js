import React from 'react'
import { SelectField, MenuItem } from 'material-ui'

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
