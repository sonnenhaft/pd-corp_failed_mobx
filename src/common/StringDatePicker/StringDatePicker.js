import React from 'react'
import './StringDatePicker.css'

import DatePicker from 'react-toolbox/lib/date_picker'
import FontIcon from 'react-toolbox/lib/font_icon'

const addLeadingZero = number => number < 10 ? `0${  number }` : number

export const StringDatePicker = ({ value, onChange: _onChange, ...props }) => {
  const onChange = value => _onChange(value && value.toISOString())
  return <div styleName="string-date-picker">
    <DatePicker
      { ...props }
      icon="event"
      onChange={ onChange }
      inputFormat={ value => `${ addLeadingZero(value.getMonth() + 1) }/${ addLeadingZero(value.getDate()) }/${ value.getFullYear() }` }
      value={ value ? new Date(value) : value }/>
    {value && <div styleName="remove-icon" onClick={ () => onChange(null) }>
      <FontIcon value="add_circle"/>
      <FontIcon value="add_circle_outline"/>
    </div>}
  </div>
}
