import React from 'react'
import P from 'prop-types'
import { compose, setPropTypes, withPropsOnChange, withState } from 'recompose'
import './DateRangePicker.css'
import { DatePicker } from '../DatePicker'

const setTime = (dateString, hh, mm, ss, ms) => {
  if (dateString) {
    const date = new Date(dateString)
    date.setHours(hh)
    date.setMinutes(mm)
    date.setSeconds(ss)
    date.setMilliseconds(ms)
    return date.toISOString()
  } else {
    return dateString
  }
}

export const DateRangePicker = compose(
  setPropTypes({
    keyLabels: P.arrayOf(P.shape({
      key: P.string.isRequired,
      label: P.string.isRequired
    })).isRequired,
    valuesObject: P.object.isRequired,
    onKeyChanged: P.func.isRequired
  }),
  withState('error', 'setError', null),
  withState('inputValues', 'setInputValues', ({ keyLabels, valuesObject }) => {
    const [labelFrom, labelTo] = keyLabels
    const valFrom = valuesObject[labelFrom.key]
    const valTo = valuesObject[labelTo.key]
    return { [labelFrom.key]: valFrom, [labelTo.key]: valTo }
  }),
  withPropsOnChange(['inputValues'], ({ inputValues, setError, setInputValues, onKeyChanged, keyLabels }) => ({
    onInputChange: key => value => {
      const [labelFrom, labelTo] = keyLabels
      if (value && key === labelTo.key) {
        value = setTime(value, 23, 59, 59, 999)
      } else {
        value = setTime(value, 0, 0, 0, 0)
      }
      const newInputValues = { ...inputValues, [key]: value }

      const inputValFrom = newInputValues[labelFrom.key]
      const inputValTo = newInputValues[labelTo.key]

      setInputValues(newInputValues)
      const error = inputValFrom && inputValTo && new Date(inputValFrom) > new Date(inputValTo)

      setError(error)
      if ( !error ) {
        onKeyChanged(key)(value)
      }
    }
  }))
)(({ valuesObject, keyLabels, error, onInputChange }) => {
  const [labelFrom, labelTo] = keyLabels
  return <div styleName="date-range-picker">
    {keyLabels.map(({ key, label }) => <DatePicker
      label={ label }
      key={ key }
      onChange={ onInputChange(key) }
      value={ valuesObject[key] }/>)}
    {error && <div styleName="date-range-error">
      <span>&quot;{labelTo.label}&quot;</span>
      &nbsp;should be greater or equal to&nbsp;
      <span>&quot;{labelFrom.label}&quot;.</span>
    </div>}
  </div>
})
