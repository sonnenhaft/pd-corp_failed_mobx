import React from 'react'

import { DatePicker } from 'react-toolbox'

const l = number => number < 10 ? `0${  number }` : number

export const StringDatePicker = ({ value, onChange: _onChange, ...props }) => {
  const onChange = value => _onChange(value && value.getTime())
  return <DatePicker
    { ...props }
    icon="event"
    onChange={ onChange }


    inputFormat={ value => `${ l(value.getMonth() + 1) }/${ l(value.getDate()) }/${ value.getFullYear() }` }
    value={ value ? new Date(value) : value }/>
}
