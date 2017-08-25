import React from 'react'

import { DatePicker } from 'react-toolbox'

export const StringDatePicker = ({ value, onChange: _onChange, ...props }) => {
  const onChange = value => _onChange(value && value.getTime())
  return <DatePicker
    { ...props }
    onChange={ onChange }
    value={ value ? new Date(value) : value }/>
}
