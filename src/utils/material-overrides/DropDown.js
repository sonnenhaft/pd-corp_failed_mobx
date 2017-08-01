import React from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'

export const DropDown = ({ value, onChange, values = [], placeholder = '' }) => {
  // values = [{ value: 'EN-gb', label: 'England' }]
  return <Dropdown
    auto
    onChange={onChange}
    label={placeholder}
    source={values}
    value={value}
  />
}
