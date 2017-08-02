import React from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'

export const DropDown = ({ ...props, source = [] }) => {
  // source = [{ value: 'EN-gb', label: 'England' }]
  return <Dropdown auto {...{ ...props, source }}/>
}
