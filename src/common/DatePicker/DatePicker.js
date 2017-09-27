import React from 'react'

import cn from 'classnames'
import P from 'prop-types'
import { compose, setPropTypes, withProps, withPropsOnChange, withState } from 'recompose'
import RtDatePicker from 'react-toolbox/lib/date_picker'
import FontIcon from 'react-toolbox/lib/font_icon'
import InputMask from 'react-input-mask'

import { formatDate } from '../formatDate'
import { getSafeDate } from './getSafeDate'

import styles from './DatePicker.css'

const leaveDigitsOnly = string => string.replace(/[^0-9]+/g, '')

export const DatePicker = compose(
  setPropTypes({
    value: P.oneOfType([
      P.string,
      P.instanceOf(Date)
    ]),
    label: P.string.isRequired,
    onChange: P.func.isRequired
  }),
  withState('dateString', 'setDateString', (({ value }) => value ? formatDate(value) : '')),
  withState('focused', 'setFocused', false),
  withProps(({ onChange, setDateString, setFocused }) => ({
    onFocus() {
      setFocused(true)
    },
    onDateChanged(value) {
      if ( value ) {
        value = value > Date.now() ? new Date() : value
        onChange(value)
        setDateString(formatDate(value))
      } else {
        onChange(value)
        setDateString('')
      }
    }
  })),
  withPropsOnChange(['dateString', 'value'], ({ dateString, value, onDateChanged, setDateString, setFocused }) => ({
    onMaskedValueChanged({ target: { value: maskedValue } }) {
      const digitsCount = leaveDigitsOnly(maskedValue).length
      if ( digitsCount === 0 ) {
        if ( value ) {
          onDateChanged(null)
        } else {
          setDateString('')
        }
      } else if ( digitsCount < 8 ) {
        setDateString(maskedValue)
      } else {
        const safeDateString = getSafeDate(maskedValue)
        setDateString(safeDateString)
        onDateChanged(new Date(safeDateString))
      }
    },
    onBlur() {
      if ( leaveDigitsOnly(dateString).length < 8 ) {
        value ? onDateChanged(new Date(value)) : setDateString('')
      }
      setFocused(false)
    }
  }))
)(({ value, dateString, label, onDateChanged, onMaskedValueChanged, onBlur, focused, onFocus }) => {
  const iconVisible = leaveDigitsOnly(dateString)
  return <div styleName={ cn('date-picker', { focused }) }>
    <label styleName="label" title={ label }>{label}</label>
    <div styleName="picker-inside-wrapper">

      <div styleName={ cn('toolbox-date-picker-wrapper', { iconVisible }) }>
        <RtDatePicker
          inputClassName={ styles['toolbox-date-picker-input'] }
          icon="event"
          onChange={ onDateChanged }
          inputFormat={ formatDate }
          value={ value ? new Date(value) : value }/>
      </div>

      <div styleName="input-mask-wrapper">
        <InputMask styleName="input" placeholder="mm/dd/yyyy" mask="99/99/9999" value={ dateString }
                   onChange={ onMaskedValueChanged } { ...{ onBlur, onFocus } }/>
      </div>

      {iconVisible && <div styleName="remove-icon" onClick={ () => onDateChanged(null) }>
        <FontIcon value="add_circle"/>
        <FontIcon value="add_circle_outline"/>
      </div>}
    </div>
  </div>
})
